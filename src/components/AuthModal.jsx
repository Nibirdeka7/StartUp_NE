import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { ArrowRight, Sparkles, Home, Loader2, Eye, EyeOff, UserPlus, LogIn, Mail, Clock } from "lucide-react";
import { supabase } from "../utils/supabaseClient";

const STEPS = {
  INITIAL: "initial", // Choose login/signup
  SIGNUP: "signup", // New user registration
  LOGIN: "login", // Existing user login
  VERIFY_OTP: "verify_otp", // OTP verification for signup
  ONBOARDING: "onboarding", // Post-verification options
};

export function AuthModal({ isOpen, onClose, onListStartup, onGoHome }) {
  const [step, setStep] = useState(STEPS.INITIAL);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: "",
    otp: "" 
  });
  const [errors, setErrors] = useState({});
  const [userExists, setUserExists] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  // Timer for OTP resend
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Reset modal state when closed
  const handleClose = () => {
    setStep(STEPS.INITIAL);
    setFormData({ name: "", email: "", password: "", confirmPassword: "", otp: "" });
    setErrors({});
    setUserExists(false);
    setOtpTimer(0);
    setOtpSent(false);
    onClose();
  };

  // Check if user exists when email changes
  useEffect(() => {
    const checkUserExists = async () => {
      if (formData.email && formData.email.includes('@')) {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('id')
            .eq('email', formData.email)
            .maybeSingle();
          
          if (error) {
            console.error("Error checking user:", error);
            return;
          }
          
          setUserExists(!!data);
        } catch (error) {
          console.error("Error checking user:", error);
        }
      }
    };

    const timeoutId = setTimeout(checkUserExists, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  // Validate form
  const validateForm = (isSignUp = false) => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if user exists and direct them appropriately
  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm(false)) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      // Check if user exists in auth.users
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        // If invalid credentials but user might exist
        if (authError.message.includes("Invalid login credentials")) {
          // Check if email exists in users table
          const { data: userData } = await supabase
            .from('users')
            .select('id')
            .eq('email', formData.email)
            .maybeSingle();
          
          if (userData) {
            // User exists but wrong password
            setErrors({ password: "Incorrect password. Please try again." });
          } else {
            // User doesn't exist, show signup option
            setStep(STEPS.SIGNUP);
            setErrors({ general: "No account found with this email. Please sign up." });
          }
        } else {
          setErrors({ general: authError.message });
        }
      } else {
        // Successful login
        setStep(STEPS.ONBOARDING);
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setLoading(false);
    }
  };

  // Sign up new user with OTP
  const handleSignUp = async (e) => {
    e?.preventDefault();
    
    if (!validateForm(true)) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      // First, check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', formData.email)
        .maybeSingle();
      
      if (existingUser) {
        setErrors({ email: "User already exists. Please login instead." });
        setStep(STEPS.LOGIN);
        return;
      }
      
      // Create user with password - this will automatically send OTP if email confirmations are enabled
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
          emailRedirectTo: null,
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          setErrors({ email: "Email already registered. Please login." });
          setStep(STEPS.LOGIN);
        } else {
          setErrors({ general: error.message });
        }
      } else {
        // User created, OTP should be sent automatically via email
        if (data.user && !data.user.email_confirmed_at) {
          setOtpSent(true);
          setOtpTimer(60); // 60 seconds timer
          setStep(STEPS.VERIFY_OTP);
        } else if (data.user?.email_confirmed_at) {
          // Email already confirmed (shouldn't happen with new users)
          // Create user profile and proceed to onboarding
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: formData.email,
              full_name: formData.name,
              role: 'user',
              created_at: new Date().toISOString(),
            });
          
          if (profileError) {
            console.error("Error creating user profile:", profileError);
          }
          
          setStep(STEPS.ONBOARDING);
        }
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setLoading(false);
    }
  };

  // Login existing user
  const handleLogin = async (e) => {
    e?.preventDefault();
    
    if (!validateForm(false)) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({ general: error.message });
      } else {
        // Successful login
        setStep(STEPS.ONBOARDING);
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP for new user
  const handleVerifyOTP = async (e) => {
    e?.preventDefault();
    
    if (!formData.otp || formData.otp.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: formData.otp,
        type: 'signup',
      });

      if (error) {
        setErrors({ otp: error.message });
      } else if (data.user) {
        // Create user profile in users table
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: formData.email,
            full_name: formData.name,
            role: 'user',
            created_at: new Date().toISOString(),
          });
        
        if (profileError) {
          console.error("Error creating user profile:", profileError);
        }
        
        setStep(STEPS.ONBOARDING);
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (otpTimer > 0) {
      setErrors({ general: `Please wait ${otpTimer} seconds before resending OTP` });
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      // Try to resend signup OTP
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          data: { full_name: formData.name },
          emailRedirectTo: null,
        },
      });
      
      if (error) {
        // If that fails, try to resend verification email
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: formData.email,
          options: {
            data: { full_name: formData.name },
          },
        });
        
        if (resendError) {
          setErrors({ general: resendError.message });
        } else {
          setOtpTimer(60); // Reset timer to 60 seconds
          alert("OTP has been resent to your email.");
        }
      } else {
        setOtpTimer(60); // Reset timer to 60 seconds
        alert("OTP has been resent to your email.");
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Sign In
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrors({});
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) {
        setErrors({ general: error.message });
      }
      // Note: The user will be redirected to Google and back, 
      // so we don't need to handle the success case here
    } catch (error) {
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setGoogleLoading(false);
    }
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
      case STEPS.INITIAL:
        return (
          <>
            <DialogHeader>
              <DialogTitle className="font-montserrat text-2xl text-red-700">
                Welcome to Startup Northeast
              </DialogTitle>
              <DialogDescription className="font-poppins text-slate-600">
                Enter your email to get started
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleInitialSubmit} className="space-y-4 pt-4">
              {errors.general && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={errors.email ? "border-red-500" : ""}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                
                {/* Show hint if user exists */}
                {formData.email && formData.email.includes('@') && (
                  <p className={`text-xs ${userExists ? 'text-green-600' : 'text-blue-600'}`}>
                    {userExists 
                      ? "✓ Account found. Please enter your password to login."
                      : "New user? You'll be able to create an account."}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-700 hover:bg-red-800 font-poppins flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
              
              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              {/* Google Sign In Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full font-poppins border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                {googleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>
              
              <div className="text-center pt-4">
                <p className="text-sm text-slate-600">
                  Don't have an account? Your email will determine the next step.
                </p>
              </div>
            </form>
          </>
        );

      case STEPS.SIGNUP:
        return (
          <>
            <DialogHeader>
              <DialogTitle className="font-montserrat text-2xl text-red-700">
                Create Your Account
              </DialogTitle>
              <DialogDescription className="font-poppins text-slate-600">
                Join Startup Northeast ecosystem
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSignUp} className="space-y-4 pt-4">
              {errors.general && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? "border-red-500" : ""}
                  required
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={errors.email ? "border-red-500" : ""}
                  required
                  readOnly
                />
                <p className="text-xs text-blue-600">We'll send an OTP to this email for verification</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Create Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  required
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(STEPS.INITIAL)}
                  className="flex-1 font-poppins"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-700 hover:bg-red-800 font-poppins flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Sign Up & Verify Email
                      <UserPlus className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
              
              {/* Google Sign In Option */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full font-poppins border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                {googleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign up with Google
                  </>
                )}
              </Button>
            </form>
          </>
        );

      case STEPS.LOGIN:
        return (
          <>
            <DialogHeader>
              <DialogTitle className="font-montserrat text-2xl text-red-700">
                Welcome Back!
              </DialogTitle>
              <DialogDescription className="font-poppins text-slate-600">
                Please login to your account
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              {errors.general && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setStep(STEPS.INITIAL);
                    setFormData(prev => ({ ...prev, password: "" }));
                  }}
                  className="flex-1 font-poppins"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-700 hover:bg-red-800 font-poppins flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Login
                      <LogIn className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
              
              {/* Google Sign In Option */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or login with</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full font-poppins border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                {googleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Login with Google
                  </>
                )}
              </Button>
            </form>
          </>
        );

      case STEPS.VERIFY_OTP:
        return (
          <>
            <DialogHeader>
              <DialogTitle className="font-montserrat text-2xl text-red-700">
                Verify Your Email
              </DialogTitle>
              <DialogDescription className="font-poppins text-slate-600">
                We've sent a 6-digit OTP to <strong>{formData.email}</strong>
                <br />
                <span className="text-xs text-gray-500">
                  Check your spam folder if you don't see it in your inbox
                </span>
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleVerifyOTP} className="space-y-4 pt-4">
              {errors.general && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium font-poppins flex items-center justify-between">
                  <span>Enter 6-digit OTP</span>
                  {otpTimer > 0 && (
                    <span className="text-sm text-red-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {otpTimer}s
                    </span>
                  )}
                </label>
                <Input
                  type="text"
                  placeholder="123456"
                  value={formData.otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setFormData({ ...formData, otp: value });
                  }}
                  className={errors.otp ? "border-red-500 text-center text-xl" : "text-center text-xl"}
                  maxLength={6}
                  required
                  autoFocus
                />
                {errors.otp && <p className="text-red-500 text-xs">{errors.otp}</p>}
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendOTP}
                  disabled={loading || otpTimer > 0}
                  className="flex-1 font-poppins"
                >
                  {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Resend OTP"}
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-700 hover:bg-red-800 font-poppins"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>
              </div>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(STEPS.SIGNUP)}
                  className="text-red-600 hover:text-red-800 text-sm font-poppins"
                >
                  ← Go back to signup
                </button>
              </div>
            </form>
          </>
        );

      case STEPS.ONBOARDING:
        return (
          <>
            <DialogHeader className="text-center">
              <Sparkles className="w-10 h-10 mx-auto text-red-500 mb-2" />
              <DialogTitle className="font-montserrat text-3xl text-oxford-blue">
                Welcome, {formData.name?.split(' ')[0] || "Innovator"}!
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