"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Scale, MessageSquare, FileText, Gift, Settings, User, LogOut } from "lucide-react";
import Link from "next/link";
import { getUserByEmail, createUser, generateReferralCode, User as UserType } from "@/lib/database";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { SingleInputCase } from "@/components/SingleInputCase";
import { ChatInterface } from "@/components/ChatInterface";
import { WhatsAppUpgradeButton } from "@/components/WhatsAppUpgradeButton";
import { useClerk } from "@clerk/nextjs";

export default function Dashboard() {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [userProfile, setUserProfile] = useState<UserType | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Dashboard mounted, user loaded:", isLoaded, clerkUser?.emailAddresses[0]?.emailAddress);
  
  useEffect(() => {
    if (isLoaded && clerkUser) {
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      if (email) {
        let user = getUserByEmail(email);
        
        if (!user) {
          console.log("Creating new user profile");
          user = createUser({
            email,
            firstName: clerkUser.firstName || "",
            lastName: clerkUser.lastName || "",
            plan: 'free',
            freeTrialsUsed: 0,
            credits: 0,
            referralCode: generateReferralCode(),
          });
          setShowDisclaimer(true);
        }
        
        setUserProfile(user);
      }
      setIsLoading(false);
    }
  }, [isLoaded, clerkUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="relative mb-6">
            <Scale className="h-12 w-12 text-primary mx-auto animate-pulse-soft" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-ping"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-48 mx-auto shimmer"></div>
            <p className="text-lg text-muted-foreground">Loading your legal AI assistant...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="text-destructive mb-4">
            <User className="h-12 w-12 mx-auto mb-2" />
            <p className="text-lg">Unable to load user profile</p>
          </div>
          <Link href="/sign-in">
            <Button className="btn-hover">Return to Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case 'free': return 'secondary';
      case 'payasyougo': return 'default';
      case 'premium': return 'default';
      default: return 'secondary';
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'free': return 'Free Trial';
      case 'payasyougo': return 'Pay-as-You-Go';
      case 'premium': return 'Premium';
      default: return plan;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DisclaimerModal open={showDisclaimer} onClose={() => setShowDisclaimer(false)} />
      
      {/* Navigation */}
      <nav className="glass-effect border-b border-border/40 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 animate-slideInFromLeft">
              <div className="relative">
                <Scale className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></div>
              </div>
              <h1 className="text-xl font-bold text-primary legal-accent">Wahab Legal AI</h1>
            </div>
            
            <div className="flex items-center space-x-3 animate-slideInFromRight">
              <Badge variant={getPlanBadgeVariant(userProfile.plan)} className="px-3 py-1">
                {getPlanName(userProfile.plan)}
              </Badge>
              <Link href="/referrals">
                <Button variant="ghost" size="sm" className="btn-hover">
                  <Gift className="h-4 w-4 mr-1" />
                  Referrals
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="btn-hover">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => signOut()}
                className="btn-hover text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-hover glass-effect animate-slideInFromLeft">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <User className="h-5 w-5 text-primary" />
                  <span>Account Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Plan</span>
                    <Badge variant={getPlanBadgeVariant(userProfile.plan)}>
                      {getPlanName(userProfile.plan)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">User</span>
                    <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
                      {clerkUser?.firstName || "User"}
                    </span>
                  </div>
                </div>
                
                {userProfile.plan === 'free' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Usage</span>
                      <span className="text-sm font-medium text-foreground">
                        {userProfile.freeTrialsUsed} / 3
                      </span>
                    </div>
                    <Progress 
                      value={(userProfile.freeTrialsUsed / 3) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
                
                {userProfile.plan === 'payasyougo' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Credits</span>
                      <span className="text-xl font-bold text-primary">
                        {userProfile.credits}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Referral Code</span>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-primary">
                      {userProfile.referralCode}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <WhatsAppUpgradeButton 
              userEmail={userProfile.email}
              currentPlan={userProfile.plan}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="card-hover glass-effect animate-slideInFromRight">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>Legal AI Assistant</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userProfile.plan === 'free' ? (
                  <SingleInputCase 
                    userId={userProfile.id}
                    trialsUsed={userProfile.freeTrialsUsed}
                    onTrialUsed={() => {
                      setUserProfile(prev => prev ? {...prev, freeTrialsUsed: prev.freeTrialsUsed + 1} : null);
                    }}
                  />
                ) : (
                  <ChatInterface 
                    userId={userProfile.id}
                    userPlan={userProfile.plan}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}