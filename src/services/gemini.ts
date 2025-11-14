import { ChatMessage } from '../contexts/chatbot-context';

type BotType = NonNullable<ChatMessage['type']>;

export interface GeminiStructuredResponse {
  type: BotType;
  text: string;
  metadata?: Record<string, unknown>;
}

const SYSTEM_PROMPT = `You are Monastery360's AI guide. Reply concisely and helpfully about monasteries.
Always return a single JSON object with fields: type, text, metadata.
Allowed type values: text, location, hotel, virtual_tour, guide_contact, visiting_info, etiquette, itinerary.
metadata should be small and only include keys relevant to the chosen type (e.g., coordinates, hotels[], guides[], action).`;

function buildHistory(messages: ChatMessage[]) {
  return messages.map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
}

export async function askGemini(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<GeminiStructuredResponse | null> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null;

  // Using REST to avoid new deps; compatible with Gemini 1.5 Flash
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'user', parts: [{ text: buildHistory(history) }] },
    { role: 'user', parts: [{ text: `Now reply to: ${userMessage}\nReturn ONLY JSON.` }] }
  ];

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents })
  });

  if (!res.ok) {
    console.warn('Gemini request failed', await res.text());
    return null;
  }

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;

  try {
    const parsed = JSON.parse(text) as GeminiStructuredResponse;
    if (!parsed || typeof parsed.text !== 'string' || !parsed.type) return null;
    return parsed;
  } catch {
    // Model may return markdown; try to extract JSON block
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]) as GeminiStructuredResponse;
        if (!parsed || typeof parsed.text !== 'string' || !parsed.type) return null;
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  }
}


