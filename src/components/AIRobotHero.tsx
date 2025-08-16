"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Eye, Cpu, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Link } from 'react-router-dom';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#10b981",
  vx = 0,
  vy = 0,
}) => {
  const [particleColor, setParticleColor] = useState<string>(color);

  interface MousePosition {
    x: number;
    y: number;
  }

  const MousePosition = (): MousePosition => {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
      x: 0,
      y: 0,
    });

    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

    return mousePosition;
  };

  const hexToRgb = (hex: string): number[] => {
    hex = hex.replace("#", "");
    const hexInt = parseInt(hex, 16);
    const red = (hexInt >> 16) & 255;
    const green = (hexInt >> 8) & 255;
    const blue = hexInt & 255;
    return [red, green, blue];
  };

  // Memoize RGB conversion to avoid recalculation
  const rgb = useMemo(() => hexToRgb(particleColor), [particleColor]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = MousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [particleColor]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;

      drawCircle(circle, true);

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });
    window.requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

interface AIRobotEyesProps {
  mousePosition: { x: number; y: number };
  isActive: boolean;
}
interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  delay = 0, 
  speed = 50 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, speed, text]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-emerald-400 ml-1"
        />
      )}
    </span>
  );
};

const AIRobotEyes: React.FC<AIRobotEyesProps> = ({ mousePosition, isActive }) => {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftEyeRef.current || !rightEyeRef.current) return;

    const updateEyePosition = (eyeElement: HTMLElement, offsetX: number = 0) => {
      const eyeRect = eyeElement.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2 + offsetX;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const deltaX = mousePosition.x - eyeCenterX;
      const deltaY = mousePosition.y - eyeCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const maxDistance = 8;
      const moveX = Math.min(maxDistance, (deltaX / distance) * maxDistance);
      const moveY = Math.min(maxDistance, (deltaY / distance) * maxDistance);

      const pupil = eyeElement.querySelector('.pupil') as HTMLElement;
      if (pupil) {
        pupil.style.transform = `translate(${isNaN(moveX) ? 0 : moveX}px, ${isNaN(moveY) ? 0 : moveY}px)`;
      }
    };

    updateEyePosition(leftEyeRef.current, -20);
    updateEyePosition(rightEyeRef.current, 20);
  }, [mousePosition, isActive]);

  return (
    <div className="relative flex items-center justify-center gap-8">
      {/* Left Eye */}
      <div
        ref={leftEyeRef}
        className="relative w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg border-2 border-emerald-300/50"
      >
        <div className="pupil absolute top-1/2 left-1/2 w-6 h-6 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out">
          <div className="absolute top-1 left-1 w-2 h-2 bg-emerald-300 rounded-full opacity-80"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-full"></div>
      </div>

      {/* Right Eye */}
      <div
        ref={rightEyeRef}
        className="relative w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg border-2 border-emerald-300/50"
      >
        <div className="pupil absolute top-1/2 left-1/2 w-6 h-6 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out">
          <div className="absolute top-1 left-1 w-2 h-2 bg-emerald-300 rounded-full opacity-80"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-full"></div>
      </div>

      {/* Status indicator */}
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg"></div>
        </motion.div>
      )}
    </div>
  );
};

const AIRobotHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    if (heroRef.current) {
      heroRef.current.addEventListener("mousemove", handleMouseMove);
      heroRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener("mousemove", handleMouseMove);
        heroRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-emerald-900/20 pt-20"
    >
      {/* Animated Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          quantity={150}
          className="h-full w-full"
          color="#10b981"
          staticity={30}
          ease={40}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* AI Robot Head */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <Card className="relative p-8 bg-gradient-to-br from-gray-900/80 to-black/80 border-emerald-500/30 backdrop-blur-sm">
            {/* Robot Head Container */}
            <div className="relative">
              {/* Head Shape */}
              <div className="relative w-48 h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-emerald-400/50 shadow-2xl mx-auto mb-4">
                {/* Circuit Pattern */}
                <div className="absolute inset-2 bg-gradient-to-br from-emerald-900/20 to-transparent rounded-2xl">
                  <div className="absolute top-4 left-4 w-8 h-1 bg-emerald-400/60 rounded"></div>
                  <div className="absolute top-6 left-4 w-1 h-6 bg-emerald-400/60 rounded"></div>
                  <div className="absolute top-4 right-4 w-8 h-1 bg-emerald-400/60 rounded"></div>
                  <div className="absolute top-6 right-4 w-1 h-6 bg-emerald-400/60 rounded"></div>
                </div>

                {/* Eyes Container */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <AIRobotEyes mousePosition={mousePosition} isActive={isActive} />
                </div>

                {/* Mouth/Speaker Grille */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-emerald-400/60 rounded"
                        style={{ height: `${8 + Math.random() * 8}px` }}
                        animate={{
                          height: isActive
                            ? [`${8 + Math.random() * 8}px`, `${12 + Math.random() * 12}px`, `${8 + Math.random() * 8}px`]
                            : `${8 + Math.random() * 8}px`,
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: isActive ? Infinity : 0,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Antenna */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-6 bg-emerald-400/80 rounded-full"></div>
                  <motion.div
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-emerald-400 rounded-full"
                    animate={{
                      scale: isActive ? [1, 1.2, 1] : 1,
                      opacity: isActive ? [0.8, 1, 0.8] : 0.8,
                    }}
                    transition={{
                      duration: 1,
                      repeat: isActive ? Infinity : 0,
                    }}
                  />
                </div>
              </div>

              {/* Status Display */}
              <motion.div
                className="text-emerald-400 text-sm font-mono"
                animate={{
                  opacity: isActive ? [0.5, 1, 0.5] : 0.7,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                {isActive ? "TRACKING_CURSOR..." : "STANDBY_MODE"}
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-transparent mb-6 min-h-[200px] md:min-h-[280px] flex flex-col justify-center">
            Never Miss Another Call — or Job
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            Spiced AI answers your calls 24/7, books jobs while you're on-site, and filters out time-wasters — so you can focus on the work that pays.
          </motion.p>

          {/* Benefits List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            {[
              "Built for HVAC pros",
              "Set up in 1 day", 
              "7-day money-back guarantee"
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-2 justify-center sm:justify-start"
              >
                <span className="text-emerald-400 text-lg">✅</span>
                <span className="text-gray-300 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex justify-center"
        >
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              aria-label="Book a free demo"
            >
              <span className="mr-2">👉</span>
              Book a Free Demo
            </Button>
          </Link>
        </motion.div>

      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </div>
  );
};

export default AIRobotHero;