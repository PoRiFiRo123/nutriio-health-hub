
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Nutriio. How can I help you today? I can answer questions about our products, nutrition, shipping, and more!',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('product') || input.includes('what') || input.includes('sprouted')) {
      return 'We offer a wide range of healthy products including SuperFoods, Sprouted Flour, Ready to Cook meals, Healthy Snacks, Organic Oils, and Natural Salts & Jaggery. All our products are carefully sourced and processed to maintain their nutritional value.';
    }
    
    if (input.includes('shipping') || input.includes('delivery')) {
      return 'We offer free shipping on all orders above ₹500. Standard delivery takes 3-5 business days, and we also provide express delivery options. You can track your order once it\'s shipped.';
    }
    
    if (input.includes('return') || input.includes('refund')) {
      return 'We have a 30-day return policy for unopened products. If you\'re not satisfied with your purchase, please contact us within 30 days for a full refund or exchange.';
    }
    
    if (input.includes('nutrition') || input.includes('health') || input.includes('benefits')) {
      return 'Our products are rich in essential nutrients and designed for optimal health. Each product page contains detailed nutritional information. For specific dietary needs or health concerns, we recommend consulting with a healthcare professional.';
    }
    
    if (input.includes('age') || input.includes('baby') || input.includes('kids')) {
      return 'Many of our products are suitable for different age groups, including babies from 6 months and above. Please check the product description for age recommendations, and consult your pediatrician before introducing new foods to infants.';
    }
    
    return 'Thank you for your question! I\'m here to help with information about our products, nutrition, shipping, returns, and more. For specific inquiries, you can also reach out to our customer support team.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white p-4 rounded-full shadow-xl z-50 transition-all duration-300 hover:scale-110"
        style={{ display: isOpen ? 'none' : 'block' }}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-orange-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 rounded-t-3xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <div>
                  <h3 className="font-semibold">Nutriio Assistant</h3>
                  <p className="text-sm opacity-90">Always here to help!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-orange-25 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs p-4 rounded-2xl shadow-sm ${
                    message.isBot
                      ? 'bg-white border border-orange-100 text-gray-800'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-orange-100 p-4 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-gray-50 rounded-b-3xl">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 rounded-full border-orange-200 focus:ring-orange-500 focus:border-orange-500"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-full w-10 h-10 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
