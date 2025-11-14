import React, { useRef, useEffect, useState } from 'react';

interface Simple360ViewerProps {
  videoSrc: string;
  isVisible: boolean;
  onError?: (error: string) => void;
}

export function Simple360Viewer({ videoSrc, isVisible, onError }: Simple360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const container = containerRef.current;
    
    // Create simple video element that always works
    const video = document.createElement('video');
    video.src = videoSrc;
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.controls = true; // Add controls for user interaction
    
    // Style the video to fit the container
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.backgroundColor = '#000';
    
    videoRef.current = video;

    // Clear container and add video
    container.innerHTML = '';
    container.appendChild(video);

    // Simple video event handlers
    video.addEventListener('loadeddata', () => {
      console.log('🎬 Video loaded successfully:', videoSrc);
      setIsLoading(false);
      setVideoError(false);
    });
    
    video.addEventListener('canplay', () => {
      console.log('✅ Video can play - starting playback');
      video.play().catch(error => {
        console.log('Autoplay failed, but video is ready for user interaction');
      });
    });

    video.addEventListener('error', (e) => {
      console.error('❌ Video loading error:', e);
      setIsLoading(false);
      setVideoError(true);
      onError?.('Failed to load video');
    });
    
    video.addEventListener('loadstart', () => {
      console.log('🔄 Video loading started...');
    });

    // Load the video
    video.load();

    // No cleanup needed for simple approach
    return () => {
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
    };
  }, [videoSrc, isVisible, onError]);


  if (!isVisible) return null;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <div 
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: '70vh' }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-white text-center">
            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading Video...</p>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-white text-center p-8">
            <p className="text-lg mb-4">❌ Video Loading Failed</p>
            <p className="text-sm text-gray-300">The video file could not be loaded.</p>
            <p className="text-xs text-gray-400 mt-2">File: {videoSrc}</p>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!isLoading && !videoError && (
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white text-sm max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold">Monastery Video</span>
          </div>
          <ul className="text-xs space-y-1 text-gray-300">
            <li>• Video with controls</li>
            <li>• Auto-loops continuously</li>
            <li>• Click play if needed</li>
          </ul>
        </div>
      )}
    </div>
  );
}