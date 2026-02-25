import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { MessageCircle, X, Send, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! 👋 I'm mannuh AI, your virtual assistant. I can help you navigate the platform, answer questions, or create support tickets. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual Gemini API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSimulatedResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const getSimulatedResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("cell group") || lowerQuery.includes("group")) {
      return "You can explore and join cell groups by clicking on the 'Cell Groups' tab in the navigation menu. There you'll find various groups based on different topics like Prayer, Bible Study, Missions, and more. Each group has a description and you can join with a single click!";
    }

    if (lowerQuery.includes("reel") || lowerQuery.includes("video")) {
      return "Reels are short-form Christian video content created by our community members. You can watch reels by navigating to the 'Reels' section. If you're a Premium member, you can also create and upload your own reels!";
    }

    if (lowerQuery.includes("premium") || lowerQuery.includes("subscription") || lowerQuery.includes("pricing")) {
      return "We offer Premium membership for $9.99/month which includes full access to all content, creator privileges, and ad-free experience. 10% of all proceeds go to charitable causes. You can view all pricing options on our Pricing page.";
    }

    if (lowerQuery.includes("support ticket") || lowerQuery.includes("ticket") || lowerQuery.includes("help")) {
      return "I can help you create a support ticket! Please describe your issue and I'll forward it to our support team. You can also email us directly at support@mannuh.space for urgent matters.";
    }

    if (lowerQuery.includes("creator") || lowerQuery.includes("monetize")) {
      return "The Creator Partner Program is available to Premium members. You can enable Creator Mode in your profile settings to start posting reels, articles, and stories. Earn ad revenue sharing based on views and engagement!";
    }

    if (lowerQuery.includes("kids") || lowerQuery.includes("children")) {
      return "mannuh for Kids is coming soon! It will feature illustrated Christian audiobooks and animated videos for children ages 3-10. Join the waitlist to be notified when it launches!";
    }

    return "I'm here to help! You can ask me about cell groups, reels, premium features, the creator program, or general platform navigation. I can also help you create a support ticket if you need assistance from our team.";
  };

  const quickActions = [
    { label: "Find Cell Groups", action: () => setInput("How do I find cell groups?") },
    { label: "Creator Program", action: () => setInput("Tell me about the Creator Program") },
    { label: "Create Support Ticket", action: () => setInput("I need help with an issue") },
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl transition-shadow"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${
              isMinimized ? "bottom-6 right-6 w-80" : "bottom-6 right-6 w-96"
            } z-50 max-h-[600px] flex flex-col shadow-2xl rounded-2xl overflow-hidden`}
          >
            <Card className="flex flex-col h-full">
              {/* Header */}
              <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">mannuh AI</h3>
                    <p className="text-xs opacity-90">Online • Ready to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4 h-[400px]" ref={scrollRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-[10px] opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-2xl px-4 py-2.5">
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Quick Actions */}
                  {messages.length === 1 && (
                    <div className="px-4 pb-2">
                      <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action) => (
                          <button
                            key={action.label}
                            onClick={action.action}
                            className="text-xs px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full transition-colors"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={isLoading}
                      />
                      <Button
                        onClick={handleSend}
                        size="sm"
                        disabled={!input.trim() || isLoading}
                        className="rounded-lg"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 text-center">
                      Powered by Gemini AI • <span className="underline cursor-pointer">Privacy</span>
                    </p>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
