"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Bot, User, MessageSquare } from "lucide-react";
import { generateLegalResponse } from "@/lib/ai";
import { createLegalCase } from "@/lib/database";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  userId: string;
  userPlan: string;
}

export function ChatInterface({ userId, userPlan }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  console.log("ChatInterface rendered for user:", userId, "plan:", userPlan);

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      content: "Hello! I'm your Legal AI Assistant. I can help you with legal questions, document analysis, and provide guidance on various legal matters. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    console.log("Sending message:", input);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await generateLegalResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Save conversation to database
      createLegalCase({
        userId,
        input: userMessage.content,
        response: aiResponse,
        isChat: true,
      });
      
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment or contact support if the issue persists.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <span>Legal AI Chat</span>
        </h3>
        <Badge variant="default" className="bg-primary/10 text-primary">
          {userPlan === 'premium' ? 'Unlimited' : 'Pay-per-use'}
        </Badge>
      </div>

      {/* Chat Messages */}
      <Card className="glass-effect border-border/50">
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.isUser ? 'justify-end' : 'justify-start'
                  } animate-slideInFromLeft`}
                >
                  {!message.isUser && (
                    <Avatar className="h-8 w-8 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border'
                    }`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.isUser && (
                    <Avatar className="h-8 w-8 border-2 border-border">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-3 animate-pulse">
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Input Area */}
      <div className="flex items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask your legal question..."
          disabled={isLoading}
          className="flex-1 bg-background border-border focus:border-primary/50 focus:ring-primary/20"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="btn-hover bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground text-center">
        This AI assistant provides general information only. Always consult with a qualified attorney for legal advice.
      </div>
    </div>
  );
}