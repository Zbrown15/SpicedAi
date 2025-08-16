// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Get the GA Measurement ID from environment variables
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Check if Google Analytics is properly configured
export const isGAEnabled = (): boolean => {
  return !!(GA_MEASUREMENT_ID && 
           typeof window !== 'undefined' && 
           window.gtag);
};

// Track page views
export const trackPageView = (path: string, title?: string): void => {
  if (!isGAEnabled()) {
    console.log('GA not enabled, would track page view:', path);
    return;
  }

  try {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
    
    console.log('GA page view tracked:', path);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track custom events
export const trackEvent = (
  eventName: string, 
  parameters?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    custom_parameters?: Record<string, any>;
  }
): void => {
  if (!isGAEnabled()) {
    console.log('GA not enabled, would track event:', eventName, parameters);
    return;
  }

  try {
    const eventData: Record<string, any> = {
      event_category: parameters?.event_category || 'engagement',
      event_label: parameters?.event_label,
      value: parameters?.value,
      ...parameters?.custom_parameters
    };

    // Remove undefined values
    Object.keys(eventData).forEach(key => {
      if (eventData[key] === undefined) {
        delete eventData[key];
      }
    });

    window.gtag('event', eventName, eventData);
    
    console.log('GA event tracked:', eventName, eventData);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Predefined event tracking functions for common actions
export const trackButtonClick = (buttonName: string, location?: string): void => {
  trackEvent('click', {
    event_category: 'button',
    event_label: buttonName,
    custom_parameters: {
      button_location: location
    }
  });
};

export const trackFormSubmission = (formName: string): void => {
  trackEvent('form_submit', {
    event_category: 'form',
    event_label: formName
  });
};

export const trackContactAttempt = (method: string): void => {
  trackEvent('contact_attempt', {
    event_category: 'contact',
    event_label: method
  });
};

export const trackServiceView = (serviceName: string): void => {
  trackEvent('service_view', {
    event_category: 'service',
    event_label: serviceName
  });
};

export const trackCalendarOpen = (source?: string): void => {
  trackEvent('calendar_open', {
    event_category: 'booking',
    event_label: 'calendar_widget',
    custom_parameters: {
      source: source || 'unknown'
    }
  });
};

export const trackVideoPlay = (videoName: string): void => {
  trackEvent('video_play', {
    event_category: 'video',
    event_label: videoName
  });
};

// Custom hook for easy event tracking in React components
export const useGATracking = () => {
  return {
    trackPageView,
    trackEvent,
    trackButtonClick,
    trackFormSubmission,
    trackContactAttempt,
    trackServiceView,
    trackCalendarOpen,
    trackVideoPlay,
    isEnabled: isGAEnabled()
  };
};