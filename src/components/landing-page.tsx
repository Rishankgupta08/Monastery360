import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion"; // Note: The original code imported from "motion/react", which is less common. "framer-motion" is the standard. I've kept the original import path.
import { Play, MapPin, Archive, Headphones, Calendar, ArrowRight, Eye, Globe, Mic, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Eye,
      title: "Virtual Tours",
      description: "Immersive 360° experiences of sacred spaces",
      gradient: "from-[var(--monastery-maroon)] to-[var(--monastery-saffron)]",
      link: "/virtual-tour"
    },
    {
      icon: Archive,
      title: "Digital Archive",
      description: "Ancient manuscripts and sacred art collection",
      gradient: "from-[var(--monastery-saffron)] to-[var(--monastery-gold)]",
      link: "/archive"
    },
    {
      icon: Mic,
      title: "Smart Audio Guide",
      description: "Multi-language narrated spiritual journeys",
      gradient: "from-[var(--monastery-gold)] to-[var(--monastery-emerald)]",
      link: "/audio-guide"
    },
    {
      icon: Calendar,
      title: "Cultural Calendar",
      description: "Sacred festivals and ceremonial events",
      gradient: "from-[var(--monastery-emerald)] to-[var(--monastery-maroon)]",
      link: "/calendar"
    }
  ];

  const stats = [
    { number: "25+", label: "Sacred Monasteries" },
    { number: "500+", label: "Digital Artifacts" },
    { number: "12", label: "Languages Supported" },
    { number: "1000+", label: "Years of Heritage" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 0, 0, 0.3), rgba(139, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        />


        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h1 className="text-5xl leading-tight md:text-7xl">
              Digitize & Experience the{" "}
              <span className="bg-gradient-to-r from-[var(--monastery-gold)] to-[var(--monastery-snow)] bg-clip-text text-transparent">
                Spirit
              </span>{" "}
              of Sikkim's Monasteries
            </h1>

            <p className="max-w-2xl mx-auto text-xl leading-relaxed text-gray-200 md:text-2xl">
              Journey through centuries of Buddhist heritage with immersive virtual experiences, ancient wisdom, and sacred traditions preserved for generations.
            </p>

            <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
              <button
                onClick={() => { navigate('/virtual-tour'); window.scrollTo(0, 0); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                  background: 'linear-gradient(to right, #FF8C00, #FFD700)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                className="hero-button hover:opacity-90"
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.opacity = '0.9')}
                onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.opacity = '1')}
              >
                <Play className="w-5 h-5" style={{ flexShrink: 0, marginRight: 0 }} />
                Start Virtual Tour
              </button>

              <button
                onClick={() => { navigate('/map'); window.scrollTo(0, 0); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                  background: 'linear-gradient(to right, #FF8C00, #FFD700)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                className="hero-button hover:opacity-90"
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.opacity = '0.9')}
                onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.opacity = '1')}
              >
                <MapPin className="w-5 h-5" style={{ flexShrink: 0, marginRight: 0 }} />
                Explore Monasteries
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute text-white transform -translate-x-1/2 bottom-10 left-1/2 opacity-60"
        />
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[var(--monastery-maroon)] to-[var(--monastery-saffron)] py-16 text-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-2 text-4xl font-bold md:text-5xl">{stat.number}</div>
                <div className="text-sm opacity-90 md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <Badge className="mb-4 border-none bg-gradient-to-r from-[var(--monastery-emerald)] to-[var(--monastery-maroon)] px-4 py-2 text-white">
              Platform Features
            </Badge>
            <h2 className="mb-6 text-4xl text-gray-900 md:text-5xl dark:text-white">
              Immersive Heritage Experiences
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Discover the sacred traditions of Sikkim through cutting-edge technology and authentic cultural preservation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="cursor-pointer group"
                  onClick={() => { navigate(feature.link); window.scrollTo(0, 0); }}
                >
                  <Card 
                    className="h-full transition-all duration-300 feature-card hover:shadow-xl" 
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#e5e7eb'
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 rounded-full group-hover:scale-110"
                        style={{ backgroundColor: 'rgba(255, 140, 0, 0.1)' }}>
                        <Icon className="w-8 h-8" style={{ color: '#FF8C00' }} />
                      </div>
                      <h3 
                        className="mb-2 text-xl font-semibold"
                        style={{ color: '#111827' }}
                      >
                        {feature.title}
                      </h3>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: '#4b5563' }}
                      >
                        {feature.description}
                      </p>
                      <ArrowRight 
                        className="w-4 h-4 mx-auto mt-4 transition-opacity opacity-0 group-hover:opacity-100" 
                        style={{ color: '#FF8C00' }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="relative py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 139, 34, 0.8), rgba(139, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1643442240897-c3286093d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container px-4 mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="mb-6 text-4xl md:text-5xl">
              Begin Your Sacred Journey
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Connect with the timeless wisdom and spiritual heritage of Sikkim's monastic traditions through our immersive digital platform.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <div className="flex justify-center gap-4">
                <div className="inline-block transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 hover:shadow-2xl">
                  <Button
                    onClick={() => { navigate('/community'); window.scrollTo(0, 0); }}
                    size="lg"
                    className="flex items-center justify-center gap-2 whitespace-nowrap border-none bg-gradient-to-r from-[#FFD700] to-[#FF8C00] px-8 py-4 text-lg font-semibold text-white hover:opacity-90"
                  >
                    <Users className="flex-shrink-0 w-5 h-5" />
                    <span>Join Our Community</span>
                  </Button>
                </div>

                <div className="inline-block transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 hover:shadow-2xl">
                  <Button
                    onClick={() => { navigate('/archive'); window.scrollTo(0, 0); }}
                    size="lg"
                    className="flex items-center justify-center gap-2 whitespace-nowrap border-none bg-gradient-to-r from-[#FFD700] to-[#FF8C00] px-8 py-4 text-lg font-semibold text-white hover:opacity-90"
                  >
                    <Archive className="flex-shrink-0 w-5 h-5" />
                    <span>Explore Archive</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}