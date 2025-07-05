"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Scale, Shield } from "lucide-react";

interface DisclaimerModalProps {
  open: boolean;
  onClose: () => void;
}

export function DisclaimerModal({ open, onClose }: DisclaimerModalProps) {
  console.log("DisclaimerModal rendered, open:", open);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-effect border-2 border-primary/20 animate-fadeIn">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center space-x-3 text-2xl text-primary mb-2">
            <div className="relative">
              <Scale className="h-8 w-8 animate-pulse-soft" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"></div>
            </div>
            <span className="text-shimmer">Legal Disclaimer</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Alert className="border-primary/30 bg-primary/5 animate-slideInFromLeft">
            <Shield className="h-5 w-5 text-primary" />
            <AlertDescription className="text-primary font-medium text-lg">
              Important Notice - Please Read Carefully
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4 animate-slideInFromRight">
            <div className="p-6 rounded-lg bg-card/50 border border-primary/10 backdrop-blur-sm">
              <p className="text-foreground leading-relaxed text-base">
                <strong className="text-primary">This AI Legal Assistant is provided solely for educational and illustrative purposes.</strong>
              </p>
              
              <p className="text-muted-foreground mt-4 leading-relaxed">
                It does <strong className="text-foreground">NOT</strong> constitute legal advice and must not be used as a substitute for consultation 
                with a qualified lawyer.
              </p>
              
              <p className="text-muted-foreground mt-4 leading-relaxed">
                <strong className="text-foreground">The developer takes no responsibility for any illegal or unauthorized use of this tool.</strong> 
                All responsibility lies with the user.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <h4 className="font-semibold text-destructive mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Not Legal Advice
                </h4>
                <p className="text-sm text-muted-foreground">
                  This tool provides general information only and should not be relied upon for legal decisions.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-semibold text-primary mb-2 flex items-center">
                  <Scale className="h-4 w-4 mr-2" />
                  Consult a Lawyer
                </h4>
                <p className="text-sm text-muted-foreground">
                  Always seek professional legal counsel for specific legal matters and advice.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
            <Button 
              onClick={onClose} 
              className="btn-hover bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium shadow-lg"
            >
              I Understand & Accept
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}