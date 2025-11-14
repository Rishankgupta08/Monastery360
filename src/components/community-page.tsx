import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";
import { Users, Camera, Heart, MessageCircle, Share2, Award, MapPin, Calendar, BookOpen, Video, Clock } from "lucide-react";
import { useState } from "react";

export function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState("stories");

  const tabs = [
    { id: "stories", label: "Community Stories", icon: Heart },
    { id: "archivists", label: "Digital Archivists", icon: Camera },
    { id: "volunteers", label: "Volunteer Program", icon: Users },
    { id: "learning", label: "Learning Hub", icon: BookOpen }
  ];

  const communityStories = [
    {
      id: 1,
      author: "Tenzin Norbu",
      location: "Gangtok, Sikkim",
      role: "Local Guide",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      story: "Growing up near Rumtek Monastery, I've witnessed the transformation of how people connect with our heritage. Through Monastery360, I'm able to share stories my grandfather told me about these sacred spaces.",
      image: "https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 234,
      comments: 45,
      timeAgo: "2 days ago"
    },
    {
      id: 2,
      author: "Dr. Yangchen Dolma",
      location: "Pelling, Sikkim",
      role: "Art Historian",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      story: "Every mural tells a story spanning centuries. Working with the digital archive team, we're preserving these visual narratives for future generations to discover and learn from.",
      image: "https://images.unsplash.com/photo-1704797390836-5dd5e0951832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1vbmFzdGVyeSUyMGludGVyaW9yJTIwbXVyYWxzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 189,
      comments: 32,
      timeAgo: "5 days ago"
    },
    {
      id: 3,
      author: "Karma Lepcha",
      location: "Yuksom, Sikkim",
      role: "Youth Volunteer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      story: "As part of the youth digital archiving program, I'm learning traditional photography techniques while helping document sacred rituals. It's amazing how technology helps preserve our living culture.",
      image: "https://images.unsplash.com/photo-1611955166156-9ae5e948c6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaWJldGFuJTIwcHJheWVyJTIwZmxhZ3MlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 156,
      comments: 28,
      timeAgo: "1 week ago"
    }
  ];

  const digitalArchivists = [
    {
      id: 1,
      name: "Pema Choden",
      age: 22,
      location: "Gangtok",
      expertise: "360° Photography",
      contributions: 45,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      achievement: "Rising Star",
      bio: "Computer science student passionate about preserving cultural heritage through technology."
    },
    {
      id: 2,
      name: "Lobsang Tashi",
      age: 19,
      location: "Namchi",
      expertise: "Drone Documentation",
      contributions: 67,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      achievement: "Heritage Champion",
      bio: "Local youth trained in aerial photography for capturing monastery architecture and surroundings."
    },
    {
      id: 3,
      name: "Dolma Sherpa",
      age: 24,
      location: "Pelling",
      expertise: "Manuscript Digitization",
      contributions: 89,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      achievement: "Master Archivist",
      bio: "Art graduate specializing in high-resolution scanning and digital restoration of ancient texts."
    }
  ];

  const learningModules = [
    {
      id: 1,
      title: "Introduction to Buddhist Art",
      duration: "45 minutes",
      level: "Beginner",
      participants: 234,
      rating: 4.9,
      instructor: "Dr. Yangchen Dolma",
      image: "https://images.unsplash.com/photo-1704797390836-5dd5e0951832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1vbmFzdGVyeSUyMGludGVyaW9yJTIwbXVyYWxzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Monastery Architecture Through Ages",
      duration: "1 hour",
      level: "Intermediate",
      participants: 156,
      rating: 4.8,
      instructor: "Architect Sonam Wangdi",
      image: "https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "Digital Heritage Documentation",
      duration: "2 hours",
      level: "Advanced",
      participants: 89,
      rating: 4.9,
      instructor: "Tech Team Monastery360",
      image: "https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1hbnVzY3JpcHRzJTIwYW5jaWVudCUyMHRleHRzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case "stories":
        return (
          <div className="space-y-6">
            {communityStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={story.avatar} alt={story.author} />
                        <AvatarFallback>{story.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{story.author}</h4>
                          <Badge variant="outline" className="text-xs border-[var(--monastery-gold)]/50">
                            {story.role}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{story.location}</span>
                          <span>•</span>
                          <span>{story.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">{story.story}</p>
                    
                    <div 
                      className="w-full h-64 bg-cover bg-center rounded-lg mb-4"
                      style={{ backgroundImage: `url(${story.image})` }}
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-[var(--monastery-maroon)]">
                          <Heart className="w-4 h-4 mr-2" />
                          {story.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-[var(--monastery-maroon)]">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {story.comments}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-[var(--monastery-maroon)]">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        );
      
      case "archivists":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalArchivists.map((archivist, index) => (
              <motion.div
                key={archivist.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={archivist.avatar} alt={archivist.name} />
                      <AvatarFallback>{archivist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <h3 className="font-semibold mb-1">{archivist.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Age {archivist.age} • {archivist.location}</p>
                    
                    <Badge className="bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white border-none mb-3">
                      <Award className="w-3 h-3 mr-1" />
                      {archivist.achievement}
                    </Badge>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Expertise:</span>
                        <span className="font-medium">{archivist.expertise}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contributions:</span>
                        <span className="font-medium">{archivist.contributions}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-4">{archivist.bio}</p>
                    
                    <Button size="sm" className="w-full bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white">
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        );
      
      case "volunteers":
        return (
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-[var(--monastery-maroon)]/10 to-[var(--monastery-saffron)]/10 border-2 border-[var(--monastery-gold)]/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[var(--monastery-maroon)] to-[var(--monastery-saffron)] rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3>Join Our Digital Heritage Mission</h3>
                    <p className="text-sm text-muted-foreground font-normal">Empower local youth as digital archivists and cultural ambassadors</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Learn Digital Photography</h4>
                    <p className="text-sm text-muted-foreground">Master 360° photography, drone operation, and high-resolution scanning techniques</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[var(--monastery-gold)] to-[var(--monastery-emerald)] rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Cultural Education</h4>
                    <p className="text-sm text-muted-foreground">Deep dive into Buddhist art, architecture, and spiritual practices with expert mentors</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[var(--monastery-emerald)] to-[var(--monastery-maroon)] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Earn Recognition</h4>
                    <p className="text-sm text-muted-foreground">Get certified as a Digital Heritage Ambassador with official recognition</p>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <Button size="lg" className="bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white px-8">
                    Apply to Volunteer Program
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">Applications open for ages 16-30 • No experience required</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Volunteer Success Stories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3">Success Stories</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                        <AvatarFallback>KL</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">"The program helped me discover my passion for photography while preserving our heritage."</p>
                        <p className="text-xs text-muted-foreground mt-1">- Karma Lepcha, Volunteer</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" />
                        <AvatarFallback>PC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">"I learned valuable tech skills while contributing to something meaningful for our community."</p>
                        <p className="text-xs text-muted-foreground mt-1">- Pema Choden, Digital Archivist</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3">Program Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Active Volunteers</span>
                      <span className="font-semibold">67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Artifacts Documented</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Hours Contributed</span>
                      <span className="font-semibold">2,890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monasteries Covered</span>
                      <span className="font-semibold">25</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case "learning":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <div 
                    className="h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${module.image})` }}
                  >
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <Badge className="bg-black/70 text-white border-none">
                        {module.level}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">{module.title}</h4>
                    
                    <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{module.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{module.participants}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Instructor: {module.instructor}</span>
                        <div className="flex items-center space-x-1">
                          <span>★</span>
                          <span>{module.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white">
                      <Video className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="bg-gradient-to-r from-[var(--monastery-maroon)] to-[var(--monastery-emerald)] text-white border-none px-4 py-2 mb-4">
            <Users className="w-4 h-4 mr-2" />
            Community & Empowerment
          </Badge>
          <h1 className="text-4xl md:text-5xl mb-4">Building Cultural Guardians</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering local communities to become digital heritage ambassadors, preserving Sikkim's spiritual legacy for future generations.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={selectedTab === tab.id ? "default" : "outline"}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedTab === tab.id 
                    ? 'bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white border-none' 
                    : 'border-[var(--monastery-gold)]/30 hover:bg-[var(--monastery-gold)]/10'
                } transition-all duration-200`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}