import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { MapPin, Search, Filter, Car, Hotel, Calendar, Star, Clock, Mountain } from "lucide-react";
import { useState, useEffect } from "react";
import GoogleMapView from "./GoogleMapView";

interface Monastery {
  id: number;
  name: string;
  location: string;
  century: string;
  description: string;
  image: string;
  coordinates: { x: number; y: number };
  rating: number;
  festivals: string[];
  established: number;
}

export function MapPage() {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      // Clear any map-related resources
      const scripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      location: "Gangtok",
      century: "16th Century",
      description: "The largest and most significant monastery in Sikkim",
      image: "https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      coordinates: { x: 45, y: 55 },
      rating: 4.9,
      festivals: ["Losoong", "Buddha Purnima"],
      established: 1966
    },
    {
      id: 2,
      name: "Enchey Monastery",
      location: "Gangtok",
      century: "19th Century",
      description: "Sacred Nyingma monastery with 200-year heritage",
      image: "https://images.unsplash.com/photo-1704797390836-5dd5e0951832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1vbmFzdGVyeSUyMGludGVyaW9yJTIwbXVyYWxzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      coordinates: { x: 50, y: 45 },
      rating: 4.7,
      festivals: ["Cham Dance", "Drupka Teshi"],
      established: 1840
    },
    {
      id: 3,
      name: "Pemayangtse Monastery",
      location: "Pelling",
      century: "17th Century",
      description: "One of the oldest and premier monasteries of Sikkim",
      image: "https://images.unsplash.com/photo-1611955166156-9ae5e948c6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaWJldGFuJTIwcHJheWVyJTIwZmxhZ3MlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      coordinates: { x: 25, y: 40 },
      rating: 4.8,
      festivals: ["Pang Lhabsol", "Dussera"],
      established: 1705
    },
    {
      id: 4,
      name: "Tashiding Monastery",
      location: "West Sikkim",
      century: "17th Century",
      description: "Sacred site on the holy hill between two rivers",
      image: "https://images.unsplash.com/photo-1643442240897-c3286093d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      coordinates: { x: 30, y: 60 },
      rating: 4.6,
      festivals: ["Bhumchu", "Losar"],
      established: 1717
    },
    {
      id: 5,
      name: "Dubdi Monastery",
      location: "Yuksom",
      century: "17th Century",
      description: "The first monastery built in Sikkim",
      image: "https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1hbnVzY3JpcHRzJTIwYW5jaWVudCUyMHRleHRzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      coordinates: { x: 20, y: 50 },
      rating: 4.5,
      festivals: ["Saga Dawa", "Drukpa Teshi"],
      established: 1701
    }
  ];

  const filters = [
    { id: "all", label: "All Monasteries", icon: Mountain },
    { id: "location", label: "By Location", icon: MapPin },
    { id: "century", label: "By Century", icon: Clock },
    { id: "festival", label: "By Festival", icon: Calendar }
  ];

  const filteredMonasteries = monasteries; // In a real app, this would filter based on activeFilter

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="bg-gradient-to-r from-[var(--monastery-emerald)] to-[var(--monastery-maroon)] text-white border-none px-4 py-2 mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            Interactive Heritage Map
          </Badge>
          <h1 className="text-4xl md:text-5xl mb-4">Explore Sacred Sites</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the spiritual landscape of Sikkim through our interactive monastery map.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search monasteries by name, location, or century..."
                className="pl-10 bg-white/70 backdrop-blur-sm border-[var(--monastery-gold)]/30"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`whitespace-nowrap ${
                      activeFilter === filter.id 
                        ? 'bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white' 
                        : 'border-[var(--monastery-gold)]/30'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="h-[600px] w-full rounded-xl overflow-hidden bg-[#E5E3DF] border-2 border-[var(--monastery-gold)]/30 shadow-lg">
                <GoogleMapView 
                  selectedName={selectedMonastery?.name || filteredMonasteries[0]?.name}
                  markers={monasteries.map(m => ({
                    id: m.id,
                    position: { lat: m.coordinates.x, lng: m.coordinates.y },
                    title: m.name
                  }))}
                />
            </div>
          </motion.div>

          {/* Monastery List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Sacred Sites ({filteredMonasteries.length})</h3>
              <Button size="sm" variant="outline" className="border-[var(--monastery-gold)]/30">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
              {filteredMonasteries.map((monastery) => (
                <motion.div
                  key={monastery.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: monastery.id * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedMonastery?.id === monastery.id 
                        ? 'ring-2 ring-[var(--monastery-gold)] bg-gradient-to-r from-[var(--monastery-saffron)]/10 to-[var(--monastery-gold)]/10' 
                        : 'bg-white/70 backdrop-blur-sm'
                    }`}
                    onClick={() => setSelectedMonastery(monastery)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex space-x-3">
                        <div 
                          className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${monastery.image})` }}
                        />
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm mb-1">{monastery.name}</CardTitle>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{monastery.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Est. {monastery.established}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{monastery.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{monastery.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {monastery.festivals.slice(0, 2).map((festival, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs px-2 py-0 border-[var(--monastery-gold)]/50">
                            {festival}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" className="flex-1 text-xs h-7 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white">
                          <Car className="w-3 h-3 mr-1" />
                          Book Ride
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-xs h-7 border-[var(--monastery-gold)]/30">
                          <Hotel className="w-3 h-3 mr-1" />
                          Hotels
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}