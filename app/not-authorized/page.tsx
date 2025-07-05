"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Scale, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotAuthorizedPage() {
  console.log("NotAuthorizedPage rendered");
  
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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2 text-red-800">
                <Ban className="h-8 w-8" />
                <span>Access Denied</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-red-900 mb-4">
                  Unauthorized Access
                </h2>
                <p className="text-red-700 mb-6">
                  You don't have permission to access the admin panel. 
                  Only authorized administrators can access this area.
                </p>
                
                <div className="bg-red-100 p-4 rounded-lg mb-6">
                  <p className="text-sm text-red-800">
                    <strong>Security Notice:</strong> This access attempt has been logged for security purposes.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Link href="/dashboard">
                    <Button className="w-full legal-gradient text-white">
                      Return to Dashboard
                    </Button>
                  </Link>
                  
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Go to Homepage
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              If you believe you should have access to this area, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}