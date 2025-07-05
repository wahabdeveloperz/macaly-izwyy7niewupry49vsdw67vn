"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Scale, Shield, Users, Bot, Zap, ArrowRight, Stars } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    console.log("Homepage rendered");
    setMounted(true);
    const ref = searchParams.get('ref');
    if (ref) {
      console.log("Referral code detected:", ref);
      setReferralCode(ref);
    }
  }, [searchParams]);

  const getSignUpUrl = () => {
    return referralCode ? `/sign-up?ref=${referralCode}` : '/sign-up';
  };

  if (!mounted) return null;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Referral Banner */}
      {referralCode && (
        <div className="bg-primary/10 border-b border-primary/20 backdrop-blur-sm animate-slideInFromLeft">
          <div className="container mx-auto px-4 py-3 text-center">
            <p className="text-primary font-medium">
              🎉 You've been referred! Use code <Badge variant="secondary" className="mx-2">{referralCode}</Badge> to get started
            </p>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="glass-effect border-b border-border/40 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 animate-slideInFromLeft">
              <div className="relative">
                <Scale className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></div>
              </div>
              <h1 className="text-xl font-bold text-primary legal-accent" data-macaly="nav-title">
                Wahab Legal AI
              </h1>
            </div>
            
            <div className="flex items-center space-x-3 animate-slideInFromRight">
              <Link href="/sign-in">
                <Button variant="ghost" className="btn-hover text-foreground hover:text-primary">
                  Sign In
                </Button>
              </Link>
              <Link href={getSignUpUrl()}>
                <Button className="btn-hover bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient border-b border-border/20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slideInFromLeft">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-2">
                  <Bot className="h-4 w-4 mr-2" />
                  AI-Powered Legal Assistant
                </Badge>
                
                <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight" data-macaly="hero-title">
                  Legal AI That
                  <span className="text-shimmer block">Understands You</span>
                </h2>
                
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed" data-macaly="hero-description">
                  Get instant legal analysis and guidance powered by advanced AI. 
                  Professional legal assistance at your fingertips.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Trusted by Professionals</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Instant Results</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={getSignUpUrl()}>
                  <Button size="lg" className="btn-hover bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg px-8 py-4 text-lg">
                    Start Free Trial
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="btn-hover border-border hover:border-primary/50 px-8 py-4 text-lg">
                  View Demo
                </Button>
              </div>
            </div>
            
            <div className="relative animate-slideInFromRight">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/6077797/pexels-photo-6077797.jpeg?auto=compress&cs=tinysrgb&h=350"
                  alt="Professional legal workspace with scales of justice"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                  data-macaly="hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-effect rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-foreground">AI Assistant Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 border-b border-border/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeIn">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-macaly="pricing-title">
              Choose Your Plan
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-macaly="pricing-description">
              Select the perfect plan for your legal needs. Start free, upgrade anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Trial */}
            <Card className="card-hover border-border/50 bg-card/50 backdrop-blur-sm animate-slideInFromLeft">
              <CardHeader className="text-center pb-4">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-foreground">Free Trial</CardTitle>
                  <CardDescription className="text-muted-foreground">Perfect for testing</CardDescription>
                </div>
                <div className="py-4">
                  <div className="text-4xl font-bold text-primary">$0</div>
                  <div className="text-sm text-muted-foreground mt-1">3 cases included</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Single-input case analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">3 free legal consultations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Basic AI responses</span>
                  </div>
                </div>
                <Link href={getSignUpUrl()}>
                  <Button className="w-full btn-hover" variant="outline">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pay-as-you-go */}
            <Card className="card-hover border-primary/50 bg-card/50 backdrop-blur-sm relative animate-fadeIn">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  <Stars className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-4 pt-6">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-foreground">Pay-as-You-Go</CardTitle>
                  <CardDescription className="text-muted-foreground">Flexible usage</CardDescription>
                </div>
                <div className="py-4">
                  <div className="text-4xl font-bold text-primary">$5</div>
                  <div className="text-sm text-muted-foreground mt-1">per conversation</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Full chatbot interaction</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Follow-up questions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Dynamic AI responses</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Pay only for what you use</span>
                  </div>
                </div>
                <Link href={getSignUpUrl()}>
                  <Button className="w-full btn-hover bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium */}
            <Card className="card-hover border-border/50 bg-card/50 backdrop-blur-sm animate-slideInFromRight">
              <CardHeader className="text-center pb-4">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-foreground">Premium</CardTitle>
                  <CardDescription className="text-muted-foreground">Unlimited access</CardDescription>
                </div>
                <div className="py-4">
                  <div className="text-4xl font-bold text-primary">$49</div>
                  <div className="text-sm text-muted-foreground mt-1">per month</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Unlimited conversations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Priority AI responses</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Advanced legal analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">Premium support</span>
                  </div>
                </div>
                <Link href={getSignUpUrl()}>
                  <Button className="w-full btn-hover" variant="outline">
                    Go Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4 animate-fadeIn">
            <div className="flex items-center space-x-3">
              <Scale className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">Wahab Legal AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl text-center">
              Professional legal AI assistant platform. This tool is for educational purposes only 
              and does not constitute legal advice. Always consult with qualified legal professionals.
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>© 2024 Wahab Legal AI</span>
              <span>•</span>
              <span>Educational Use Only</span>
              <span>•</span>
              <span>Not Legal Advice</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}