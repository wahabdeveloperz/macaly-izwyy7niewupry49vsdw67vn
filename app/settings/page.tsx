"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, User, ArrowLeft, Shield, Bell } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-slate-600">Loading settings...</p>
        </div>
      </div>
    );
  }

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
            <h2 className="text-3xl font-bold text-slate-900">Account Settings</h2>
            <p className="text-lg text-slate-600">Manage your account and preferences</p>
          </div>

          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-16 w-16",
                    },
                  }}
                />
                <div>
                  <h3 className="font-medium text-slate-900">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  To update your profile information, email, or password, click on your profile picture above.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security & Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-slate-600">
                    Secure your account with 2FA through the profile menu
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900">Data Privacy</h4>
                  <p className="text-sm text-slate-600">
                    All your legal consultations are encrypted and private
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Privacy Note:</strong> Your legal consultations are stored securely and never shared with third parties. 
                  All data is encrypted and protected according to industry standards.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Email Notifications</h4>
                    <p className="text-sm text-slate-600">Receive updates about your account</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Legal Disclaimer</h4>
                    <p className="text-sm text-slate-600">Show disclaimer on every session</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Support & Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900">Need Help?</h4>
                  <p className="text-sm text-slate-600">
                    Contact our support team for assistance with your account or legal AI questions.
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900">WhatsApp Upgrade</h4>
                  <p className="text-sm text-slate-600">
                    Need to upgrade your plan? Send us a message on WhatsApp for quick assistance.
                  </p>
                  <Button variant="outline" size="sm">
                    +92 328 464 5753
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}