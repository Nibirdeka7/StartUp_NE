import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"; // Note: Adjust import path if your Dialog is in a separate file
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/label"; // Using Badge for labels if standard Label isn't available
import { ArrowRight, Sparkles, Home, SparklesIcon, Loader2 } from "lucide-react";
import { supabase } from "../utils/supabaseClient";

const STEPS = {
  AUTH: "auth",
  OTP: "otp",
  ONBOARDING: "onboarding",
};

export function AuthModal({ isOpen, onClose, onListStartup, onGoHome }) {
  const [step, setStep] = useState(STEPS.AUTH);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", otp: "" });

  // Reset modal state when closed
  const handleClose = () => {
    setStep(STEPS.AUTH);
    setFormData({ name: "", email: "", otp: "" });
    onClose();
  };

  // Step 1: Request OTP
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: formData.email,
      options: {
        data: { full_name: formData.name }, // Stores name in user_metadata
      },
    });

    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      setStep(STEPS.OTP);
    }
  };

  // Step 2: Verify OTP
  const handleOTPSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      email: formData.email,
      token: formData.otp,
      type: 'email',
    });

    setLoading(false);
    if (error) {
      alert(error.message);
    } else if (data.session) {
      setStep(STEPS.ONBOARDING);
    }
  };

  // Google OAuth Social Login
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) alert(error.message);
  };

  const handleOnboardingAnswer = (wantsToList) => {
    if (wantsToList) {
      onListStartup();
    } else {
      onGoHome();
    }
    handleClose();
  };

  const renderContent = () => {
    switch (step) {
      case STEPS.AUTH:
        return (
          <>
            <DialogHeader>
              <DialogTitle className="font-montserrat text-2xl text-red-700">
                Get Started with Startup Northeast
              </DialogTitle>
              <DialogDescription className="font-poppins text-slate-600">
                Create your account to join the ecosystem.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAuthSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Your Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-700 hover:bg-red-800 font-poppins flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue with Email"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">Or</span></div>
            </div>
            <Button
              variant="outline"
              className="w-full font-poppins border-slate-300 hover:bg-slate-50"
              onClick={handleGoogleSignIn}
            >
              <SparklesIcon className="mr-2 w-4 h-4" />
              Sign in with Google
            </Button>
          </>
        );

      case STEPS.OTP:
        return (
          <>
            <DialogHeader>
              <DialogTitle className="font-montserrat text-2xl text-red-700">
                Verify Your Email
              </DialogTitle>
              <DialogDescription className="font-poppins text-slate-600">
                A verification code has been sent to **{formData.email}**.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Enter 6-Digit OTP</label>
                <Input
                  type="text"
                  placeholder="XXXXXX"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  required
                  maxLength={6}
                />
              </div>
              <Button
                onClick={handleOTPSubmit}
                disabled={loading}
                className="w-full bg-red-700 hover:bg-red-800 font-poppins"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Code"}
              </Button>
              <Button
                variant="link"
                className="w-full text-red-600 font-poppins"
                onClick={() => setStep(STEPS.AUTH)}
              >
                Go Back / Use Another Method
              </Button>
            </div>
          </>
        );

      case STEPS.ONBOARDING:
        return (
          <>
            <DialogHeader className="text-center">
              <Sparkles className="w-10 h-10 mx-auto text-red-500 mb-2" />
              <DialogTitle className="font-montserrat text-3xl text-oxford-blue">
                Welcome, {formData.name.split(' ')[0] || "Innovator"}!
              </DialogTitle>
              <DialogDescription className="font-poppins text-lg text-slate-700 mt-2">
                What brings you here today?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-6">
              <h3 className="font-poppins text-xl font-semibold text-red-700 text-center">
                Do you want to list your startup?
              </h3>
              <Button
                onClick={() => handleOnboardingAnswer(true)}
                className="w-full h-14 bg-red-600 hover:bg-red-700 font-poppins text-lg rounded-xl shadow-lg shadow-red-200"
              >
                Yes, List My Startup
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => handleOnboardingAnswer(false)}
                variant="outline"
                className="w-full h-14 border-2 border-slate-300 hover:border-red-600 hover:bg-red-50 font-poppins text-lg rounded-xl text-oxford-blue"
              >
                <Home className="w-5 h-5 mr-2" />
                No, Take Me Home
              </Button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] font-poppins bg-white">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}