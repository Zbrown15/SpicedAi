import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneCall, Square, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import Vapi from '@vapi-ai/web';

interface VapiDemoProps {
  className?: string;
}

interface TranscriptMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const VapiDemo: React.FC<VapiDemoProps> = ({ className = '' }) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  
  const callStartTimeRef = useRef<Date | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Vapi configuration
  const VAPI_PUBLIC_KEY = '111a83fa-0347-465c-8db1-1e60e07f0050';
  const ASSISTANT_ID = '1c67322a-e045-4095-b834-8e61ea9c11ca';

  useEffect(() => {
    // Initialize Vapi instance
    const vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    setVapi(vapiInstance);

    // Set up event listeners
    vapiInstance.on('call-start', () => {
      console.log('Call started');
      setIsConnected(true);
      setIsConnecting(false);
      setError(null);
      callStartTimeRef.current = new Date();
      
      // Start duration timer
      durationIntervalRef.current = setInterval(() => {
        if (callStartTimeRef.current) {
          const duration = Math.floor((Date.now() - callStartTimeRef.current.getTime()) / 1000);
          setCallDuration(duration);
        }
      }, 1000);
    });

    vapiInstance.on('call-end', () => {
      console.log('Call ended');
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setIsListening(false);
      setVolume(0);
      
      // Clear duration timer
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
      callStartTimeRef.current = null;
      setCallDuration(0);
    });

    vapiInstance.on('speech-start', () => {
      console.log('Assistant started speaking');
      setIsSpeaking(true);
      setIsListening(false);
    });

    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setIsSpeaking(false);
      setIsListening(true);
    });

    vapiInstance.on('message', (message: any) => {
      console.log('Received message:', message);
      
      if (message.type === 'transcript') {
        const newMessage: TranscriptMessage = {
          role: message.role,
          text: message.transcript,
          timestamp: new Date()
        };
        
        setTranscript(prev => {
          // Avoid duplicates by checking if the last message is the same
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && 
              lastMessage.role === newMessage.role && 
              lastMessage.text === newMessage.text) {
            return prev;
          }
          return [...prev, newMessage];
        });
      }
      
      if (message.type === 'volume-level') {
        setVolume(message.level || 0);
      }
    });

    vapiInstance.on('error', (error: any) => {
      console.error('Vapi error:', error);
      setError(error.message || 'An error occurred during the call');
      setIsConnecting(false);
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
      vapiInstance?.stop();
    };
  }, []);

  // Auto-scroll transcript to bottom
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript]);

  const startCall = async () => {
    if (!vapi) return;
    
    try {
      setIsConnecting(true);
      setError(null);
      setTranscript([]);
      await vapi.start(ASSISTANT_ID);
    } catch (err: any) {
      console.error('Failed to start call:', err);
      setError(err.message || 'Failed to start call');
      setIsConnecting(false);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = (): string => {
    if (isConnecting) return 'Connecting...';
    if (!isConnected) return 'Ready to call';
    if (isSpeaking) return 'AI is speaking...';
    if (isListening) return 'Listening...';
    return 'Connected';
  };

  const getStatusColor = (): string => {
    if (error) return 'text-red-500';
    if (isConnecting) return 'text-yellow-500';
    if (!isConnected) return 'text-steel-500';
    if (isSpeaking) return 'text-blue-500';
    if (isListening) return 'text-green-500';
    return 'text-primary-600';
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-steel-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 border-b border-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-1">
              Live AI Demo
            </h3>
            <p className="text-steel-600">
              Experience our HVAC AI assistant in action
            </p>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 
                isConnecting ? 'bg-yellow-500 animate-pulse' : 
                'bg-steel-300'
              }`} />
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
            
            {isConnected && (
              <div className="text-sm text-steel-600">
                {formatDuration(callDuration)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Call Controls */}
        <div className="flex justify-center mb-6">
          {!isConnected ? (
            <motion.button
              onClick={startCall}
              disabled={isConnecting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg
                transition-all duration-200 shadow-lg
                ${isConnecting 
                  ? 'bg-steel-400 text-white cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 text-white hover:shadow-xl'
                }
              `}
            >
              {isConnecting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <PhoneCall className="w-6 h-6" />
                  Start Demo Call
                </>
              )}
            </motion.button>
          ) : (
            <motion.button
              onClick={endCall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Square className="w-6 h-6" />
              End Call
            </motion.button>
          )}
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio Visualizer */}
        <AnimatePresence>
          {isConnected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-4 p-4 bg-steel-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {isSpeaking ? (
                    <Volume2 className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Mic className="w-5 h-5 text-green-500" />
                  )}
                  <span className="text-sm font-medium text-steel-700">
                    {isSpeaking ? 'AI Speaking' : 'Your Turn'}
                  </span>
                </div>
                
                {/* Simple volume bars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 bg-primary-400 rounded-full ${
                        volume > (i * 20) ? 'opacity-100' : 'opacity-30'
                      }`}
                      animate={{
                        height: isConnected && (isSpeaking || isListening) 
                          ? `${Math.random() * 20 + 10}px` 
                          : '8px'
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: isConnected && (isSpeaking || isListening) ? Infinity : 0,
                        repeatType: 'reverse'
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transcript */}

        {/* Instructions */}
        {!isConnected && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Try asking:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• "What services do you offer?"</li>
              <li>• "How much does an AC repair cost?"</li>
              <li>• "Can you schedule a maintenance visit?"</li>
              <li>• "Do you offer emergency services?"</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VapiDemo;