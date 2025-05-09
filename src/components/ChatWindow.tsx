
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types/chatTypes';
import ChatBubble from './ChatBubble';
import { sendMessage } from '../services/chatService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const botReply = await sendMessage(inputValue);
      
      setTimeout(() => {
        setMessages(prev => [...prev, botReply]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Failed to get response:", error);
      setIsLoading(false);
      
      toast({
        title: "Erro na comunicação",
        description: "Não foi possível conectar ao serviço de chat. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:right-8 w-[90vw] max-w-[400px] h-[500px] max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 animate-fade-in border border-gray-200">
      {/* Chat header */}
      <div className="bg-chatbot-primary text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} />
          <h3 className="font-medium">Chat de Atendimento</h3>
        </div>
        <button onClick={onClose} className="text-white hover:bg-chatbot-dark rounded-full p-1">
          <X size={18} />
        </button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-1 self-start bg-gray-100 p-3 rounded-lg animate-pulse-soft">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 bg-white">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()} 
            className="bg-chatbot-primary hover:bg-chatbot-dark text-white"
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
