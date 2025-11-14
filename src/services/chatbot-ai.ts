import { ChatMessage } from '../contexts/chatbot-context';
import { askGemini } from './gemini';

// Monastery knowledge base
export const monasteryData = {
  rumtek: {
    name: 'Rumtek Monastery',
    location: 'Sikkim, India',
    description: 'The largest monastery in Sikkim, also known as Dharmachakra Centre',
    coordinates: { lat: 27.2837, lng: 88.5635 },
    visitingHours: '6:00 AM - 6:00 PM',
    entryFee: 'Free',
    bestTime: 'March to May, September to November',
    nearbyHotels: [
      'Hotel Sikkim Continental - 2km',
      'Summit Norling Resort - 5km',
      'Hotel Golden Heights - 3km'
    ],
    guides: [
      { name: 'Tenzin Norbu', phone: '+91-9876543210', experience: '10 years' },
      { name: 'Karma Lama', phone: '+91-9876543211', experience: '8 years' }
    ]
  },
  tawang: {
    name: 'Tawang Monastery',
    location: 'Arunachal Pradesh, India',
    description: 'The largest monastery in India and second largest in the world',
    coordinates: { lat: 27.5862, lng: 91.8674 },
    visitingHours: '5:00 AM - 8:00 PM',
    entryFee: 'Free',
    bestTime: 'April to October',
    nearbyHotels: [
      'Hotel Tawang Heights - 1km',
      'Dragon Hotel - 2km',
      'Hotel Mon Paradise - 3km'
    ],
    guides: [
      { name: 'Lobsang Tenzin', phone: '+91-9876543212', experience: '12 years' },
      { name: 'Sonam Dorjee', phone: '+91-9876543213', experience: '15 years' }
    ]
  },
  general: {
    visiting_etiquette: [
      'Dress modestly and respectfully',
      'Remove shoes before entering prayer halls',
      'Maintain silence in meditation areas',
      'Don\'t point feet towards Buddha statues',
      'Photography may be restricted in certain areas',
      'Show respect to monks and practitioners'
    ],
    best_practices: [
      'Visit early morning for peaceful experience',
      'Bring offerings like khada (white scarf) if appropriate',
      'Learn basic Buddhist greetings',
      'Respect ongoing prayer sessions',
      'Follow guide instructions carefully'
    ]
  }
};

// Intent detection patterns
const intentPatterns = {
  location: [
    /where is|location of|find|directions to/i,
    /how to reach|how to get to/i,
    /address|coordinates/i
  ],
  hotel: [
    /hotel|accommodation|stay|lodge|guest house/i,
    /where to stay|place to stay/i,
    /booking|reservation/i
  ],
  virtual_tour: [
    /virtual tour|360|video tour|online tour/i,
    /watch|view|see online/i,
    /virtual visit|virtual experience/i
  ],
  guide: [
    /guide|local guide|tour guide/i,
    /contact guide|speak to guide/i,
    /guide number|guide contact/i
  ],
  visiting_info: [
    /visiting hours|opening hours|timings/i,
    /entry fee|ticket price|cost/i,
    /best time to visit|when to visit/i
  ],
  etiquette: [
    /etiquette|rules|guidelines/i,
    /what to wear|dress code/i,
    /do and don't|dos and don'ts/i
  ],
  itinerary: [
    /plan|itinerary|schedule|day plan|trip plan/i,
    /2 day|3 day|two day|three day/i
  ]
};

// Analyze conversation context for better responses
function analyzeContext(history: ChatMessage[], currentMessage: string) {
  const recentMessages = history.slice(-3); // Last 3 messages
  const topics = recentMessages.map(msg => {
    if (msg.text.toLowerCase().includes('rumtek')) return 'rumtek';
    if (msg.text.toLowerCase().includes('tawang')) return 'tawang';
    if (msg.text.toLowerCase().includes('hotel')) return 'accommodation';
    if (msg.text.toLowerCase().includes('guide')) return 'guide_services';
    return null;
  }).filter(Boolean);
  
  const currentTopic = currentMessage.toLowerCase().includes('rumtek') ? 'rumtek' :
                      currentMessage.toLowerCase().includes('tawang') ? 'tawang' : null;
  
  return {
    recentTopics: topics,
    currentTopic,
    isFollowUp: history.length > 0,
    lastBotResponse: history.filter(m => m.sender === 'bot').slice(-1)[0]?.text || ''
  };
}

