import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from './ui/button';

interface Reliable360ViewerProps {
  videoSrc: string;
  isVisible: boolean;
  onError?: (error: string) => void;
}

export function Reliable360Viewer({ videoSrc, isVisible, onError }: Reliable360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [aFrameReady, setAFrameReady] = useState(false);

  // Load A-Frame if not already loaded
  useEffect(() => {
    const loadAFrame = () => {
      if (window.AFRAME) {
        setAFrameReady(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
      script.onload = () => {
        console.log('✅ A-Frame loaded');
        setAFrameReady(true);
      };
      script.onerror = () => {
        console.error('❌ Failed to load A-Frame');
        onError?.('Failed to load 360° viewer');
      };
      document.head.appendChild(script);
    };

    if (isVisible) {
      loadAFrame();
    }
  }, [isVisible, onError]);

  // Create the 360° scene when ready
  useEffect(() => {
    if (!isVisible || !aFrameReady || !containerRef.current) return;

    const container = containerRef.current;
    setIsLoading(true);

    // Clear any existing content
    container.innerHTML = '';

    // Create video element first
    const video = document.createElement('video');
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.preload = 'metadata';
    video.style.display = 'none';
    video.id = 'video-360-source';
    
    // Add multiple source formats for better compatibility
    const sourceMP4 = document.createElement('source');
    sourceMP4.src = videoSrc;
    sourceMP4.type = 'video/mp4';
    video.appendChild(sourceMP4);
    
    const sourceMKV = document.createElement('source');
    sourceMKV.src = videoSrc;
    sourceMKV.type = 'video/x-matroska';
    video.appendChild(sourceMKV);
    
    const sourceWebM = document.createElement('source');
    sourceWebM.src = videoSrc;
    sourceWebM.type = 'video/webm';
    video.appendChild(sourceWebM);
    
    // Add video to container (hidden)
    container.appendChild(video);
    videoRef.current = video;

    // Video event handlers
    video.addEventListener('loadeddata', () => {
      console.log('🎬 360° Video loaded:', videoSrc);
      createAFrameScene();
    });

    video.addEventListener('canplay', () => {
      console.log('✅ 360° Video can play');
      video.play().catch(() => {
        console.log('Autoplay prevented, user interaction required');
      });
    });

    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));
    
    // Add timeout for loading
    const loadTimeout = setTimeout(() => {
      if (video.readyState < 3) { // HAVE_FUTURE_DATA
        console.warn('⚠️ Video loading timeout');
        if (videoSrc.toLowerCase().includes('.mkv')) {
          showMKVFallback();
        } else {
          setIsLoading(false);
          onError?.('Video loading timeout');
        }
      }
    }, 10000); // 10 second timeout
    
    // Clear timeout when video loads
    video.addEventListener('canplay', () => {
      clearTimeout(loadTimeout);
    });
    video.addEventListener('error', (e) => {
      console.error('❌ 360° Video error:', e);
      console.error('Video source:', videoSrc);
      console.error('Video readyState:', video.readyState);
      console.error('Video networkState:', video.networkState);
      
      // Check if it's an MKV file
      if (videoSrc.toLowerCase().includes('.mkv')) {
        console.warn('⚠️ MKV files may not be supported by this browser');
        showMKVFallback();
      } else {
        setIsLoading(false);
        onError?.(`Failed to load 360° video: ${videoSrc}`);
      }
    });
    
    const showMKVFallback = () => {
      setIsLoading(false);
      // Create fallback message
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'flex items-center justify-center h-full bg-black text-white';
      fallbackDiv.innerHTML = `
        <div class="text-center p-8">
          <div class="text-6xl mb-4">🎥</div>
          <h3 class="text-xl font-bold mb-4">MKV File Detected</h3>
          <p class="text-gray-300 mb-4">Your browser doesn't natively support MKV video files for 360° viewing.</p>
          <div class="text-sm text-gray-400">
            <p class="mb-2">Recommendations:</p>
            <ul class="text-left space-y-1">
              <li>• Convert MKV files to MP4 format</li>
              <li>• Use Chrome or Edge browser</li>
              <li>• Download VLC for full MKV support</li>
            </ul>
          </div>
          <p class="text-xs text-gray-500 mt-4">File: ${videoSrc.split('/').pop()}</p>
        </div>
      `;
      container.appendChild(fallbackDiv);
    };

    const createAFrameScene = () => {
      // Create A-Frame scene
      const sceneHTML = `
        <a-scene 
          embedded 
          style="width: 100%; height: 100%; display: block;"
          vr-mode-ui="enabled: false"
          background="color: #000000"
          renderer="antialias: true"
        >
          <a-videosphere 
            src="#video-360-source"
            radius="100"
            rotation="0 0 0"
          ></a-videosphere>
          
          <a-camera
            look-controls="enabled: true; pointerLockEnabled: false"
            wasd-controls="enabled: false"
            position="0 0 0"
          >
          </a-camera>
        </a-scene>
      `;

      // Insert scene after video
      const sceneDiv = document.createElement('div');
      sceneDiv.innerHTML = sceneHTML;
      sceneDiv.style.width = '100%';
      sceneDiv.style.height = '100%';
      sceneDiv.style.position = 'relative';
      
      container.appendChild(sceneDiv);
      
      // Mark as loaded
      setTimeout(() => {
        setIsLoading(false);
        console.log('🌐 A-Frame 360° scene ready');
      }, 1000);
    };

    // Cleanup function
    return () => {
      clearTimeout(loadTimeout);
      if (video) {
        video.pause();
        video.src = '';
        video.remove();
      }
      container.innerHTML = '';
    };
  }, [videoSrc, isVisible, aFrameReady, onError]);

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
    // Reset camera rotation by recreating scene
    if (containerRef.current && aFrameReady) {
      const scene = containerRef.current.querySelector('a-scene');
      if (scene) {
        const camera = scene.querySelector('a-camera');
        if (camera) {
          camera.setAttribute('rotation', '0 0 0');
        }
      }
    }
  };

  const enterFullscreen = () => {
    if (containerRef.current && containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
      <div 
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: '70vh', height: '100%' }}
      />

      {/* Loading Overlay */}
      {(isLoading || !aFrameReady) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm rounded-lg z-10">
          <div className="text-white text-center">
            <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg mb-2">Loading 360° Experience</p>
            <p className="text-sm text-gray-300">
              {!aFrameReady ? 'Initializing 360° viewer...' : 'Preparing monastery tour...'}
            </p>
          </div>
        </div>
      )}

      {/* Custom Controls */}
      {!isLoading && aFrameReady && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 z-10">
          {/* Play/Pause */}
          <Button
            size="sm"
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90 text-white shadow-lg"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>

          {/* Mute/Unmute */}
          <Button
            size="sm"
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>

          {/* Reset View */}
          <Button
            size="sm"
            onClick={resetView}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          {/* Fullscreen */}
          <Button
            size="sm"
            onClick={enterFullscreen}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
            title="Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Instructions */}
      {!isLoading && aFrameReady && (
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white text-sm max-w-sm z-10">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
            <span className="font-semibold">360° Monastery Tour</span>
          </div>
          <ul className="text-xs space-y-1 text-gray-300">
            <li>🖱️ <strong>Drag</strong> to look around</li>
            <li>🔄 <strong>360° view</strong> in all directions</li>
            <li>🎮 <strong>Controls</strong> for playback</li>
          </ul>
        </div>
      )}

      {/* Video Status */}
      {!isLoading && aFrameReady && (
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white text-sm z-10">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-xs">360° Active</span>
          </div>
        </div>
      )}
    </div>
  );
}