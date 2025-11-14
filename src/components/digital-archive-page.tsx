import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { Search, Archive, Filter, Eye, Download, Share, BookOpen, Scroll, Image, Calendar } from "lucide-react";
import { useState } from "react";

export function DigitalArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Items", icon: Archive, count: 847 },
    { id: "manuscripts", label: "Manuscripts", icon: BookOpen, count: 234 },
    { id: "murals", label: "Sacred Murals", icon: Image, count: 156 },
    { id: "scrolls", label: "Prayer Scrolls", icon: Scroll, count: 189 },
    { id: "artifacts", label: "Ritual Artifacts", icon: Calendar, count: 268 }
  ];

  const archiveItems = [
    {
      id: 1,
      title: "Kangyur Manuscript Collection",
      category: "manuscripts",
      century: "17th Century",
      monastery: "Rumtek Monastery",
      description: "Complete Buddhist canon translated into Tibetan, featuring gold ink on handmade paper",
      image: "https://images.unsplash.com/photo-1752161670149-0967a8670b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1hbnVzY3JpcHRzJTIwYW5jaWVudCUyMHRleHRzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Buddhist Texts", "Gold Ink", "Sacred Literature"],
      resolution: "4K Digital Scan",
      downloads: 234
    },
    {
      id: 2,
      title: "Wheel of Life Mural",
      category: "murals",
      century: "16th Century",
      monastery: "Pemayangtse Monastery",
      description: "Intricate depiction of Buddhist cosmology and the cycle of existence",
      image: "https://images.unsplash.com/photo-1704797390836-5dd5e0951832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1vbmFzdGVyeSUyMGludGVyaW9yJTIwbXVyYWxzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Cosmology", "Tibetan Art", "Philosophy"],
      resolution: "8K Ultra HD",
      downloads: 456
    },
    {
      id: 3,
      title: "Medicine Buddha Thangka",
      category: "scrolls",
      century: "18th Century",
      monastery: "Enchey Monastery",
      description: "Traditional healing deity painted on silk with mineral pigments",
      image: "https://images.unsplash.com/photo-1611955166156-9ae5e948c6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaWJldGFuJTIwcHJheWVyJTIwZmxhZ3MlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Healing", "Thangka", "Silk Painting"],
      resolution: "6K Digital Capture",
      downloads: 178
    },
    {
      id: 4,
      title: "Ritual Bell and Dorje Set",
      category: "artifacts",
      century: "15th Century",
      monastery: "Tashiding Monastery",
      description: "Sacred bronze implements used in tantric ceremonies and meditation",
      image: "https://images.unsplash.com/photo-1621496770858-d9aacf27f513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSdW10ZWslMjBtb25hc3RlcnklMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Ritual Objects", "Bronze", "Tantric Buddhism"],
      resolution: "3D Model Available",
      downloads: 89
    },
    {
      id: 5,
      title: "Lotus Sutra Illumination",
      category: "manuscripts",
      century: "19th Century",
      monastery: "Dubdi Monastery",
      description: "Beautifully illuminated manuscript with traditional Tibetan calligraphy",
      image: "https://images.unsplash.com/photo-1643442240897-c3286093d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBTaWtraW18ZW58MXx8fHwxNzU3MjU3NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Calligraphy", "Illuminated Text", "Lotus Sutra"],
      resolution: "5K High Resolution",
      downloads: 167
    },
    {
      id: 6,
      title: "Protector Deity Mask",
      category: "artifacts",
      century: "17th Century",
      monastery: "Rumtek Monastery",
      description: "Ceremonial mask used in Cham dance performances during festivals",
      image: "https://images.unsplash.com/photo-1704797390836-5dd5e0951832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWRkaGlzdCUyMG1vbmFzdGVyeSUyMGludGVyaW9yJTIwbXVyYWxzfGVufDF8fHx8MTc1NzI1Nzc0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Dance Mask", "Festival", "Protection"],
      resolution: "4K + 3D Scan",
      downloads: 298
    }
  ];

  const filteredItems = selectedCategory === "all" 
    ? archiveItems 
    : archiveItems.filter(item => item.category === selectedCategory);

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
            <Archive className="w-4 h-4 mr-2" />
            Digital Heritage Archive
          </Badge>
          <h1 className="text-4xl md:text-5xl mb-4">Sacred Artifacts & Texts</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our digitally preserved collection of ancient manuscripts, sacred art, and ritual objects from Sikkim's monasteries.
          </p>
        </motion.div>

        {/* Search and Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, century, monastery, or theme..."
                className="pl-10 bg-white/70 backdrop-blur-sm border-[var(--monastery-gold)]/30"
              />
            </div>
            <Button variant="outline" className="border-[var(--monastery-gold)]/30">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Search
            </Button>
          </div>

          {/* AI Search Suggestion */}
          <div className="bg-gradient-to-r from-[var(--monastery-saffron)]/10 to-[var(--monastery-gold)]/10 p-4 rounded-lg border border-[var(--monastery-gold)]/30">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] rounded-lg flex items-center justify-center flex-shrink-0">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">AI-Powered Search</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Try searching with natural language: "Show me healing texts from the 18th century" or "Find artifacts used in festivals"
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Buddhist cosmology", "Healing practices", "Tantric rituals", "Festival masks"].map((suggestion) => (
                    <Button key={suggestion} size="sm" variant="ghost" className="text-xs h-6 px-2 text-[var(--monastery-maroon)] hover:bg-[var(--monastery-gold)]/20">
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="font-semibold mb-4">Browse by Category</h3>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full justify-start ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white' 
                      : 'text-foreground hover:bg-[var(--monastery-gold)]/10'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{category.label}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              );
            })}

            {/* Archive Stats */}
            <Card className="mt-6 bg-gradient-to-br from-[var(--monastery-maroon)]/10 to-[var(--monastery-emerald)]/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Archive Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Items</span>
                  <span className="font-semibold">847</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Digitized</span>
                  <span className="font-semibold">98.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monasteries</span>
                  <span className="font-semibold">25</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Archive Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">
                {selectedCategory === "all" ? "All Items" : categories.find(c => c.id === selectedCategory)?.label} 
                <span className="text-muted-foreground ml-2">({filteredItems.length})</span>
              </h3>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="border-[var(--monastery-gold)]/30">
                  Sort by Date
                </Button>
                <Button size="sm" variant="outline" className="border-[var(--monastery-gold)]/30">
                  Grid View
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group"
                >
                  <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-border hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <div 
                        className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        {/* Hover Overlay */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                          className="absolute inset-0 bg-black/70 flex items-center justify-center space-x-3"
                        >
                          <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </motion.div>
                        
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-black/70 text-white border-none">
                            {item.resolution}
                          </Badge>
                        </div>
                        
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white border-none">
                            {item.century}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2 group-hover:text-[var(--monastery-maroon)] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Archive className="w-3 h-3 mr-2" />
                          {item.monastery}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Download className="w-3 h-3 mr-2" />
                          {item.downloads} downloads
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs px-2 py-0 border-[var(--monastery-gold)]/50">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs px-2 py-0 border-[var(--monastery-gold)]/50">
                            +{item.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white hover:opacity-90">
                          <Eye className="w-3 h-3 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="border-[var(--monastery-gold)]/30">
                          <Share className="w-3 h-3" />
                        </Button>
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
              className="text-center mt-8"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[var(--monastery-gold)]/30 hover:bg-[var(--monastery-gold)]/10"
              >
                Load More Items
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Showing {filteredItems.length} of {categories.find(c => c.id === selectedCategory)?.count || 847} items
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}