import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import {
  ArrowRight,
  Loader2,
  LogIn,
  Eye,
  Users,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  Mountain,
  Check
} from "lucide-react";
import { useAuth } from "../../contexts/auth-context";
import { motion } from "framer-motion";


// -------------------- Main RegisterPage Component --------------------
export function RegisterPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("register");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    if (formData.password.length < 6) { 
      setError("Password must be at least 6 characters"); 
      setIsLoading(false); 
      return; 
    }
    if (formData.password !== formData.confirmPassword) { 
      setError("Passwords do not match"); 
      setIsLoading(false); 
      return; 
    }
    
    try { 
      await register(formData.name, formData.email, formData.password); 
      navigate("/"); 
    }
    catch (err) { 
      setError(err instanceof Error ? err.message : "Failed to register"); 
    }
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try { 
      await login(formData.email, formData.password); 
      navigate("/"); 
    }
    catch (err) { 
      setError(err instanceof Error ? err.message : "Failed to login"); 
    }
    setIsLoading(false);
  };

  const passwordStrength = {
    weak: formData.password.length > 0 && formData.password.length < 6,
    medium: formData.password.length >= 6 && formData.password.length < 10,
    strong: formData.password.length >= 10 && /[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password)
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic background based on theme */}
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:opacity-100"></div>
      <div className="absolute inset-0 transition-opacity duration-300 opacity-100 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:opacity-0"></div>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full bg-gradient-to-br from-white/5 via-transparent to-white/3 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-[var(--monastery-saffron)]/5 via-transparent to-[var(--monastery-gold)]/3 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            initial={{ y: "100vh", rotate: 0, scale: 0.5 }}
            animate={{ 
              y: "-100vh", 
              rotate: 180,
              scale: [0.5, 1, 0.5],
              x: [0, 100, -100, 0]
            }}
            transition={{ 
              duration: 15 + i * 3, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 2
            }}
            style={{ 
              left: `${5 + i * 12}%`
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-24">
        <div className="grid items-start w-full max-w-5xl gap-12 mx-auto lg:grid-cols-2">
          
          {/* Left Side - Feature Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center text-slate-900 dark:text-white lg:text-left"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] px-6 py-3 rounded-full text-black font-semibold shadow-lg"
              >
              <Users className="w-5 h-5" /> {/* Using Users icon as a placeholder for Mountain */}
              <span>Join Monastery360</span>
              </motion.div>
              
              <h1 className="text-4xl font-bold leading-tight lg:text-6xl">
                <span className="text-transparent bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text">
                  Begin Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-[var(--monastery-saffron)] via-[var(--monastery-gold)] to-[var(--monastery-saffron)] bg-clip-text text-transparent">
                  Spiritual Journey
                </span>
              </h1>
              
              <p className="max-w-lg text-xl text-slate-700 dark:text-gray-300">
                Create your account to unlock exclusive features: personalized monastery recommendations, 
                guided meditation sessions, and connections with spiritual communities worldwide.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid max-w-lg grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:mx-0">
              {[
                { icon: "🎯", title: "Personalized Tours", desc: "AI-curated spiritual experiences" },
                { icon: "🧘", title: "Meditation Guide", desc: "Daily mindfulness practices" },
                { icon: "🌅", title: "Sacred Calendar", desc: "Festival & ritual notifications" },
                { icon: "🤝", title: "Community", desc: "Connect with fellow seekers" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 space-y-3 text-center border rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border-slate-300/50 dark:border-white/10"
                >
                  <div className="mb-2 text-2xl">{feature.icon}</div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{feature.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            className="-translate-y-16" 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Card className="shadow-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-slate-200/50 dark:border-white/20">
              <CardHeader className="space-y-6 text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                
                {/* Tab Switcher */}
                <div className="flex p-1 rounded-lg bg-white/5 backdrop-blur-sm">
                  <button
  onClick={() => setActiveTab("register")}
  className={`flex-1 rounded-md py-2 px-4 text-sm font-medium transition-all duration-300 ${
    activeTab === "register"
      ? "bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-black shadow-lg"
      : "text-slate-700 dark:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
  }`}
>
  Sign Up
</button>

<button
  onClick={() => setActiveTab("login")}
  className={`flex-1 rounded-md py-2 px-4 text-sm font-medium transition-all duration-300 ${
    activeTab === "login" // <-- FIX: Changed this to check for "login"
      ? "bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-black shadow-lg"
      : "text-slate-700 dark:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
  }`}
>
  Sign In
</button>
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white">
                    {activeTab === "login" ? "Welcome Back" : "Create Account"}
                  </CardTitle>
                  <CardDescription className="text-slate-700 dark:text-gray-300">
                    {activeTab === "login" 
                      ? "Continue your spiritual journey" 
                      : "Start your monastery exploration today"}
                  </CardDescription>
                </div>
              </CardHeader>

              <form onSubmit={activeTab === "login" ? handleLogin : handleRegister}>
                <CardContent className="space-y-6">
                  {/* Name Input - Only for Register */}
                  {activeTab === "register" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="font-medium text-slate-800 dark:text-white">Full Name</Label>
                      <div className="relative">
                        <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input 
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="        Your full name"
                          className="pl-14 h-12 bg-white/90 dark:bg-white/10 border-slate-300 dark:border-white/30 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:border-[var(--monastery-gold)] focus:ring-[var(--monastery-gold)]/50 dark:backdrop-blur-sm"
                          required 
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium text-slate-800 dark:text-white">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <Input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="        your.name@email.com"
                        className="pl-14 h-12 bg-white/90 dark:bg-white/10 border-slate-300 dark:border-white/30 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:border-[var(--monastery-gold)] focus:ring-[var(--monastery-gold)]/50 dark:backdrop-blur-sm"
                        required 
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-medium text-slate-800 dark:text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <Input 
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="        Enter your password"
                        className="pl-14 pr-12 h-12 bg-white/90 dark:bg-white/10 border-slate-300 dark:border-white/30 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:border-[var(--monastery-gold)] focus:ring-[var(--monastery-gold)]/50 dark:backdrop-blur-sm"
                        required 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength - Only for Register */}
                    {activeTab === "register" && formData.password && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-2"
                      >
                        <div className="flex space-x-1">
                          <div className={`h-1 flex-1 rounded ${passwordStrength.weak ? 'bg-red-400' : passwordStrength.medium ? 'bg-yellow-400' : passwordStrength.strong ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                          <div className={`h-1 flex-1 rounded ${passwordStrength.medium || passwordStrength.strong ? 'bg-yellow-400' : 'bg-gray-600'}`}></div>
                          <div className={`h-1 flex-1 rounded ${passwordStrength.strong ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                        </div>
                        <p className="text-xs text-gray-400">
                          {passwordStrength.strong ? '💪 Strong password' : 
                           passwordStrength.medium ? '⚡ Good password' : 
                           '🔒 Use 6+ characters'}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Confirm Password - Only for Register */}
                  {activeTab === "register" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-2"
                    >
                      <Label htmlFor="confirmPassword" className="font-medium text-slate-800 dark:text-white">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input 
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          placeholder="      Confirm your password"
                          className="pl-14 pr-12 h-12 bg-white/90 dark:bg-white/10 border-slate-300 dark:border-white/30 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:border-[var(--monastery-gold)] focus:ring-[var(--monastery-gold)]/50 dark:backdrop-blur-sm"
                          required 
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {formData.confirmPassword && (
                        <div className="flex items-center space-x-2 text-xs">
                          {formData.password === formData.confirmPassword ? (
                            <><Check className="w-3 h-3 text-green-400" /><span className="text-green-400">Passwords match</span></>
                          ) : (
                            <span className="text-red-400">Passwords don't match</span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Remember Me - Only for Login */}
                  {activeTab === "login" && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 text-black cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-[var(--monastery-gold)] bg-white/10 border-white/30 rounded focus:ring-[var(--monastery-gold)] focus:ring-2" />
                        <span>Remember me</span>
                      </label>
                      <button type="button" className="text-[var(--monastery-gold)] hover:text-[var(--monastery-saffron)] transition-colors">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Error Alert */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="p-4 border rounded-lg bg-red-500/20 border-red-500/30 backdrop-blur-sm"
                    >
                      <p className="text-sm font-medium text-red-200">{error}</p>
                    </motion.div>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col items-center pt-4 space-y-4">
                  {/* Primary Action Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] hover:from-[var(--monastery-gold)] hover:to-[var(--monastery-saffron)] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading || (activeTab === 'register' && formData.password !== formData.confirmPassword)}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{activeTab === "login" ? "Signing you in..." : "Creating account..."}</span>
                      </div>
                    ) : (
                      <>
                        {activeTab === "login" ? (
                          <div className="flex items-center justify-center space-x-2">
                            <LogIn className="w-5 h-5" />
                            <span>Sign In to Continue</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <ArrowRight className="w-5 h-5" />
                            <span>Create My Account</span>
                          </div>
                        )}
                      </>
                    )}
                  </Button>
                  
                  {/* Terms - Only for Register */}
                  {activeTab === "register" && (
                    <div className="w-full px-2">
                      <p className="max-w-sm mx-auto text-xs leading-relaxed text-center text-slate-600 dark:text-gray-400">
                        By creating an account, you agree to our{" "}
                        <button 
                          type="button" 
                          className="text-[var(--monastery-gold)] hover:text-[var(--monastery-saffron)] hover:underline font-medium transition-colors inline"
                        >
                          Terms of Service
                        </button>
                        {" "}and{" "}
                        <button 
                          type="button" 
                          className="text-[var(--monastery-gold)] hover:text-[var(--monastery-saffron)] hover:underline font-medium transition-colors inline"
                        >
                          Privacy Policy
                        </button>
                        .
                      </p>
                    </div>
                  )}
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  );
}
