import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Globe, Volume2, Info, Camera, ArrowLeft, ArrowRight, MapPin, Book, Users } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Reliable360Viewer } from './Reliable360Viewer';

type Hotspot = {
  id: string;
  x?: number;
  y?: number;
  title: string;
  description?: string;
  icon?: any;
  videoFile?: string;
  is360?: boolean;
  color?: string;
};

export function VirtualTourPage() {
  const [currentView, setCurrentView] = useState<string>('outside'); // 'outside', 'interior', 'prayer-hall', 'meditation'
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [use360Viewer, setUse360Viewer] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Rumtek monastery specific hotspots with video connections
  const rumtekHotspots: Hotspot[] = [
    {
      id: 'interior',
      x: 45,
      y: 35,
      title: "Interior View",
      description: "Explore the magnificent interior of the monastery",
      icon: MapPin,
      videoFile: "/assets/videos/inside monestry.mkv", // Your interior MKV file
      is360: true, // This is a 360° video
      color: "from-[var(--monastery-maroon)] to-[var(--monastery-saffron)]"
    },
    {
      id: 'tawang',
      x: 25,
      y: 60,
      title: "Tawang Monastery",
      description: "Experience the sacred Tawang Monastery",
      icon: Book,
      videoFile: "/assets/videos/Tawang Monastery.mkv", // Your Tawang MKV file
      is360: true, // This is a 360° video
      color: "from-[var(--monastery-saffron)] to-[var(--monastery-gold)]"
    },
    {
      id: 'meditation',
      x: 70,
      y: 50,
      title: "360° Experience",
      description: "Immersive 360-degree monastery experience",
      icon: Users,
      videoFile: "/assets/videos/outside 360.mp4", // Alternative view with your outside video
      is360: true, // This is also 360° video
      color: "from-[var(--monastery-emerald)] to-[var(--monastery-maroon)]"
    }
  ];
  
  useEffect(() => {
    // Auto-loop the outside view video
    if (videoRef.current && currentView === 'outside') {
      videoRef.current.loop = true;
      videoRef.current.play().catch(console.error);
    }
  }, [currentView]);

  const handleHotspotClick = (hotspot: Hotspot) => {
    setCurrentView(hotspot.id);
    setSelectedHotspot(hotspot);
    // Automatically enable 360° viewer for 360° videos (MKV files)
    if (hotspot.is360 || hotspot.videoFile?.endsWith('.mkv')) {
      setUse360Viewer(true);
    } else {
      setUse360Viewer(false);
    }
  };
  
  const handleBackToOutside = () => {
    setCurrentView('outside');
    setSelectedHotspot(null);
    setUse360Viewer(false);
  };
  
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <Badge className="bg-gradient-to-r from-[var(--monastery-maroon)] to-[var(--monastery-saffron)] text-white border-none px-4 py-2 mb-4">
            <Camera className="w-4 h-4 mr-2" />
            Virtual Monastery Experience
          </Badge>
          <h1 className="mb-4 text-4xl md:text-5xl">Rumtek Monastery Tour</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Experience the sacred spaces of Rumtek Monastery through immersive video tours.
          </p>
        </motion.div>

        {/* Main Video Viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Card className="overflow-hidden bg-gradient-to-b from-[var(--monastery-maroon)]/10 to-[var(--monastery-saffron)]/10 border-2 border-[var(--monastery-gold)]/30">
            <CardContent className="p-0">
              <div className="relative h-[70vh] md:h-[80vh] bg-black">
                {/* Video Player with 360° Support */}
                {currentView === 'outside' ? (
                  <video
                    ref={videoRef}
                    className="object-cover w-full h-full" // Cover entire rectangle
                    loop
                    muted
                    autoPlay
                    playsInline
                  >
                    <source src="/assets/videos/outside 360.mp4" type="video/mp4" />
                    {/* Fallback image if video not found */}
                    <img 
                      src="https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                      alt="Monastery Outside View" 
                      className="object-cover w-full h-full"
                    />
                  </video>
                ) : use360Viewer ? (
                  <Reliable360Viewer 
                    videoSrc={selectedHotspot?.videoFile || ''}
                    isVisible={use360Viewer}
                    onError={(error) => {
                      console.error('360° Video Error:', error);
                      // Fallback to regular video player if 360° fails
                      setUse360Viewer(false);
                    }}
                  />
                ) : (
                  <video
                    className="object-cover w-full h-full" // Cover entire rectangle for all videos
                    controls
                    autoPlay
                    key={selectedHotspot?.videoFile} // Force re-render when video changes
                    onError={(e) => console.error('Video loading error:', selectedHotspot?.videoFile)}
                  >
                    {/* Try multiple source formats */}
                    <source src={selectedHotspot?.videoFile} type="video/mp4" />
                    <source src={selectedHotspot?.videoFile} type="video/x-matroska" />
                    <source src={selectedHotspot?.videoFile} type="video/webm" />
                    <div className="flex items-center justify-center h-full">
                      <div className="p-8 text-center text-white">
                        <p className="mb-4 text-lg">❌ Video Loading Error</p>
                        <p className="mb-4 text-sm">File: {selectedHotspot?.videoFile}</p>
                        <p className="text-xs text-gray-300">
                          Regular video player - not 360° compatible
                        </p>
                      </div>
                    </div>
                  </video>
                )}
                {/* Current View Indicator */}
                <div className="absolute px-3 py-2 text-white rounded-lg top-4 left-4 bg-black/70 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    {use360Viewer ? (
                      <Globe className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                    <span className="text-sm">
                      {currentView === 'outside' ? 'Outside View' : selectedHotspot?.title || 'Video Tour'}
                    </span>
                    {use360Viewer && (
                      <Badge className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-0.5 border border-yellow-400/30">
                        360°
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Back Button (only show when not on outside view) */}
                {currentView !== 'outside' && (
                  <div className="absolute top-4 right-4">
                    <Button
                      onClick={handleBackToOutside}
                      className="text-white bg-black/70 backdrop-blur-sm border-white/30 hover:bg-white/20"
                      size="sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Outside
                    </Button>
                  </div>
                )}


                {/* Video Status Indicator */}
                <div className="absolute bottom-4 left-4">
                  <div className="px-3 py-2 text-white rounded-lg bg-black/70 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        use360Viewer ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm">
                        {currentView === 'outside' 
                          ? 'Live Outside View' 
                          : use360Viewer 
                            ? '360° Interactive Tour' 
                            : 'Video Tour'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* 360° Instructions - Only show for 360° videos */}
                {use360Viewer && selectedHotspot && (
                  <div className="absolute max-w-sm px-4 py-3 text-white rounded-lg bottom-4 right-4 bg-black/80 backdrop-blur-sm">
                    <div className="flex items-center mb-2 space-x-2">
                      <Globe className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-semibold">360° Experience</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-300">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-300">🔄</span>
                        <span>Drag to look around</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-300">🔍</span>
                        <span>Mouse wheel to zoom</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-300">🎮</span>
                        <span>Use controls for playback</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Additional Video Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="mb-4 text-center">
            <h2 className="mb-1 text-xl font-semibold">More Monastery Videos</h2>
            <p className="text-sm text-muted-foreground">Explore additional video content</p>
            
          </div>
          
          <div className="grid max-w-3xl grid-cols-1 gap-4 mx-auto md:grid-cols-2">
            {/* First Additional Video Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-[var(--monastery-maroon)]/10 to-[var(--monastery-saffron)]/10 border border-[var(--monastery-gold)]/30 cursor-pointer hover:shadow-md transition-all duration-300"
                onClick={() => {
                  const hotspot = {
                    id: 'interior-video',
                    title: 'Interior Monastery',
                    videoFile: '/assets/videos/inside monestry.mkv',
                    is360: true
                  };
                  setCurrentView('interior-video');
                  setSelectedHotspot(hotspot);
                  setUse360Viewer(true);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[var(--monastery-maroon)] to-[var(--monastery-saffron)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-base font-semibold">Interior Monastery Experience</h3>
                      <p className="mb-2 text-xs text-muted-foreground">
                        Explore the sacred interior spaces.
                      </p>
                      <Badge className="bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white text-xs">
                        <Camera className="w-2 h-2 mr-1" />
                        MKV Video
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Second Additional Video Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-[var(--monastery-emerald)]/10 to-[var(--monastery-maroon)]/10 border border-[var(--monastery-gold)]/30 cursor-pointer hover:shadow-md transition-all duration-300"
                onClick={() => {
                  const hotspot = {
                    id: 'tawang-video',
                    title: 'Tawang Monastery',
                    videoFile: '/assets/videos/Tawang Monastery.mkv',
                    is360: true
                  };
                  setCurrentView('tawang-video');
                  setSelectedHotspot(hotspot);
                  setUse360Viewer(true);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[var(--monastery-emerald)] to-[var(--monastery-maroon)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-base font-semibold">Tawang Monastery Journey</h3>
                      <p className="mb-2 text-xs text-muted-foreground">
                        Discover the magnificent Tawang Monastery.
                      </p>
                      <Badge className="bg-gradient-to-r from-[var(--monastery-emerald)] to-[var(--monastery-maroon)] text-white text-xs">
                        <MapPin className="w-2 h-2 mr-1" />
                        MKV Video
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Tour Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <Card className="bg-gradient-to-br from-[var(--monastery-maroon)]/10 to-[var(--monastery-saffron)]/10">
            <CardContent className="p-6">
              <div className="flex items-center mb-4 space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[var(--monastery-maroon)] to-[var(--monastery-saffron)] rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Immersive Video Tours</h3>
                  <p className="text-sm text-muted-foreground">Multiple video perspectives</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Experience Rumtek Monastery through high-quality video tours. Click hotspots to explore interior spaces, prayer halls, and meditation chambers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[var(--monastery-saffron)]/10 to-[var(--monastery-gold)]/10">
            <CardContent className="p-6">
              <div className="flex items-center mb-4 space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Multiple Video Formats</h3>
                  <p className="text-sm text-muted-foreground">MP4 & MKV support</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Our virtual tour supports various video formats including high-quality MKV and MP4 files for the best viewing experience.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[var(--monastery-emerald)]/10 to-[var(--monastery-maroon)]/10">
            <CardContent className="p-6">
              <div className="flex items-center mb-4 space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[var(--monastery-emerald)] to-[var(--monastery-maroon)] rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Rumtek Monastery</h3>
                  <p className="text-sm text-muted-foreground">Sikkim's most sacred site</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Explore the largest monastery in Sikkim, featuring stunning architecture, sacred halls, and peaceful meditation spaces through immersive video experiences.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}