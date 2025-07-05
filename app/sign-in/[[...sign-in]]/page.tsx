import { SignIn } from "@clerk/nextjs";
import { Scale } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Wahab Legal AI</h1>
          </Link>
        </div>
      </nav>

      {/* Sign In Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-600">Sign in to your Legal AI account</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <SignIn 
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
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-primary hover:text-primary/80 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}