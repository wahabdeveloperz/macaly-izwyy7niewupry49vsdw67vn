"use client";

import { SignUp } from "@clerk/nextjs";
import { Scale } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      console.log("Sign-up with referral code:", ref);
      setReferralCode(ref);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Referral Banner */}
      {referralCode && (
        <div className="bg-green-600 text-white py-2 px-4 text-center text-sm">
          🎉 You're signing up with referral code: <strong>{referralCode}</strong>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Wahab Legal AI</h1>
          </Link>
        </div>
      </nav>

      {/* Sign Up Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Get Started</h2>
            <p className="text-slate-600">Create your Legal AI account</p>
            {referralCode && (
              <p className="text-sm text-green-600 mt-2">
                You'll get full access to our platform with referral code: <strong>{referralCode}</strong>
              </p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white',
                  card: 'shadow-none',
                },
              }}
            />
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-primary hover:text-primary/80 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}