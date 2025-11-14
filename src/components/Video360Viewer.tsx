import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Move } from 'lucide-react';

interface Video360ViewerProps {
  videoSrc: string;
  isVisible: boolean;
  onError?: (error: string) => void;
}

export function Video360Viewer({ videoSrc, isVisible, onError }: Video360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play
  const [isLoading, setIsLoading] = useState(true);
  const [controls, setControls] = useState({
    mouseDown: false,
    mouseX: 0,
    mouseY: 0,
    phi: 0,
    theta: 0,
    zoom: 75
  });

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    // Initialize Three.js scene
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup for 360° viewing
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Video setup with auto-loop
    const video = document.createElement('video');
    video.src = videoSrc;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true; // Required for autoplay
    video.autoplay = true;
    video.playsInline = true;
    videoRef.current = video;

    // Video texture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    // Sphere geometry for 360° video
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Flip inside-out for 360° viewing

    // Material with video texture
    const material = new THREE.MeshBasicMaterial({ 
      map: videoTexture,
      side: THREE.DoubleSide
    });

    // Create sphere mesh
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    // Video loading handlers
    video.addEventListener('loadeddata', () => {
      setIsLoading(false);
      console.log('🎬 360° Video loaded:', videoSrc);
      // Auto-start video when loaded
      video.play().catch(console.error);
    });
    
    video.addEventListener('canplay', () => {
      console.log('✅ 360° Video ready to play');
      video.play().catch(console.error);
    });

    video.addEventListener('error', (e) => {
      console.error('❌ 360° Video error:', e);
      setIsLoading(false);
      onError?.('Failed to load 360° video');
    });

    // Start loading video
    video.load();

    // Mouse controls for 360° navigation - Fixed for seamless rotation
    const handleMouseDown = (event: MouseEvent) => {
      setControls(prev => ({
        ...prev,
        mouseDown: true,
        mouseX: event.clientX,
        mouseY: event.clientY
      }));
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!controls.mouseDown) return;

      const deltaX = event.clientX - controls.mouseX;
      const deltaY = event.clientY - controls.mouseY;

      setControls(prev => ({
        ...prev,
        mouseX: event.clientX,
        mouseY: event.clientY,
        phi: prev.phi + deltaX * 0.005,
        theta: Math.max(-Math.PI/2 + 0.1, Math.min(Math.PI/2 - 0.1, prev.theta + deltaY * 0.005))
      }));
    };

    const handleMouseUp = () => {
      setControls(prev => ({ ...prev, mouseDown: false }));
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      setControls(prev => ({
        ...prev,
        zoom: Math.max(30, Math.min(120, prev.zoom + event.deltaY * 0.05))
      }));
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Animation loop
    const animate = () => {
      // Update camera position based on controls
      const { phi, theta, zoom } = controls;
      camera.fov = zoom;
      camera.updateProjectionMatrix();
      
      // Convert spherical coordinates to Cartesian for camera orientation
      camera.lookAt(
        Math.cos(phi) * Math.cos(theta),
        Math.sin(theta),
        Math.sin(phi) * Math.cos(theta)
      );

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer?.domElement) {
        renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        renderer.domElement.removeEventListener('wheel', handleWheel);
      }
      if (container && renderer?.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, [videoSrc, isVisible, controls.phi, controls.theta, controls.zoom, controls.mouseDown, controls.mouseX, controls.mouseY, onError]);


  if (!isVisible) return null;

  return (
    <div className="relative w-full h-full">
      {/* 360° Video Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full bg-black cursor-grab active:cursor-grabbing"
        style={{ minHeight: '400px' }}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-white text-center">
            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading 360° Video...</p>
          </div>
        </div>
      )}


      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white text-sm max-w-xs">
        <div className="flex items-center space-x-2 mb-2">
          <Move className="w-4 h-4 text-yellow-300" />
          <span className="font-semibold">360° Experience</span>
        </div>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Drag to explore all directions</li>
          <li>• Scroll to zoom in/out</li>
          <li>• Video plays automatically</li>
        </ul>
      </div>
    </div>
  );
}