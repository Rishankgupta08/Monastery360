# 🎵 How Audio Playback Works

## Overview
Your audio guide system uses HTML5 Audio API with React to create a seamless audio playback experience. Here's how it works step by step:

## 🔧 Technical Architecture

### 1. **Audio Element Creation**
```typescript
// Hidden HTML5 audio element is created when a track is selected
{currentTrack && (
  <audio 
    ref={audioRef}
    src={currentTrack.audioFile}  // Path to your MP3 file
    preload="metadata"
  />
)}
```

### 2. **Audio Reference System**
```typescript
const audioRef = useRef<HTMLAudioElement>(null);
```
- Creates a direct reference to the HTML audio element
- Allows JavaScript to control playback programmatically
- No visible audio controls needed - we create custom ones

### 3. **State Management**
```typescript
const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const [volume, setVolume] = useState(75);
```

## 🎮 How Play Button Works

### When You Click Play:

1. **Button Click Handler**
```typescript
const togglePlay = () => {
  const audio = audioRef.current;  // Get audio element
  if (!audio || !currentTrack) return;

  if (isPlaying) {
    audio.pause();     // If playing, pause it
  } else {
    audio.play();      // If paused, play it
  }
  setIsPlaying(!isPlaying);  // Toggle play state
};
```

2. **Audio Element Actions**
- `audio.play()` - Starts playing the MP3 file
- `audio.pause()` - Pauses the audio
- Browser handles the actual MP3 decoding and playback

3. **UI Updates**
- Play button changes to Pause button
- Progress bar starts moving
- Time display updates in real-time

## 📊 Real-Time Updates

### Progress Tracking:
```typescript
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const updateTime = () => setCurrentTime(audio.currentTime);
  const updateDuration = () => setDuration(audio.duration);
  
  audio.addEventListener('timeupdate', updateTime);
  audio.addEventListener('loadedmetadata', updateDuration);
  
  return () => {
    audio.removeEventListener('timeupdate', updateTime);
    audio.removeEventListener('loadedmetadata', updateDuration);
  };
}, [currentTrackIndex]);
```

### What Happens:
1. **`timeupdate` Event** - Fires continuously during playback
2. **Current Time Updates** - Shows elapsed time (e.g., "2:34")
3. **Progress Bar Moves** - Visual representation of playback progress
4. **Duration Display** - Shows total track length (e.g., "4:15")

## 🎚️ Audio Controls Explained

### Volume Control:
```typescript
useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = volume / 100;  // Set volume (0.0 to 1.0)
  }
}, [volume]);
```

### Skip Functions:
```typescript
const skipToNext = () => {
  if (currentTrackIndex < audioTracks.length - 1) {
    setCurrentTrackIndex(currentTrackIndex + 1);  // Load next track
    setIsPlaying(false);  // Reset play state
  }
};
```

### Auto-Play Next Track:
```typescript
const handleEnded = () => {
  setIsPlaying(false);
  if (currentTrackIndex < audioTracks.length - 1) {
    setCurrentTrackIndex(currentTrackIndex + 1);  // Auto-advance
  }
};

audio.addEventListener('ended', handleEnded);
```

## 📁 File Loading Process

### When You Select a Track:

1. **Track Selection**
```typescript
onClick={() => {
  setCurrentTrackIndex(index);  // Set new track
  setIsPlaying(false);          // Reset play state
}}
```

2. **Audio Source Updates**
```typescript
// React automatically updates the audio src when currentTrack changes
src={currentTrack.audioFile}  // e.g., "/assets/audio/rumtek/welcome-pa.mp3"
```

3. **File Loading**
- Browser fetches the MP3 file from your `public/assets/audio/` folder
- `preload="metadata"` loads basic info (duration, format) immediately
- Full audio data loads when play is pressed

## 🌐 Language & Monastery Switching

### How It Works:
```typescript
// When monastery changes
setSelectedMonastery(e.target.value);
setCurrentTrackIndex(0);  // Reset to first track
setIsPlaying(false);      // Stop current playback

// When language changes
setSelectedLanguage(e.target.value);
setCurrentTrackIndex(0);  // Reset to first track
setIsPlaying(false);      // Stop current playback
```

### Data Retrieval:
```typescript
// Gets tracks for specific monastery and language
const audioTracks = getTracksByMonasteryAndLanguage(selectedMonastery, selectedLanguage);
```

## 🔄 Playback Flow

### Complete Play Cycle:
1. **User clicks monastery** → Loads monastery data
2. **User selects language** → Filters tracks by language
3. **User clicks track** → Sets currentTrackIndex
4. **Audio element updates** → src points to MP3 file
5. **User clicks play** → `audio.play()` starts playback
6. **Browser plays MP3** → Audio streams from file
7. **Progress updates** → Real-time UI updates
8. **Track ends** → Auto-advances to next track

## 🎵 Audio File Requirements

### Your MP3 Files Must Be:
- **Located in:** `public/assets/audio/[monastery]/`
- **Named correctly:** `[track-name]-[language-code].mp3`
- **Accessible via HTTP** when served by React dev server

### File Path Resolution:
```
User clicks: Rumtek → Punjabi → "Welcome" track
System loads: /assets/audio/rumtek/welcome-pa.mp3
Browser fetches: http://localhost:3000/assets/audio/rumtek/welcome-pa.mp3
```

## 🎯 Key Features in Action

### 1. **Playlist Click-to-Play**
```typescript
onClick={(e) => {
  e.stopPropagation();  // Don't trigger card click
  if (currentTrackIndex === index) {
    togglePlay();       // Play/pause current track
  } else {
    setCurrentTrackIndex(index);  // Switch to new track
    setIsPlaying(true);           // Start playing immediately
  }
}}
```

### 2. **Visual Feedback**
- **Active track highlighting** - Current track has gold border
- **Play/pause button states** - Icon changes based on playback
- **Progress visualization** - Moving progress bar
- **Time display** - Real-time elapsed/total time

### 3. **Error Handling**
```typescript
const togglePlay = () => {
  const audio = audioRef.current;
  if (!audio || !currentTrack) return;  // Safety checks
  // ... rest of function
};
```

## 🚀 Performance Optimizations

1. **Metadata Preloading** - Gets track info without downloading full file
2. **Single Audio Element** - Reuses same element for all tracks
3. **Event Cleanup** - Removes listeners to prevent memory leaks
4. **Conditional Rendering** - Only creates audio element when track exists

## 🎼 What Happens When You Play Your Punjabi Audio

1. **You select "Rumtek Monastery"**
2. **You select "Punjabi (ਪੰਜਾਬੀ)"**  
3. **System loads Punjabi tracks for Rumtek**
4. **You click play on "ਰੁਮਟੇਕ ਮੰਦਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ"**
5. **Audio element loads:** `/assets/audio/rumtek/welcome-pa.mp3`
6. **Browser streams your Punjabi MP3 file**
7. **You hear your Punjabi narration!** 🎵

The system is now ready to play your Punjabi audio files alongside all other languages! 🎉