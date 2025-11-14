import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from './ui/button';

// Declare A-Frame types
declare global {
  interface Window {
    AFRAME: any;
  }
  
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-videosphere': any;
      'a-assets': any;
      'a-video': any;
      'a-camera': any;
      'a-cursor': any;
      'a-sky': any;
    }
  }
}

interface AFrame360ViewerProps {
  videoSrc: string;
  isVisible?: boolean;
  onError?: (error: string) => void;
  onLoad?: () => void;
}

export default function AFrame360Viewer({ videoSrc, isVisible = true, onError, onLoad }: AFrame360ViewerProps) {
  // Add error boundary state
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sceneRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [aFrameLoaded, setAFrameLoaded] = useState(false);

  // Load A-Frame dynamically with improved error handling
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.AFRAME) {
      setIsLoading(true);
      const script = document.createElement('script');
      script.id = 'aframe-script';
      script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
      
      // Set a timeout to detect slow loading
      const timeoutId = setTimeout(() => {
        if (!window.AFRAME) {
          console.warn('⚠️ A-Frame loading is taking longer than expected');
        }
      }, 5000);
      
      script.onload = () => {
        clearTimeout(timeoutId);
        setAFrameLoaded(true);
        setIsLoading(false);
        setHasError(false);
        console.log('✅ A-Frame loaded successfully');
        onLoad?.();
      };
      
      script.onerror = (error) => {
        clearTimeout(timeoutId);
        console.error('❌ Failed to load A-Frame', error);
        setIsLoading(false);
        
        // Try fallback version if main version fails
        const fallbackScript = document.createElement('script');
        fallbackScript.id = 'aframe-script';
        fallbackScript.src = 'https://cdn.jsdelivr.net/npm/aframe@1.4.0/dist/aframe.min.js';
        
        fallbackScript.onload = () => {
          setAFrameLoaded(true);
          setIsLoading(false);
          setHasError(false);
          console.log('✅ A-Frame loaded from fallback CDN');
          onLoad?.();
        };
        
        fallbackScript.onerror = () => {
          console.error('❌ Failed to load A-Frame from fallback CDN');
          setIsLoading(false);
          setHasError(true);
          onError?.('Failed to load 360° viewer. Please check your internet connection and try again.');
        };
        
        document.head.appendChild(fallbackScript);
      };
      
      document.head.appendChild(script);
    } else if (window.AFRAME) {
      setAFrameLoaded(true);
      setIsLoading(false);
      setHasError(false);
      onLoad?.();
    }
  }, [onError, onLoad]);

  // Initialize the 360° scene
  useEffect(() => {
    if (!isVisible || !aFrameLoaded || !containerRef.current) return;

    const container = containerRef.current;
    
    // Create the A-Frame scene HTML
    container.innerHTML = `
      <a-scene
        id="monastery-360-scene"
        embedded
        style="width: 100%; height: 100%; border-radius: 8px; display: block; position: relative;"
        vr-mode-ui="enabled: false"
        cursor="rayOrigin: mouse"
        background="color: #000"
        renderer="antialias: true; colorManagement: true; sortObjects: true;"
        stats="false"
      >
        <a-assets timeout="10000">
          <video
            id="monastery-video"
            src="${videoSrc}"
            loop="true"
            autoplay="true"
            muted="true"
            playsinline="true"
            crossorigin="anonymous"
            preload="metadata"
            webkit-playsinline="true"
          ></video>
        </a-assets>
        
        <!-- 360° Video Sphere -->
        <a-videosphere
          src="#monastery-video"
          rotation="0 0 0"
          radius="100"
          segments-width="64"
          segments-height="32"
        ></a-videosphere>
        
        <!-- Camera with Look Controls -->
        <a-camera
          look-controls="enabled: true; pointerLockEnabled: false; touchEnabled: true"
          wasd-controls="enabled: false"
          position="0 0 0"
          fov="75"
          raycaster="objects: [data-raycastable]; far: 100"
        >
          <a-cursor
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: white; shader: flat; opacity: 0.8"
            raycaster="objects: [data-raycastable]; far: 100"
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
            animation__mouseenter="property: scale; startEvents: mouseenter; to: 1.2 1.2 1.2; dur: 200"
            animation__mouseleave="property: scale; startEvents: mouseleave; to: 1 1 1; dur: 200"
          ></a-cursor>
        </a-camera>
      </a-scene>
    `;

    // Get the video element for control
    const video = container.querySelector('#monastery-video') as HTMLVideoElement;
    if (video) {
      videoRef.current = video;
      
      // Video event handlers
      video.addEventListener('loadeddata', () => {
        console.log('🎬 360° Video loaded:', videoSrc);
        setIsLoading(false);
      });
      
      video.addEventListener('canplay', () => {
        console.log('✅ 360° Video ready to play');
        video.play().catch(error => {
          console.log('Autoplay prevented, but video is ready');
          // Add user interaction message
          setIsPlaying(false);
        });
      });
      
      video.addEventListener('error', (e) => {
        console.error('❌ 360° Video error:', e);
        setIsLoading(false);
        
        // Try to reload the video once before showing error
        if (videoSrc) {
          console.log('🔄 Attempting to reload video...');
          video.src = videoSrc;
          video.load();
        } else {
          onError?.('Failed to load 360° video. Please check your connection and try again.');
        }
      });
      
      video.addEventListener('play', () => setIsPlaying(true));
      video.addEventListener('pause', () => setIsPlaying(false));
    }

    // Get the scene reference
    const scene = container.querySelector('a-scene');
    sceneRef.current = scene;

    // Wait for A-Frame scene to be ready
    if (scene) {
      scene.addEventListener('loaded', () => {
        console.log('🌐 A-Frame scene loaded successfully');
        // Force scene to render
        if (scene && typeof (scene as any).resize === 'function') {
          (scene as any).resize();
        }
      });
      
      // Handle scene errors
      scene.addEventListener('error', (e) => {
        console.error('❌ A-Frame scene error:', e);
        onError?.('A-Frame scene failed to load');
      });
    }

    // Cleanup on unmount
    return () => {
    if (video) {
      video.pause();
      video.src = '';
      video.load();
    }
    if (scene) {
      scene.remove();
    }
    
    // Clean up any remaining A-Frame elements
    const aframeScript = document.getElementById('aframe-script');
    if (aframeScript) {
      aframeScript.remove();
    }
  };
  }, [videoSrc, isVisible, aFrameLoaded, onError]);

  // Control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const resetView = () => {
    if (sceneRef.current) {
      const camera = sceneRef.current.querySelector('a-camera');
      if (camera) {
        camera.setAttribute('rotation', '0 0 0');
      }
    }
  };

  const enterFullscreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    }
  };

  if (!isVisible) return null;

  // Error recovery function
  const retryLoading = () => {
    setHasError(false);
    setIsLoading(true);
    // Reload A-Frame
    if (typeof window !== 'undefined' && !window.AFRAME) {
      const script = document.createElement('script');
      script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
      script.onload = () => {
        setAFrameLoaded(true);
        setIsLoading(false);
      };
      document.head.appendChild(script);
    }
  };

  // If there's an error, show error UI with retry button
  if (hasError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gray-900 rounded-lg">
        <div className="text-center p-6 bg-black/80 backdrop-blur-sm rounded-lg">
          <h3 className="text-red-500 text-xl mb-2">360° Viewer Error</h3>
          <p className="text-white mb-4">There was a problem loading the 360° experience.</p>
          <Button 
            onClick={retryLoading}
            className="px-4 py-2 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white rounded hover:opacity-90"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
      <div 
        ref={containerRef}
        className="w-full h-full"
        style={{ 
          minHeight: '70vh',
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'block'
        }}
      />

      {/* Loading Overlay */}
      {(isLoading || !aFrameLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
          <div className="text-white text-center">
            <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg mb-2">Loading 360° Experience</p>
            <p className="text-sm text-gray-300">Preparing monastery virtual tour...</p>
          </div>
        </div>
      )}

      {/* Custom 360° Controls */}
      {!isLoading && aFrameLoaded && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3">
          {/* Play/Pause */}
          <Button
            size="sm"
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] hover:opacity-90 text-white shadow-lg"
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>

          {/* Mute/Unmute */}
          <Button
            size="sm"
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
            title={isMuted ? "Unmute" : "Mute"}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>

          {/* Reset View */}
          <Button
            size="sm"
            onClick={resetView}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
            title="Reset View"
            aria-label="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          {/* Fullscreen */}
          <Button
            size="sm"
            onClick={enterFullscreen}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
            title="Fullscreen"
            aria-label="Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* 360° Instructions */}
      {!isLoading && aFrameLoaded && (
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm max-w-sm">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-full"></div>
            <span className="font-semibold">360° Monastery Experience</span>
          </div>
          <ul className="text-xs space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-yellow-300 mr-2">🖱️</span>
              <span>Drag to look around in all directions</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-300 mr-2">🔄</span>
              <span>Full 360° horizontal & vertical exploration</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-300 mr-2">🎮</span>
              <span>Use controls for playback & reset view</span>
            </li>
          </ul>
        </div>
      )}

      {/* Video Info */}
      {!isLoading && aFrameLoaded && (
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs">360° Video Active</span>
          </div>
        </div>
      )}
    </div>
  );
}