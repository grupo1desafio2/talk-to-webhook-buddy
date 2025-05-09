
import { Message } from '../types/chatTypes';

const WEBHOOK_URL = 'https://n8n.grupoesales.com.br/webhook-test/998dab0b-c74b-4d11-8f3a-6d46acff3a67';

export const sendMessage = async (message: string): Promise<Message> => {
  console.log("Sending message to webhook:", message);
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message,
        timestamp: new Date().toISOString(),
        source: 'chat-widget'
      }),
    });
    
    let responseData;
    
    try {
      responseData = await response.json();
      console.log("Webhook response:", responseData);
    } catch (e) {
      console.log("Response could not be parsed as JSON, using text");
      const textResponse = await response.text();
      responseData = { message: textResponse || "Got your message! I'll respond shortly." };
    }
    
    return {
      id: crypto.randomUUID(),
      content: responseData.message || responseData.response || "Thank you for your message!",
      sender: 'bot',
      timestamp: new Date(),
    };
  } catch (error) {
    console.error("Error sending message to webhook:", error);
    
    // Return a fallback message
    return {
      id: crypto.randomUUID(),
      content: "Sorry, I couldn't process your request right now. Please try again later.",
      sender: 'bot',
      timestamp: new Date(),
    };
  }
};
