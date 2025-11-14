import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";
import { Sparkles, Smartphone, Gamepad2, GraduationCap, Zap, Eye, Star, Trophy, Book, Users, Bell, ArrowRight } from "lucide-react";
import { useState } from "react";

export function FutureFeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState("ar");

  const futureFeatures = [
    {
      id: "ar",
      title: "Augmented Reality Experience",
      description: "Overlay digital information onto real monastery spaces through your smartphone",
      icon: Eye,
      status: "In Development",
      progress: 75,
      releaseDate: "Q2 2025",
      image: "https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-[var(--monastery-maroon)] to-[var(--monastery-saffron)]",
      features: [
        "Point phone at artifacts to see historical information",
        "Virtual monk guides appearing in real spaces",
        "Interactive 3D models of architectural elements",
        "Multi-language overlay support"
      ]
    },
    {
      id: "gamification",
      title: "Heritage Quest Gamification",
      description: "Collect digital stamps, unlock achievements, and learn through engaging challenges",
      icon: Gamepad2,
      status: "Planning",
      progress: 30,
      releaseDate: "Q3 2025",
      image: "https://images.unsplash.com/photo-1704797390836-5dd5e0951832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1vbmFzdGVyeSUyMGludGVyaW9yJTIwbXVyYWxzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-[var(--monastery-saffron)] to-[var(--monastery-gold)]",
      features: [
        "Digital passport with monastery stamps",
        "Knowledge quests about Buddhist teachings",
        "Community leaderboards and challenges",
        "Unlock special content through exploration"
      ]
    },
    {
      id: "education",
      title: "Kids Heritage Explorer",
      description: "Interactive learning modules designed specifically for young heritage enthusiasts",
      icon: GraduationCap,
      status: "Concept",
      progress: 15,
      releaseDate: "Q4 2025",
      image: "https://images.unsplash.com/photo-1611955166156-9ae5e948c6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaWJldGFuJTIwcHJheWVyJTIwZmxhZ3MlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-[var(--monastery-gold)] to-[var(--monastery-emerald)]",
      features: [
        "Animated stories of Buddhist legends",
        "Virtual coloring books of monastery art",
        "Simple meditation games for children",
        "Family-friendly guided tours"
      ]
    },
    {
      id: "ai",
      title: "AI Heritage Assistant",
      description: "Intelligent chatbot with deep knowledge of Sikkim's monastic traditions",
      icon: Zap,
      status: "Research",
      progress: 10,
      releaseDate: "2026",
      image: "https://images.unsplash.com/photo-1643442240897-c3286093d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-[var(--monastery-emerald)] to-[var(--monastery-maroon)]",
      features: [
        "Ask questions about any monastery or artifact",
        "Personalized learning recommendations",
        "Real-time translation of ancient texts",
        "Voice-activated spiritual guidance"
      ]
    }
  ];

  const achievements = [
    { icon: Star, title: "First Visitor", description: "Visit your first monastery" },
    { icon: Trophy, title: "Heritage Scholar", description: "Complete 10 learning modules" },
    { icon: Book, title: "Archive Explorer", description: "View 50 historical artifacts" },
    { icon: Users, title: "Community Builder", description: "Share 5 cultural stories" }
  ];

  const selectedFeatureData = futureFeatures.find(f => f.id === selectedFeature);

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="bg-gradient-to-r from-[var(--monastery-gold)] to-[var(--monastery-emerald)] text-white border-none px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Future-Ready Features
          </Badge>
          <h1 className="text-4xl md:text-5xl mb-4">Innovation Meets Tradition</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover upcoming features that will revolutionize how we connect with and preserve Sikkim's spiritual heritage.
          </p>
        </motion.div>

        {/* Feature Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="overflow-hidden bg-gradient-to-br from-[var(--monastery-maroon)]/10 to-[var(--monastery-emerald)]/10 border-2 border-[var(--monastery-gold)]/30">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Feature Image */}
                <div 
                  className="h-96 lg:h-auto bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${selectedFeatureData?.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  
                  {/* AR Overlay Mockup */}
                  {selectedFeature === "ar" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-full flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">Golden Buddha</h4>
                            <p className="text-xs text-muted-foreground">16th Century</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">This sacred statue represents the Medicine Buddha, crafted from bronze and gilded with pure gold...</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Gamification Overlay Mockup */}
                  {selectedFeature === "gamification" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 right-4"
                    >
                      <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg text-white">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Quest Progress</h4>
                          <Badge className="bg-[var(--monastery-gold)] text-black">Level 3</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Monastery Explorer</span>
                            <span>3/5 ⭐</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Feature Details */}
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${selectedFeatureData?.color} rounded-lg flex items-center justify-center`}>
                      {selectedFeatureData && (
                        <selectedFeatureData.icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{selectedFeatureData?.title}</h3>
                      <p className="text-muted-foreground">{selectedFeatureData?.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <Badge className={`bg-gradient-to-r ${selectedFeatureData?.color} text-white border-none`}>
                      {selectedFeatureData?.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Expected: {selectedFeatureData?.releaseDate}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Development Progress</span>
                      <span className="text-sm text-muted-foreground">{selectedFeatureData?.progress}%</span>
                    </div>
                    <Progress value={selectedFeatureData?.progress} className="h-3">
                      <div 
                        className={`h-full bg-gradient-to-r ${selectedFeatureData?.color} transition-all duration-300 rounded-full`}
                        style={{ width: `${selectedFeatureData?.progress}%` }}
                      />
                    </Progress>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Key Features:</h4>
                    <ul className="space-y-2">
                      {selectedFeatureData?.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-2 text-sm text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-full mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="mt-6 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white">
                    <Bell className="w-4 h-4 mr-2" />
                    Get Notified
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {futureFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 h-full ${
                    selectedFeature === feature.id 
                      ? `ring-2 ring-[var(--monastery-gold)] bg-gradient-to-br ${feature.color.replace('from-', 'from-').replace('to-', 'to-')}/10` 
                      : 'bg-white/70 backdrop-blur-sm hover:shadow-md'
                  }`}
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm mb-2">{feature.title}</h4>
                    <div className="space-y-2">
                      <Progress value={feature.progress} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{feature.status}</span>
                        <span>{feature.progress}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Gamification Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-[var(--monastery-saffron)]/10 to-[var(--monastery-gold)]/10 border-[var(--monastery-gold)]/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3>Heritage Quest Achievements</h3>
                  <p className="text-sm text-muted-foreground font-normal">Unlock badges as you explore Sikkim's spiritual heritage</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-center p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-[var(--monastery-gold)]/30"
                    >
                      <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-[var(--monastery-gold)] to-[var(--monastery-emerald)] rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-[var(--monastery-maroon)]/10 to-[var(--monastery-emerald)]/10 border-2 border-[var(--monastery-gold)]/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Shape the Future of Heritage</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your feedback helps us prioritize which features to develop first. Join our community and influence the future of digital heritage preservation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white px-8">
                  <Users className="w-5 h-5 mr-2" />
                  Join Beta Testing
                </Button>
                <Button size="lg" variant="outline" className="border-[var(--monastery-gold)]/30 px-8">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Share Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}