// Enhanced intent detection with context
function detectIntent(message: string, context?: any): string {
  const lowerMessage = message.toLowerCase();
  
  // Context-aware intent detection
  if (context?.recentTopics.includes('rumtek') || context?.recentTopics.includes('tawang')) {
    if (/yes|sure|okay|please|go ahead/i.test(lowerMessage)) {
      return 'affirmative_response';
    }
  }
  
  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    if (patterns.some(pattern => pattern.test(lowerMessage))) {
      return intent;
    }
  }
  
  // Check for monastery names
  if (/rumtek/i.test(lowerMessage)) return 'rumtek_info';
  if (/tawang/i.test(lowerMessage)) return 'tawang_info';
  
  return 'general';
}

// Enhanced context-aware response generation
export async function generateAIResponse(userMessage: string, conversationHistory?: ChatMessage[]): Promise<Omit<ChatMessage, 'id' | 'timestamp'>> {
  const lowerMessage = userMessage.toLowerCase();
  const aiDebug = import.meta.env.VITE_AI_DEBUG === 'true';
  
  // Analyze conversation context
  const context = analyzeContext(conversationHistory || [], userMessage);
  const intent = detectIntent(userMessage, context);
  
  let response = '';
  let type: ChatMessage['type'] = 'text';
  let metadata: any = {};

  // If Gemini key is present, try LLM first for richer output
  try {
    const gemini = await askGemini(userMessage, conversationHistory || []);
    if (gemini) {
      if (aiDebug) console.log('[AI] Using Gemini response');
      return {
        text: gemini.text,
        sender: 'bot',
        type: gemini.type,
        metadata: { ...(gemini.metadata || {}), source: 'gemini' }
      };
    }
  } catch (e) {
    if (aiDebug) console.warn('[AI] Gemini fallback to rules due to error:', e);
  }

  switch (intent) {
    case 'affirmative_response':
      if (context.lastBotResponse.includes('show you on the map')) {
        response = '🗺️ **Perfect!** I\'m taking you to our interactive map where you can explore monastery locations, get directions, and discover nearby attractions.\n\n🎯 **Map Features:**\n• Detailed monastery locations\n• Turn-by-turn directions\n• Nearby amenities\n• Cultural points of interest\n\nClick the "View on Map" button or navigate to our Map page!';
        type = 'location';
        metadata = { action: 'navigate_to_map' };
      } else if (context.lastBotResponse.includes('virtual tour')) {
        response = '🎥 **Excellent choice!** Let me guide you to our immersive 360° virtual tour experience.\n\n✨ **What awaits you:**\n• Interactive 360° monastery exploration\n• High-definition video quality\n• Mouse/touch navigation\n• Multiple viewing angles\n\nReady to begin your virtual journey?';
        type = 'virtual_tour';
        metadata = { action: 'navigate_to_tour' };
      } else {
        response = '👍 **Great!** How else can I assist you with your monastery exploration today?\n\n🔍 **I can help with:**\n• Finding specific locations\n• Booking accommodations\n• Connecting with local guides\n• Planning your visit';
      }
      break;
      
    case 'location':
      if (lowerMessage.includes('rumtek')) {
        response = `📍 **Rumtek Monastery Location**\n\n${monasteryData.rumtek.description}\n\n📧 **Address:** ${monasteryData.rumtek.location}\n🕒 **Hours:** ${monasteryData.rumtek.visitingHours}\n\n🗺️ Would you like me to show you on the map?`;
        type = 'location';
        metadata = { monastery: 'rumtek', coordinates: monasteryData.rumtek.coordinates };
      } else if (lowerMessage.includes('tawang')) {
        response = `📍 **Tawang Monastery Location**\n\n${monasteryData.tawang.description}\n\n📧 **Address:** ${monasteryData.tawang.location}\n🕒 **Hours:** ${monasteryData.tawang.visitingHours}\n\n🗺️ Would you like me to show you on the map?`;
        type = 'location';
        metadata = { monastery: 'tawang', coordinates: monasteryData.tawang.coordinates };
      } else {
        response = '📍 I can help you find monastery locations! Which monastery are you interested in?\n\n🏛️ **Available Options:**\n• Rumtek Monastery (Sikkim)\n• Tawang Monastery (Arunachal Pradesh)\n\nJust ask about any specific monastery!';
      }
      break;

    case 'hotel':
      if (lowerMessage.includes('rumtek')) {
        response = `🏨 **Hotels near Rumtek Monastery**\n\n${monasteryData.rumtek.nearbyHotels.map(hotel => `• ${hotel}`).join('\n')}\n\n💡 **Best time to visit:** ${monasteryData.rumtek.bestTime}\n\n🎯 Would you like help with booking or more details about any hotel?`;
        type = 'hotel';
        metadata = { monastery: 'rumtek', hotels: monasteryData.rumtek.nearbyHotels };
      } else if (lowerMessage.includes('tawang')) {
        response = `🏨 **Hotels near Tawang Monastery**\n\n${monasteryData.tawang.nearbyHotels.map(hotel => `• ${hotel}`).join('\n')}\n\n💡 **Best time to visit:** ${monasteryData.tawang.bestTime}\n\n🎯 Would you like help with booking or more details about any hotel?`;
        type = 'hotel';
        metadata = { monastery: 'tawang', hotels: monasteryData.tawang.nearbyHotels };
      } else {
        response = '🏨 I can help you find accommodation near monasteries! Which monastery are you planning to visit?\n\n🏛️ **Options:**\n• Rumtek Monastery area\n• Tawang Monastery area\n\nLet me know your preference!';
      }
      break;

    case 'virtual_tour':
      response = `🎥 **Virtual Tour Experience**\n\nExplore our immersive 360° monastery tours!\n\n🌟 **Available Tours:**\n• Interior Monastery Experience\n• Tawang Monastery Journey\n• 360° Outside Views\n\n🎮 **Features:**\n• Interactive 360° videos\n• Mouse drag navigation\n• Full HD quality\n\n🚀 Would you like me to take you to the virtual tour page?`;
      type = 'virtual_tour';
      metadata = { action: 'navigate_to_tour' };
      break;

    case 'guide':
      if (lowerMessage.includes('rumtek')) {
        response = `👨‍🏫 **Local Guides - Rumtek Monastery**\n\n${monasteryData.rumtek.guides.map(guide => 
          `• **${guide.name}**\n  📞 ${guide.phone}\n  📊 Experience: ${guide.experience}`
        ).join('\n\n')}\n\n💬 Would you like me to help you contact a guide?`;
        type = 'guide_contact';
        metadata = { monastery: 'rumtek', guides: monasteryData.rumtek.guides };
      } else if (lowerMessage.includes('tawang')) {
        response = `👨‍🏫 **Local Guides - Tawang Monastery**\n\n${monasteryData.tawang.guides.map(guide => 
          `• **${guide.name}**\n  📞 ${guide.phone}\n  📊 Experience: ${guide.experience}`
        ).join('\n\n')}\n\n💬 Would you like me to help you contact a guide?`;
        type = 'guide_contact';
        metadata = { monastery: 'tawang', guides: monasteryData.tawang.guides };
      } else {
        response = '👨‍🏫 I can connect you with experienced local guides!\n\n🏛️ **Which monastery:**\n• Rumtek Monastery guides\n• Tawang Monastery guides\n\nOur guides offer:\n✅ Cultural insights\n✅ Historical knowledge\n✅ Language assistance\n✅ Photography tips';
      }
      break;

    case 'visiting_info':
      response = `⏰ **Visiting Information**\n\n📅 **Rumtek Monastery:**\n🕒 Hours: ${monasteryData.rumtek.visitingHours}\n💰 Entry: ${monasteryData.rumtek.entryFee}\n🌤️ Best time: ${monasteryData.rumtek.bestTime}\n\n📅 **Tawang Monastery:**\n🕒 Hours: ${monasteryData.tawang.visitingHours}\n💰 Entry: ${monasteryData.tawang.entryFee}\n🌤️ Best time: ${monasteryData.tawang.bestTime}`;
      type = 'visiting_info';
      break;

    case 'etiquette':
      response = `🙏 **Monastery Visiting Etiquette**\n\n👔 **Dress Code:**\n${monasteryData.general.visiting_etiquette.slice(0, 3).map(rule => `• ${rule}`).join('\n')}\n\n🧘 **Behavioral Guidelines:**\n${monasteryData.general.visiting_etiquette.slice(3).map(rule => `• ${rule}`).join('\n')}\n\n💡 **Best Practices:**\n${monasteryData.general.best_practices.slice(0, 3).map(rule => `• ${rule}`).join('\n')}`;
      type = 'etiquette';
      break;

    case 'itinerary':
      response = `🗓️ **Suggested 2-Day Itinerary**\n\nDay 1: Rumtek Monastery\n• Morning prayers and tour\n• Lunch nearby\n• Evening meditation session\n\nDay 2: Tawang Insights (Virtual/Planning)\n• History and culture briefing\n• 360° virtual exploration\n• Plan logistics for future visit\n\nWould you like me to create a custom plan based on your dates?`;
      type = 'itinerary';
      metadata = { days: 2, includes: ['rumtek', 'virtual_tawang'] };
      break;

    case 'rumtek_info':
      response = `🏛️ **Rumtek Monastery**\n\n${monasteryData.rumtek.description}\n\n📍 **Location:** ${monasteryData.rumtek.location}\n🕒 **Hours:** ${monasteryData.rumtek.visitingHours}\n💰 **Entry:** ${monasteryData.rumtek.entryFee}\n🌤️ **Best Time:** ${monasteryData.rumtek.bestTime}\n\n🎯 **What would you like to know more about?**\n• 🗺️ Location & directions\n• 🏨 Nearby hotels\n• 👨‍🏫 Local guides\n• 🎥 Virtual tour`;
      break;

    case 'tawang_info':
      response = `🏛️ **Tawang Monastery**\n\n${monasteryData.tawang.description}\n\n📍 **Location:** ${monasteryData.tawang.location}\n🕒 **Hours:** ${monasteryData.tawang.visitingHours}\n💰 **Entry:** ${monasteryData.tawang.entryFee}\n🌤️ **Best Time:** ${monasteryData.tawang.bestTime}\n\n🎯 **What would you like to know more about?**\n• 🗺️ Location & directions\n• 🏨 Nearby hotels\n• 👨‍🏫 Local guides\n• 🎥 Virtual tour`;
      break;

    default:
      response = `🤔 I'd love to help you with monastery-related questions! Here's what I can assist with:\n\n🗺️ **Find Locations** - "Where is Rumtek Monastery?"\n🏨 **Hotel Recommendations** - "Hotels near Tawang?"\n🎥 **Virtual Tours** - "Show me virtual tour"\n👨‍🏫 **Local Guides** - "Connect me with a guide"\n📅 **Visit Planning** - "Best time to visit?"\n🙏 **Etiquette Guide** - "Monastery rules?"\n\n✨ Just ask me anything about monasteries!`;
      break;
  }

  // Simulate AI thinking delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  return {
    text: response,
    sender: 'bot',
    type,
    metadata: { ...metadata, source: 'rules' }
  };
}