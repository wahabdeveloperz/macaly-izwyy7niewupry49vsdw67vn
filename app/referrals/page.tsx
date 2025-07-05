"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Scale, Copy, Check, Gift, Users, Link as LinkIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getUserByEmail, getReferralsByUser, User, Referral } from "@/lib/database";

export default function ReferralsPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("ReferralsPage mounted, user loaded:", isLoaded, clerkUser?.emailAddresses[0]?.emailAddress);
    
    if (isLoaded && clerkUser) {
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      if (email) {
        const user = getUserByEmail(email);
        if (user) {
          setUserProfile(user);
          setReferrals(getReferralsByUser(user.id));
        }
      }
      setIsLoading(false);
    }
  }, [isLoaded, clerkUser]);

  const copyReferralLink = async () => {
    if (!userProfile) return;
    
    const referralLink = `${window.location.origin}?ref=${userProfile.referralCode}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log("Referral link copied:", referralLink);
    } catch (err) {
      console.error('Failed to copy referral link:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Gift className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-slate-600">Loading referral dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-600">Unable to load referral information</p>
          <Link href="/dashboard">
            <Button className="mt-4">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}?ref=${userProfile.referralCode}`;
  const totalReferrals = referrals.length;
  const successfulReferrals = referrals.filter(r => r.rewardClaimed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Wahab Legal AI</h1>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900" data-macaly="referrals-title">
              Referral Program
            </h2>
            <p className="text-lg text-slate-600" data-macaly="referrals-description">
              Earn rewards by referring friends to Wahab Legal AI
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalReferrals}</div>
                <p className="text-xs text-slate-500">People you've referred</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Successful Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{successfulReferrals}</div>
                <p className="text-xs text-slate-500">Who activated paid plans</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Rewards Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{successfulReferrals}</div>
                <p className="text-xs text-slate-500">Free premium days</p>
              </CardContent>
            </Card>
          </div>

          {/* Referral Link */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LinkIcon className="h-5 w-5" />
                <span>Your Referral Link</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-slate-600">
                  Share this link with friends and colleagues to earn rewards:
                </p>
                <div className="flex space-x-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="flex-1 bg-slate-50"
                  />
                  <Button onClick={copyReferralLink} variant="outline">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">Your Referral Code:</h4>
                <div className="flex items-center space-x-2">
                  <code className="bg-white px-3 py-1 rounded border text-lg font-mono">
                    {userProfile.referralCode}
                  </code>
                  <Badge variant="secondary">Personal Code</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5" />
                <span>How Referrals Work</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900">For You:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Share your referral link</li>
                      <li>• When someone signs up using your link</li>
                      <li>• And activates a paid plan</li>
                      <li>• You get 7 days free premium access</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900">For Your Friend:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Gets full access to free trial</li>
                      <li>• Same great legal AI experience</li>
                      <li>• Can upgrade to any paid plan</li>
                      <li>• Enjoys all platform features</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> Share your referral link with legal professionals, 
                    law students, and anyone who might benefit from AI-powered legal assistance!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Referral History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {referrals.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No referrals yet</p>
                  <p className="text-sm text-slate-500">Start sharing your link to see your referrals here!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {referrals.map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">Referral #{referral.id}</p>
                        <p className="text-sm text-slate-600">
                          {new Date(referral.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={referral.rewardClaimed ? "default" : "secondary"}>
                        {referral.rewardClaimed ? "Reward Claimed" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}