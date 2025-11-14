import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Clock, Users, ExternalLink, Bell, Plus, Filter } from "lucide-react";
import { useState } from "react";

export function CulturalCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Events", color: "from-[var(--monastery-maroon)] to-[var(--monastery-saffron)]" },
    { id: "festivals", label: "Sacred Festivals", color: "from-[var(--monastery-saffron)] to-[var(--monastery-gold)]" },
    { id: "ceremonies", label: "Daily Ceremonies", color: "from-[var(--monastery-gold)] to-[var(--monastery-emerald)]" },
    { id: "meditation", label: "Meditation Sessions", color: "from-[var(--monastery-emerald)] to-[var(--monastery-maroon)]" }
  ];

  const events = [
    {
      id: 1,
      title: "Losoong Festival",
      date: "2025-01-15",
      time: "06:00 AM",
      duration: "3 days",
      monastery: "Rumtek Monastery",
      category: "festivals",
      description: "Celebrate the end of harvest season with traditional Bhutia and Lepcha dances",
      image: "https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      participants: 500,
      isUpcoming: true,
      canJoin: true
    },
    {
      id: 2,
      title: "Morning Prayer Ceremony",
      date: "2025-01-08",
      time: "05:30 AM",
      duration: "2 hours",
      monastery: "Enchey Monastery",
      category: "ceremonies",
      description: "Daily morning prayers and chanting session open to visitors",
      image: "https://images.unsplash.com/photo-1704797390836-5dd5e0951832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1vbmFzdGVyeSUyMGludGVyaW9yJTIwbXVyYWxzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      participants: 50,
      isUpcoming: false,
      canJoin: true
    },
    {
      id: 3,
      title: "Buddha Purnima Celebration",
      date: "2025-05-12",
      time: "04:00 AM",
      duration: "Full day",
      monastery: "Pemayangtse Monastery",
      category: "festivals",
      description: "Commemorate the birth, enlightenment, and death of Buddha",
      image: "https://images.unsplash.com/photo-1611955166156-9ae5e948c6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaWJldGFuJTIwcHJheWVyJTIwZmxhZ3MlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      participants: 1200,
      isUpcoming: true,
      canJoin: true
    },
    {
      id: 4,
      title: "Meditation Workshop",
      date: "2025-01-10",
      time: "02:00 PM",
      duration: "3 hours",
      monastery: "Tashiding Monastery",
      category: "meditation",
      description: "Learn traditional Tibetan meditation techniques from experienced monks",
      image: "https://images.unsplash.com/photo-1643442240897-c3286093d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      participants: 25,
      isUpcoming: true,
      canJoin: true
    },
    {
      id: 5,
      title: "Cham Dance Performance",
      date: "2025-02-20",
      time: "10:00 AM",
      duration: "4 hours",
      monastery: "Dubdi Monastery",
      category: "festivals",
      description: "Traditional masked dance performances representing spiritual teachings",
      image: "https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1hbnVzY3JpcHRzJTIwYW5jaWVudCUyMHRleHRzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      participants: 300,
      isUpcoming: true,
      canJoin: true
    },
    {
      id: 6,
      title: "Evening Prayers",
      date: "2025-01-07",
      time: "06:00 PM",
      duration: "1.5 hours",
      monastery: "Rumtek Monastery",
      category: "ceremonies",
      description: "Daily evening prayers with butter lamp lighting ceremony",
      image: "https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      participants: 75,
      isUpcoming: false,
      canJoin: true
    }
  ];

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const eventDates = events.map(event => new Date(event.date));

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="bg-gradient-to-r from-[var(--monastery-emerald)] to-[var(--monastery-gold)] text-white border-none px-4 py-2 mb-4">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Cultural Calendar
          </Badge>
          <h1 className="text-4xl md:text-5xl mb-4">Sacred Events & Festivals</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join authentic cultural celebrations, daily ceremonies, and spiritual gatherings across Sikkim's monasteries.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                selectedCategory === category.id 
                  ? `bg-gradient-to-r ${category.color} text-white border-none` 
                  : 'border-[var(--monastery-gold)]/30 hover:bg-[var(--monastery-gold)]/10'
              } transition-all duration-200`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-white/70 backdrop-blur-sm border-[var(--monastery-gold)]/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Event Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-none"
                  modifiers={{
                    eventDay: eventDates
                  }}
                  modifiersStyles={{
                    eventDay: {
                      backgroundColor: 'var(--monastery-saffron)',
                      color: 'white',
                      borderRadius: '50%'
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-[var(--monastery-maroon)]/10 to-[var(--monastery-saffron)]/10">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white">
                  <Bell className="w-4 h-4 mr-2" />
                  Set Event Reminders
                </Button>
                <Button variant="outline" className="w-full border-[var(--monastery-gold)]/30">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Google Calendar
                </Button>
                <Button variant="outline" className="w-full border-[var(--monastery-gold)]/30">
                  <Filter className="w-4 h-4 mr-2" />
                  Custom Filters
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Highlights */}
            <Card className="bg-gradient-to-br from-[var(--monastery-emerald)]/10 to-[var(--monastery-maroon)]/10">
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.filter(e => e.isUpcoming).slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Events List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">
                {selectedCategory === "all" ? "All Events" : categories.find(c => c.id === selectedCategory)?.label}
                <span className="text-muted-foreground ml-2">({filteredEvents.length})</span>
              </h3>
              <Button variant="outline" className="border-[var(--monastery-gold)]/30">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Date
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-border hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative">
                      <div 
                        className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${event.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        <div className="absolute top-3 left-3 space-y-2">
                          <Badge className={`${
                            event.isUpcoming 
                              ? 'bg-gradient-to-r from-[var(--monastery-emerald)] to-[var(--monastery-gold)]' 
                              : 'bg-gray-500'
                          } text-white border-none`}>
                            {event.isUpcoming ? 'Upcoming' : 'Past'}
                          </Badge>
                          <Badge className="bg-black/70 text-white border-none">
                            {event.category}
                          </Badge>
                        </div>
                        
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{event.monastery}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Duration: </span>
                            <span className="font-semibold">{event.duration}</span>
                          </div>
                          
                          {event.canJoin && event.isUpcoming && (
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white hover:opacity-90"
                            >
                              Join Event
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 border-[var(--monastery-gold)]/30 text-xs"
                          >
                            <ExternalLink className="w-3 h-3 mr-2" />
                            Details
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 border-[var(--monastery-gold)]/30 text-xs"
                          >
                            <Plus className="w-3 h-3 mr-2" />
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center pt-8"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[var(--monastery-gold)]/30 hover:bg-[var(--monastery-gold)]/10"
              >
                Load More Events
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Showing {filteredEvents.length} of 47 upcoming events
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}