"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Send, AlertCircle, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { generateLegalResponse } from "@/lib/ai";
import { createLegalCase, incrementFreeTrials } from "@/lib/database";

interface SingleInputCaseProps {
  userId: string;
  trialsUsed: number;
  onTrialUsed: () => void;
}

export function SingleInputCase({ userId, trialsUsed, onTrialUsed }: SingleInputCaseProps) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  console.log("SingleInputCase rendered, trialsUsed:", trialsUsed);

  const handleSubmit = async () => {
    if (!input.trim() || trialsUsed >= 3) return;
    
    console.log("Submitting single input case:", input);
    setIsLoading(true);
    
    try {
      const aiResponse = await generateLegalResponse(input);
      setResponse(aiResponse);
      setHasSubmitted(true);
      
      // Save to database
      createLegalCase({
        userId,
        input,
        response: aiResponse,
        isChat: false,
      });
      
      // Increment trial count
      incrementFreeTrials(userId);
      onTrialUsed();
      
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("I apologize, but I'm currently unable to process your request. Please try again later or contact support if the issue persists.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewCase = () => {
    setInput("");
    setResponse("");
    setHasSubmitted(false);
  };

  if (trialsUsed >= 3) {
    return (
      <div className="space-y-4 animate-fadeIn">
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            <strong>Free Trial Limit Reached</strong>
          </AlertDescription>
        </Alert>
        
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Upgrade Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You've used all 3 free trial cases. Upgrade to continue using the Legal AI Assistant 
              and unlock unlimited conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="btn-hover border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                View Pricing
              </Button>
              <Button className="btn-hover bg-primary text-primary-foreground hover:bg-primary/90">
                Upgrade Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Single Legal Case Analysis</h3>
        <div className="text-sm text-muted-foreground">
          {trialsUsed} / 3 free trials used
        </div>
      </div>

      {!hasSubmitted ? (
        <div className="space-y-4 animate-slideInFromLeft">
          <Alert className="border-primary/30 bg-primary/5">
            <FileText className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              <strong>Free Trial Mode:</strong> Describe your legal situation in detail. 
              You'll receive one comprehensive AI analysis.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Describe your legal situation in detail:
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Please provide a detailed description of your legal issue, including relevant facts, circumstances, and any specific questions you have..."
              className="min-h-[120px] resize-none bg-background border-border focus:border-primary/50 focus:ring-primary/20"
              disabled={isLoading}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {input.length} characters
              </span>
              <Button
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                className="btn-hover bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Get Legal Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-slideInFromRight">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Legal Analysis Complete</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Your Case:</h4>
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {input}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">AI Legal Analysis:</h4>
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {response}
                    </div>
                  </div>
                </div>
                
                {trialsUsed < 3 && (
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {3 - trialsUsed} free trials remaining
                    </span>
                    <Button 
                      onClick={handleNewCase} 
                      variant="outline"
                      className="btn-hover border-primary/30 text-primary hover:bg-primary/10"
                    >
                      Start New Case
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}