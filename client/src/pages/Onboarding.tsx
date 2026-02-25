import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Lock, Eye, EyeOff, Chrome, Zap } from "lucide-react";

type OnboardingStep = "welcome" | "signup" | "login";

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function Onboarding() {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleGoogleAuth = () => {
    // Placeholder for Google Auth - will be configured with Supabase
    console.log("Google Authentication triggered");
    alert("Google Authentication will be configured with Supabase in production");
  };

  const handlePasswordlessLogin = () => {
    // Placeholder for Passwordless - will be configured with Supabase
    console.log("Passwordless login triggered");
    alert("Passwordless login will be configured with Supabase in production");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission - will be configured with Supabase
    console.log("Form submitted:", formData);
    alert(`${step === "signup" ? "Sign up" : "Login"} will be configured with Supabase in production`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.95_0.02_240)] via-white to-[oklch(0.95_0.02_330)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === "welcome" && (
            <motion.div
              key="welcome"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* mannuh Logo */}
              <motion.div 
                className="mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-black text-white">m</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] bg-clip-text text-transparent">
                    mannuh
                  </span>
                </h1>
                <p className="text-muted-foreground mt-2">Connect. Grow. Thrive.</p>
              </motion.div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    size="lg"
                    onClick={() => setStep("signup")}
                    className="w-full bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] hover:opacity-90 text-white shadow-lg"
                  >
                    I don't have an account
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setStep("login")}
                    className="w-full border-2"
                  >
                    I already have an account
                  </Button>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs text-muted-foreground mt-8"
              >
                By continuing, you agree to our Terms of Service and Privacy Policy
              </motion.p>
            </motion.div>
          )}

          {step === "signup" && (
            <motion.div
              key="signup"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2">
                <CardContent className="p-8">
                  {/* Back Button */}
                  <button
                    onClick={() => setStep("welcome")}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  {/* Logo */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] flex items-center justify-center">
                      <span className="text-2xl font-black text-white">m</span>
                    </div>
                    <h2 className="text-2xl font-bold">Create your account</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Join the mannuh community
                    </p>
                  </div>

                  {/* Social Auth Buttons */}
                  <div className="space-y-3 mb-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleAuth}
                      className="w-full"
                    >
                      <Chrome className="w-4 h-4 mr-2" />
                      Continue with Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePasswordlessLogin}
                      className="w-full"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Passwordless Login
                    </Button>
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or sign up with email</span>
                    </div>
                  </div>

                  {/* Sign Up Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-11"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          className="pl-10 pr-10 h-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Must be at least 8 characters
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] h-11"
                    >
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{" "}
                    <button
                      onClick={() => setStep("login")}
                      className="text-[oklch(0.82_0.06_240)] hover:underline font-medium"
                    >
                      Log in
                    </button>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "login" && (
            <motion.div
              key="login"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2">
                <CardContent className="p-8">
                  {/* Back Button */}
                  <button
                    onClick={() => setStep("welcome")}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  {/* Logo */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] flex items-center justify-center">
                      <span className="text-2xl font-black text-white">m</span>
                    </div>
                    <h2 className="text-2xl font-bold">Welcome back</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Log in to your account
                    </p>
                  </div>

                  {/* Social Auth Buttons */}
                  <div className="space-y-3 mb-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleAuth}
                      className="w-full"
                    >
                      <Chrome className="w-4 h-4 mr-2" />
                      Continue with Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePasswordlessLogin}
                      className="w-full"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Passwordless Login
                    </Button>
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or log in with email</span>
                    </div>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Password</label>
                        <button
                          type="button"
                          className="text-xs text-[oklch(0.82_0.06_240)] hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          className="pl-10 pr-10 h-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[oklch(0.82_0.06_240)] to-[oklch(0.88_0.05_330)] h-11"
                    >
                      Log In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setStep("signup")}
                      className="text-[oklch(0.82_0.06_240)] hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
