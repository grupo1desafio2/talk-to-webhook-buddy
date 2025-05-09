
import React from 'react';
import { Message } from '../types/chatTypes';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div
      className={cn(
        "max-w-[80%] p-3 rounded-lg mb-2 animate-slide-in",
        isBot 
          ? "bg-chatbot-primary text-white rounded-bl-none self-start" 
          : "bg-chatbot-user text-gray-800 rounded-br-none self-end"
      )}
    >
      <p className="text-sm">{message.content}</p>
      <p className="text-xs opacity-70 mt-1 text-right">
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  );
};

export default ChatBubble;
