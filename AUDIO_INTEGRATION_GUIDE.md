# 🎧 Audio Guide Integration Guide

## Overview
Your audio guide system is now set up to organize MP3 files by monastery and language. Here's how to integrate your audio files:

## 📁 Folder Structure
```
public/assets/audio/
├── rumtek/
│   ├── welcome-en.mp3
│   ├── welcome-hi.mp3
│   ├── welcome-tb.mp3
│   ├── golden-stupa-en.mp3
│   ├── golden-stupa-hi.mp3
│   ├── monastic-life-en.mp3
│   └── prayer-hall-en.mp3
├── enchey/
│   ├── heritage-en.mp3
│   ├── heritage-hi.mp3
│   └── cham-dance-en.mp3
├── pemayangtse/
│   ├── premier-en.mp3
│   └── architecture-en.mp3
├── tashiding/
│   └── sacred-hill-en.mp3
└── dubdi/
    └── first-monastery-en.mp3
```

## 🏮 Available Monasteries
1. **Rumtek Monastery** (`rumtek`) - Gangtok, Sikkim
2. **Enchey Monastery** (`enchey`) - Gangtok, Sikkim  
3. **Pemayangtse Monastery** (`pemayangtse`) - Pelling, West Sikkim
4. **Tashiding Monastery** (`tashiding`) - West Sikkim
5. **Dubdi Monastery** (`dubdi`) - Yuksom, West Sikkim

## 🌐 Language Codes
- **en** - English
- **hi** - Hindi (हिन्दी)
- **pa** - Punjabi (ਪੰਜਾਬੀ)
- **tb** - Tibetan (བོད་སྐད།)
- **ne** - Nepali (नेपाली)
- **bh** - Bhutia (བྷུ་ཊི་ཡ།)
- **bn** - Bengali (বাংলা)

## 📂 How to Add Your MP3 Files

### Step 1: Organize Your Files
Place your MP3 files in the corresponding monastery folder with the naming convention:
```
[track-name]-[language-code].mp3
```

**Example:**
- `welcome-en.mp3` - Welcome audio in English
- `welcome-hi.mp3` - Welcome audio in Hindi
- `welcome-pa.mp3` - Welcome audio in Punjabi
- `golden-stupa-tb.mp3` - Golden Stupa audio in Tibetan

### Step 2: Update Audio Data (Optional)
If you want to add new tracks or modify existing ones, edit the file:
`src/data/audio-data.ts`

**Add a new track:**
```typescript
{
  id: 'rumtek-en-5',
  title: 'New Audio Guide',
  description: 'Description of your new audio guide',
  duration: '4:20',
  narrator: 'Narrator Name',
  category: 'history', // or 'art', 'culture', 'meditation', etc.
  audioFile: '/assets/audio/rumtek/new-guide-en.mp3',
  downloaded: false
}
```

### Step 3: Audio Categories
Choose from these categories for your tracks:
- `introduction` - Welcome and overview
- `history` - Historical significance
- `architecture` - Building and structure details
- `rituals` - Religious ceremonies and practices
- `meditation` - Guided meditation content
- `art` - Artwork, sculptures, and murals
- `culture` - Cultural practices and traditions

## 🎵 Audio File Requirements

### Technical Specifications
- **Format:** MP3
- **Quality:** 128 kbps or higher recommended
- **Sample Rate:** 44.1 kHz
- **Channels:** Mono or Stereo
- **Duration:** 2-8 minutes recommended per track

### Naming Convention
```
[descriptive-name]-[language-code].mp3
```

**Examples:**
- `welcome-en.mp3`
- `prayer-hall-meditation-hi.mp3`
- `welcome-pa.mp3`
- `sacred-murals-tb.mp3`
- `monastery-history-ne.mp3`

## 🚀 Features Available

### 1. **Monastery Selection**
Users can switch between different monasteries using the dropdown selector.

### 2. **Language Selection**
Dynamic language selection based on available audio tracks for each monastery.

### 3. **Audio Player Controls**
- Play/Pause
- Skip Previous/Next
- Volume Control
- Progress Bar
- Time Display

### 4. **Track Information**
- Track title and description
- Narrator information
- Duration
- Category tags
- Download status

### 5. **Playlist Management**
- Visual playlist with all available tracks
- Click to play any track
- Current track highlighting
- Offline/Downloaded status

## 📱 User Interface

### Selectors (Top)
- **Monastery Dropdown:** Switch between different monasteries
- **Language Dropdown:** Select from available languages for the chosen monastery

### Main Player (Left)
- **Background Image:** Shows the selected monastery
- **Audio Controls:** Play, pause, skip, volume
- **Progress Bar:** Shows current playback progress
- **Track Info:** Title, narrator, description

### Playlist (Right)
- **Track List:** All available tracks for selected monastery and language
- **Play Buttons:** Individual play buttons for each track
- **Track Details:** Title, duration, narrator, category
- **Download Status:** Shows if track is available offline

## 🔧 Testing Your Integration

1. **Add your MP3 files** to the appropriate folders
2. **Update the audio data** if adding new tracks
3. **Test the player** by:
   - Selecting different monasteries
   - Switching languages
   - Playing different tracks
   - Checking volume controls
   - Testing skip functions

## 📋 Example File Structure for Your MP3s

If you have these audio files:
- Rumtek welcome in English and Hindi
- Rumtek golden stupa in English
- Enchey heritage in English

Organize them as:
```
public/assets/audio/
├── rumtek/
│   ├── welcome-en.mp3      ← Your English welcome audio
│   ├── welcome-hi.mp3      ← Your Hindi welcome audio
│   └── golden-stupa-en.mp3 ← Your golden stupa audio
└── enchey/
    └── heritage-en.mp3     ← Your Enchey heritage audio
```

## 🎯 Next Steps

1. **Copy your MP3 files** into the folder structure
2. **Test the audio player** in your browser
3. **Add more languages** by creating additional MP3 files
4. **Expand to more monasteries** by adding new monastery data

The system is now ready to handle your MP3 files with full monastery and language organization! 🎉