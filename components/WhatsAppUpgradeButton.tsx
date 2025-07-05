"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Zap, Crown, ArrowRight } from "lucide-react";

interface WhatsAppUpgradeButtonProps {
  userEmail: string;
  currentPlan: string;
}

export function WhatsAppUpgradeButton({ userEmail, currentPlan }: WhatsAppUpgradeButtonProps) {
  console.log("WhatsAppUpgradeButton rendered for:", userEmail, "plan:", currentPlan);
  
  const generateWhatsAppMessage = (plan: string) => {
    const message = `Hi! I'd like to upgrade my Wahab Legal AI account.

📧 Email: ${userEmail}
📋 Current Plan: ${getPlanName(currentPlan)}
⬆️ Upgrade to: ${getPlanName(plan)}

Please confirm and activate my new plan. Thanks!`;
    
    return encodeURIComponent(message);
  };
  
  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'free': return 'Free Trial';
      case 'payasyougo': return 'Pay-as-You-Go';
      case 'premium': return 'Premium';
      default: return plan;
    }
  };

  const handleUpgrade = (plan: string) => {
    console.log("Upgrading to plan:", plan);
    const message = generateWhatsAppMessage(plan);
    const whatsappUrl = `https://wa.me/+923284645753?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (currentPlan === 'premium') {
    return (
      <Card className="card-hover glass-effect border-primary/30 bg-primary/5 animate-fadeIn">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-primary">
            <Crown className="h-5 w-5" />
            <span>Premium Active</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You're on the Premium plan with unlimited access to all features.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-hover glass-effect animate-fadeIn">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <MessageCircle className="h-5 w-5 text-primary" />
          <span>Upgrade Plan</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Contact us via WhatsApp to upgrade your plan instantly.
        </p>
        
        <div className="space-y-3">
          {currentPlan !== 'payasyougo' && (
            <Button
              onClick={() => handleUpgrade('payasyougo')}
              className="w-full btn-hover bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
              size="sm"
            >
              <Zap className="h-4 w-4 mr-2" />
              Upgrade to Pay-as-You-Go
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
          
          <Button
            onClick={() => handleUpgrade('premium')}
            className="w-full btn-hover bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 shadow-lg"
            size="sm"
          >
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Premium
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <MessageCircle className="h-3 w-3" />
          <span>Instant activation via WhatsApp</span>
        </div>
      </CardContent>
    </Card>
  );
}