import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download, MapPin, Clock, Languages, Wifi, WifiOff, Headphones, Home } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { 
  audioData, 
  getAllMonasteries, 
  getTracksByMonasteryAndLanguage, 
  getAvailableLanguagesForMonastery,
  supportedLanguages,
  type AudioTrack,
  type MonasteryAudio 
} from "../data/audio-data";

export function AudioGuidePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedMonastery, setSelectedMonastery] = useState("rumtek");
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get data from the new structure
  const monasteries = getAllMonasteries();
  const currentMonastery = monasteries.find(m => m.id === selectedMonastery);
  
  const availableLanguages = getAvailableLanguagesForMonastery(selectedMonastery);
  const audioTracks = getTracksByMonasteryAndLanguage(selectedMonastery, selectedLanguage);
  const currentTrack = audioTracks[currentTrackIndex];

  // Audio player functionality
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (currentTrackIndex < audioTracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      }
    };
    
    const handleError = (e: Event) => {
      console.error('Audio loading error:', e);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      console.log('Audio can play:', currentTrack?.audioFile);
    };

    // Reset audio state when track changes
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentTrackIndex, audioTracks.length, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    setProgress(duration > 0 ? (currentTime / duration) * 100 : 0);
  }, [currentTime, duration]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
      setIsPlaying(false);
    }
  };

  const skipToPrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setIsPlaying(false);
    }
  };

  const skipToNext = () => {
    if (currentTrackIndex < audioTracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const features = [
    {
      icon: Languages,
      title: "Multi-Language Support",
      description: `Available in ${availableLanguages.length} languages with native speakers`,
      color: "from-[var(--monastery-maroon)] to-[var(--monastery-saffron)]"
    },
    {
      icon: WifiOff,
      title: "Offline Mode",
      description: "Download guides for internet-free exploration",
      color: "from-[var(--monastery-saffron)] to-[var(--monastery-gold)]"
    },
    {
      icon: MapPin,
      title: "Location-Based",
      description: "GPS-triggered content for immersive experiences",
      color: "from-[var(--monastery-gold)] to-[var(--monastery-emerald)]"
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white border-none px-4 py-2 mb-4">
            <Headphones className="w-4 h-4 mr-2" />
            Smart Audio Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl mb-4">Immersive Audio Experience</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let authentic voices guide you through sacred spaces with location-aware narrations and multilingual support.
          </p>
        </motion.div>

        {/* Monastery and Language Selectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Monastery Selector */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Home className="w-5 h-5 text-[var(--monastery-gold)]" />
                <h3 className="font-semibold">Select Monastery</h3>
              </div>
              <select 
key={`monastery-select-${monasteries.length}`}
                value={selectedMonastery}
                onChange={(e) => {
                  setSelectedMonastery(e.target.value);
                  setCurrentTrackIndex(0);
                  setIsPlaying(false);
                  const newAvailableLanguages = getAvailableLanguagesForMonastery(e.target.value);
                  if (!newAvailableLanguages.includes(selectedLanguage)) {
                    setSelectedLanguage(newAvailableLanguages[0] || 'en');
                  }
                }}
                className="w-full p-2 border border-[var(--monastery-gold)]/30 rounded-md bg-white text-sm"
                style={{minHeight: '40px', fontSize: '14px'}}
              >
                {monasteries.map((monastery) => (
                  <option key={monastery.id} value={monastery.id}>
                    {monastery.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                {currentMonastery?.location}
              </p>
            </CardContent>
          </Card>

          {/* Language Selector */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Languages className="w-5 h-5 text-[var(--monastery-gold)]" />
                <h3 className="font-semibold">Select Language</h3>
              </div>
              <select 
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  setCurrentTrackIndex(0);
                  setIsPlaying(false);
                }}
                className="w-full p-2 border border-[var(--monastery-gold)]/30 rounded-md bg-white text-sm"
              >
                {availableLanguages.map((langCode) => {
                  const langInfo = supportedLanguages.find(l => l.code === langCode);
                  return (
                    <option key={langCode} value={langCode}>
                      {langInfo?.nativeName || langInfo?.name || langCode}
                    </option>
                  );
                })}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                {audioTracks.length} audio guides available
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Audio Player */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Main Player Card */}
            <Card className="overflow-hidden bg-gradient-to-br from-[var(--monastery-maroon)]/10 to-[var(--monastery-saffron)]/10 border-2 border-[var(--monastery-gold)]/30">
              <CardContent className="p-0">
                {/* Player Header */}
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `linear-gradient(rgba(139, 0, 0, 0.7), rgba(255, 140, 0, 0.7)), url('${currentMonastery?.image || 'https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080'}')`
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={isPlaying ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                      transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                      className="text-center text-white"
                    >
                      <h3 className="text-2xl font-semibold mb-2">{currentTrack?.title || 'No track selected'}</h3>
                      <p className="text-white/90">Narrated by {currentTrack?.narrator || 'Unknown'}</p>
                    </motion.div>
                  </div>
                  
                  {/* Hidden Audio Element */}
                  {currentTrack && (
                    <audio 
                      ref={audioRef}
                      src={currentTrack.audioFile}
                      preload="metadata"
                    />
                  )}
                  

                  {/* Offline Mode Toggle */}
                  <div className="absolute top-4 left-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsOfflineMode(!isOfflineMode)}
                      className={`${
                        isOfflineMode 
                          ? 'bg-[var(--monastery-emerald)] text-white border-[var(--monastery-emerald)]' 
                          : 'bg-black/50 text-white border-white/30'
                      } backdrop-blur-sm`}
                    >
                      {isOfflineMode ? <WifiOff className="w-4 h-4 mr-2" /> : <Wifi className="w-4 h-4 mr-2" />}
                      {isOfflineMode ? 'Offline' : 'Online'}
                    </Button>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2 bg-muted">
                        <div 
                          className="h-full bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] transition-all duration-300 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </Progress>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Transport Controls */}
                    <div className="flex items-center justify-center space-x-6">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-12 h-12 rounded-full border-[var(--monastery-gold)]/30"
                        onClick={skipToPrevious}
                        disabled={currentTrackIndex === 0}
                      >
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      
                      <Button
                        size="lg"
                        onClick={togglePlay}
                        disabled={!currentTrack}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] hover:opacity-90 text-white shadow-lg"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </Button>
                      
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-12 h-12 rounded-full border-[var(--monastery-gold)]/30"
                        onClick={skipToNext}
                        disabled={currentTrackIndex >= audioTracks.length - 1}
                      >
                        <SkipForward className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Volume and Download */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Volume2 className="w-5 h-5 text-muted-foreground" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-[var(--monastery-gold)]/30"
                          disabled={!currentTrack}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Badge className={`${
                          currentTrack?.downloaded 
                            ? 'bg-[var(--monastery-emerald)]' 
                            : 'bg-muted'
                        } text-white`}>
                          {currentTrack?.downloaded ? 'Downloaded' : 'Stream Only'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Track Description */}
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[var(--monastery-maroon)] to-[var(--monastery-saffron)] rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3>About This Guide</h3>
                    <p className="text-sm text-muted-foreground font-normal">{currentMonastery?.name}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{currentTrack?.description || 'No track selected'}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentTrack?.duration || '0:00'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Headphones className="w-4 h-4" />
                    <span>{currentTrack?.narrator || 'Unknown'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location-Aware Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="text-center h-full bg-white/70 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-sm mb-2">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Playlist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Audio Guide Playlist</h3>
              <Badge className="bg-gradient-to-r from-[var(--monastery-emerald)] to-[var(--monastery-maroon)] text-white">
                {audioTracks.filter(t => t.downloaded).length}/{audioTracks.length} Downloaded
              </Badge>
            </div>

            {audioTracks.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {audioTracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 ${
                        currentTrackIndex === index 
                          ? 'ring-2 ring-[var(--monastery-gold)] bg-gradient-to-r from-[var(--monastery-saffron)]/10 to-[var(--monastery-gold)]/10' 
                          : 'bg-white/70 backdrop-blur-sm hover:shadow-md'
                      }`}
                      onClick={() => {
                        setCurrentTrackIndex(index);
                        setIsPlaying(false);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Button
                            size="sm"
                            variant={currentTrackIndex === index && isPlaying ? "default" : "outline"}
                            className={`w-8 h-8 rounded-full flex-shrink-0 ${
                              currentTrackIndex === index && isPlaying 
                                ? 'bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white' 
                                : 'border-[var(--monastery-gold)]/30'
                            }`}
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (currentTrackIndex === index) {
                                await togglePlay();
                              } else {
                                setCurrentTrackIndex(index);
                                // Give time for audio element to update
                                setTimeout(async () => {
                                  await togglePlay();
                                }, 100);
                              }
                            }}
                          >
                            {currentTrackIndex === index && isPlaying ? (
                              <Pause className="w-3 h-3" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </Button>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm mb-1 truncate">{track.title}</h4>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <span>{track.duration}</span>
                              <span>•</span>
                              <span>{track.narrator}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 truncate">{track.description}</p>
                            <Badge 
                              variant="outline" 
                              className="mt-1 text-xs px-1 py-0 border-[var(--monastery-gold)]/30"
                            >
                              {track.category}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-col items-end space-y-1">
                            {track.downloaded ? (
                              <Badge className="bg-[var(--monastery-emerald)] text-white text-xs">
                                <Download className="w-3 h-3 mr-1" />
                                Offline
                              </Badge>
                            ) : (
                              <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                                <Download className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No audio tracks available for this monastery in the selected language.</p>
                <p className="text-sm text-muted-foreground">Try selecting a different language or monastery.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}