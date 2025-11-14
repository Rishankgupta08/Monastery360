// Audio data structure organized by monastery and language
export interface AudioTrack {
  id: string;
  title: string;
  description: string;
  duration: string;
  narrator: string;
  category: 'introduction' | 'history' | 'architecture' | 'rituals' | 'meditation' | 'art' | 'culture';
  audioFile: string;
  downloaded: boolean;
}

export interface MonasteryAudio {
  id: string;
  name: string;
  location: string;
  image: string;
  languages: {
    [languageCode: string]: {
      name: string;
      tracks: AudioTrack[];
    };
  };
}

export const audioData: MonasteryAudio[] = [
  {
    id: 'rumtek',
    name: 'Rumtek Monastery',
    location: 'Gangtok, Sikkim',
    image: 'https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    languages: {
      'en': {
        name: 'English',
        tracks: [
          {
            id: 'rumtek-en-1',
            title: 'Welcome to Rumtek Monastery',
            description: 'Introduction to the largest monastery in Sikkim and its historical significance',
            duration: '4:15',
            narrator: 'Lama Tenzin',
            category: 'introduction',
            audioFile: '/assets/audio/rumtek/Runtuk-English.mp3',
            downloaded: true
          }
        ]
      },
      'hi': {
        name: 'Hindi',
        tracks: [
          {
            id: 'rumtek-hi-1',
            title: 'रुमटेक मठ में आपका स्वागत है',
            description: 'सिक्किम की सबसे बड़ी मठ और इसके ऐतिहासिक महत्व का परिचय',
            duration: '4:20',
            narrator: 'लामा तेनजिन',
            category: 'introduction',
            audioFile: '/assets/audio/rumtek/Rumtuk-Hindi.mp3',
            downloaded: true
          }
        ]
      },
      'pa': {
        name: 'Punjabi',
        tracks: [
          {
            id: 'rumtek-pa-1',
            title: 'ਰੁਮਟੇਕ ਮੰਦਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
            description: 'ਸਿੱਕਿਮ ਦੇ ਸਭ ਤੋਂ ਵੱਡੇ ਮੰਦਰ ਅਤੇ ਇਸਦੇ ਇਤਿਹਾਸਕ ਮਹੱਤਵ ਦਾ ਪਰਿਚਾ',
            duration: '4:25',
            narrator: 'ਲਾਮਾ ਤੇਨਜਿਨ',
            category: 'introduction',
            audioFile: '/assets/audio/rumtek/rumtuk-Punjabi.mp3',
            downloaded: true
          }
        ]
      }
    }
  },
  {
    id: 'enchey',
    name: 'Enchey Monastery',
    location: 'Gangtok, Sikkim',
    image: 'https://images.unsplash.com/photo-1704797390836-5dd5e0951832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1vbmFzdGVyeSUyMGludGVyaW9yJTIwbXVyYWxzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    languages: {
      'en': {
        name: 'English',
        tracks: [
          {
            id: 'enchey-en-1',
            title: 'Sacred Nyingma Heritage',
            description: 'Explore the 200-year old Nyingma monastery and its spiritual traditions',
            duration: '4:10',
            narrator: 'Lama Dorje',
            category: 'history',
            audioFile: '/assets/audio/enchey/Enchey-English.mp3',
            downloaded: true
          }
        ]
      },
      'hi': {
        name: 'Hindi',
        tracks: [
          {
            id: 'enchey-hi-1',
            title: 'पवित्र न्यिंगमा विरासत',
            description: '200 साल पुराने न्यिंगमा मठ और इसकी आध्यात्मिक परंपराओं की खोज',
            duration: '4:20',
            narrator: 'लामा दोर्जे',
            category: 'history',
            audioFile: '/assets/audio/enchey/Enchy-Hindi.mp3',
            downloaded: true
          }
        ]
      },
      'pa': {
        name: 'Punjabi',
        tracks: [
          {
            id: 'enchey-pa-1',
            title: 'ਪਵਿੱਤਰ ਨਿੰਗਮਾ ਵਿਰਾਸਤ',
            description: '200 ਸਾਲ ਪੁਰਾਨੇ ਨਿੰਗਮਾ ਮੰਦਰ ਅਤੇ ਇਸਦੀਆਂ ਅਧਿਆਤਮਿਕ ਪਰੰਪਰਾਵਾਂ ਦੀ ਖੋਜ',
            duration: '4:25',
            narrator: 'ਲਾਮਾ ਦੋਰਜੇ',
            category: 'history',
            audioFile: '/assets/audio/enchey/enchey-Punjabi.mp3',
            downloaded: true
          }
        ]
      },
      'ne': {
        name: 'Nepali',
        tracks: [
          {
            id: 'enchey-ne-1',
            title: 'पवित्र न्यिंगमा विरासत',
            description: '200 वर्ष पुरानो न्यिंगमा मठ र यसका आध्यात्मिक परम्पराहरूको खोज',
            duration: '4:30',
            narrator: 'लामा दोर्जे',
            category: 'history',
            audioFile: '/assets/audio/enchey/Enchy-Nepali.mp3',
            downloaded: true
          }
        ]
      }
    }
  },
  {
    id: 'phodong',
    name: 'Phodong Monastery',
    location: 'North Sikkim',
    image: 'https://images.unsplash.com/photo-1611955166156-9ae5e948c6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaWJldGFuJTIwcHJheWVyJTIwZmxhZ3MlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    languages: {
      'en': {
        name: 'English',
        tracks: [
          {
            id: 'phodong-en-1',
            title: 'Phodong Sacred Heritage',
            description: 'Journey through the historical Phodong monastery and its significance',
            duration: '5:15',
            narrator: 'Lama Karma',
            category: 'history',
            audioFile: '/assets/audio/pemayangtse/phodong-English.mp3',
            downloaded: true
          }
        ]
      },
      'ne': {
        name: 'Nepali',
        tracks: [
          {
            id: 'phodong-ne-1',
            title: 'फोडंग पवित्र विरासत',
            description: 'ऐतिहासिक फोडंग मठ र यसको महत्त्वको यात्रा',
            duration: '5:20',
            narrator: 'लामा कर्म',
            category: 'history',
            audioFile: '/assets/audio/pemayangtse/phodong-Nepali.mp3',
            downloaded: true
          }
        ]
      }
    }
  },
  {
    id: 'tashiding',
    name: 'Tashiding Monastery',
    location: 'West Sikkim',
    image: 'https://images.unsplash.com/photo-1643442240897-c3286093d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    languages: {
      'tb': {
        name: 'Tibetan',
        tracks: [
          {
            id: 'tashiding-tb-1',
            title: 'བསྐར་དིང་དགོན་པ་རུབ་བསུ་འདེགས།',
            description: 'ཡང་གཉིས་མེ་དགོན་པ་བསྐར་དིང་གི་དགོན་པར་རུབ་བསུ།',
            duration: '4:35',
            narrator: 'བླ་མ་ཕུན་པཨོག',
            category: 'introduction',
            audioFile: '/assets/audio/tashiding/welcome-tb.mp3',
            downloaded: false
          }
        ]
      },
      'bh': {
        name: 'Bhutia',
        tracks: [
          {
            id: 'tashiding-bh-1',
            title: 'བྷུ་ཊི་ཡ་བསྐར་དིང་གོམ་པ་རུབ་བསུ།',
            description: 'བྷུ་ཊི་ཡ་རིགས་དགོན་པ་གི་མེ་ཡབ་བསྐར་དིང་སྐོར',
            duration: '4:40',
            narrator: 'བླ་མ་ཊི་བའོ་ཛེ',
            category: 'introduction',
            audioFile: '/assets/audio/tashiding/welcome-bh.mp3',
            downloaded: false
          }
        ]
      }
    }
  },
  {
    id: 'dubdi',
    name: 'Dubdi Monastery',
    location: 'Yuksom, West Sikkim',
    image: 'https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1hbnVzY3JpcHRzJTIwYW5jaWVudCUyMHRleHRzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    languages: {
      'en': {
        name: 'English',
        tracks: [
          {
            id: 'dubdi-en-1',
            title: 'First Monastery of Sikkim',
            description: 'Explore the historical significance of Sikkim\'s very first monastery',
            duration: '4:45',
            narrator: 'Lama Thukje',
            category: 'history',
            audioFile: '/assets/audio/dubdi/first-monastery-en.mp3',
            downloaded: false
          }
        ]
      },
      'tb': {
        name: 'Tibetan',
        tracks: [
          {
            id: 'dubdi-tb-1',
            title: 'སིག་གིམ་གི་དགོན་པ་དང་པོ',
            description: 'སིག་གིམ་གི་དགོན་པ་དང་པོ་རོབས་བའི་སྐོར',
            duration: '4:50',
            narrator: 'བླ་མ་ཡུག་ཛེ',
            category: 'history',
            audioFile: '/assets/audio/dubdi/first-monastery-tb.mp3',
            downloaded: false
          }
        ]
      }
    }
  },
  {
    id: 'pemayangtse',
    name: 'Pemayangtse Monastery',
    location: 'Pelling, West Sikkim',
    image: 'https://images.unsplash.com/photo-1611955166156-9ae5e948c6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaWJldGFuJTIwcHJheWVyJTIwZmxhZ3MlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    languages: {
      'en': {
        name: 'English',
        tracks: [
          {
            id: 'pemayangtse-en-1',
            title: 'Premier Monastery of Sikkim',
            description: 'Journey through the oldest and most prestigious monastery of Sikkim',
            duration: '5:15',
            narrator: 'Lama Karma',
            category: 'history',
            audioFile: '/assets/audio/pemayangtse/premier-en.mp3',
            downloaded: false
          }
        ]
      },
      'bh': {
        name: 'Bhutia',
        tracks: [
          {
            id: 'pemayangtse-bh-1',
            title: 'བྷུ་ཊི་ཡ་སིག་གིམ་གི་མཆོག་མ་དགོན་པ',
            description: 'བྷུ་ཊི་ཡ་ རིགས་ མཆོག་མ་དགོན་པ་ཆེ་ཤོས་དང་མཆོག་མ།',
            duration: '5:25',
            narrator: 'བླ་མ་ཀར་མ',
            category: 'history',
            audioFile: '/assets/audio/pemayangtse/premier-bh.mp3',
            downloaded: false
          }
        ]
      }
    }
  }
];

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'tb', name: 'Tibetan', nativeName: 'བོད་སྐད།' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'bh', name: 'Bhutia', nativeName: 'བྷུ་ཊི་ཡ།' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' }
];

// Utility functions
export const getMonasteryById = (id: string): MonasteryAudio | undefined => {
  return audioData.find(monastery => monastery.id === id);
};


export const getTracksByMonasteryAndLanguage = (monasteryId: string, languageCode: string): AudioTrack[] => {
  const monastery = getMonasteryById(monasteryId);
  return monastery?.languages[languageCode]?.tracks || [];
};

export const getAllMonasteries = (): MonasteryAudio[] => {
  return audioData;
};

export const getAvailableLanguagesForMonastery = (monasteryId: string): string[] => {
  const monastery = getMonasteryById(monasteryId);
  return monastery ? Object.keys(monastery.languages) : [];
};