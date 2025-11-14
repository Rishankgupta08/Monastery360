import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { ArrowRight, Loader2, Eye, EyeOff, Mail, Lock, Sparkles, Mountain } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/auth-context";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic background based on theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:opacity-100 opacity-0 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:opacity-0 opacity-100 transition-opacity duration-300"></div>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-full h-full bg-gradient-to-br from-white/5 via-transparent to-white/3 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--monastery-saffron)]/5 via-transparent to-[var(--monastery-gold)]/3 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Floating Monastery Silhouettes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            initial={{ y: "100vh", rotate: 0 }}
            animate={{ 
              y: "-100vh", 
              rotate: 360,
              x: [0, 50, -50, 0]
            }}
            transition={{ 
              duration: 20 + i * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 3
            }}
            style={{ 
              left: `${10 + i * 15}%`, 
              fontSize: `${20 + i * 10}px` 
            }}
          >
            <Mountain className="w-8 h-8 text-white" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Welcome Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-slate-900 dark:text-white space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] px-6 py-3 rounded-full text-black font-medium shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                <span>Welcome to Monastery360</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Discover Sacred
                </span>
                <br />
                <span className="bg-gradient-to-r from-[var(--monastery-saffron)] via-[var(--monastery-gold)] to-[var(--monastery-saffron)] bg-clip-text text-transparent">
                  Monasteries
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-lg">
                Embark on a spiritual journey through the majestic monasteries of Sikkim. 
                Experience virtual tours, connect with local guides, and plan your sacred pilgrimage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              {[
                { icon: "🏛️", title: "Virtual Tours", desc: "Immersive 360° experiences" },
                { icon: "🗺️", title: "Sacred Maps", desc: "Interactive monastery locations" },
                { icon: "👨‍🏫", title: "Local Guides", desc: "Connect with spiritual teachers" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center space-y-2"
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Card className="backdrop-blur-xl bg-white/90 dark:bg-white/10 border-slate-200/50 dark:border-white/20 shadow-2xl">
              <CardHeader className="space-y-6 text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="w-16 h-16 mx-auto bg-gradient-to-br from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Mountain className="w-8 h-8 text-white" />
                </motion.div>
                
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-slate-700 dark:text-gray-300">
                    Continue your spiritual journey through Sikkim's sacred monasteries
                  </CardDescription>
                </div>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-800 dark:text-white font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.name@email.com"
                        className="pl-12 h-12 bg-white/90 dark:bg-white/10 border-slate-300 dark:border-white/30 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:border-[var(--monastery-gold)] focus:ring-[var(--monastery-gold)]/50 dark:backdrop-blur-sm"
                        required 
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-800 dark:text-white font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="pl-12 pr-12 h-12 bg-white/90 dark:bg-white/10 border-slate-300 dark:border-white/30 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:border-[var(--monastery-gold)] focus:ring-[var(--monastery-gold)]/50 dark:backdrop-blur-sm"
                        required 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-slate-700 dark:text-gray-300 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-[var(--monastery-gold)] bg-white/90 dark:bg-white/10 border-slate-300 dark:border-white/30 rounded focus:ring-[var(--monastery-gold)] focus:ring-2" />
                      <span>Remember me</span>
                    </label>
                    <button type="button" className="text-[var(--monastery-gold)] hover:text-[var(--monastery-saffron)] transition-colors">
                      Forgot password?
                    </button>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-red-100/90 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30 rounded-lg dark:backdrop-blur-sm"
                    >
                      <p className="text-red-200 dark:text-red-200 text-red-700 text-sm">{error}</p>
                    </motion.div>
                  )}
                </CardContent>

                <CardFooter className="space-y-6">
                  {/* Login Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] hover:from-[var(--monastery-gold)] hover:to-[var(--monastery-saffron)] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Signing you in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <ArrowRight className="h-5 w-5" />
                        <span>Sign In to Continue</span>
                      </div>
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-slate-700 dark:text-gray-400">New to Monastery360?</span>
                    </div>
                  </div>

                  {/* Register Link */}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="w-full h-12 border-2 border-slate-300 dark:border-white/30 text-slate-800 dark:text-white font-medium hover:bg-slate-100/80 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/50 rounded-lg transition-all duration-300 dark:backdrop-blur-sm"
                  >
                    Create New Account
                  </button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
}
