import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart } from "lucide-react";

export function Footer() {
  const exploreLinks = [
    { label: "Virtual Tours", href: "/virtual-tour" },
    { label: "Interactive Map", href: "/map" },
    { label: "Digital Archive", href: "/archive" },
    { label: "Audio Guide", href: "/audio-guide" }
  ];

  const communityLinks = [
    { label: "Cultural Calendar", href: "/calendar" },
    { label: "Join Community", href: "/community" },
    { label: "Future Features", href: "/future" },
    { label: "Volunteer Program", href: "/volunteer" }
  ];

  const connectLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#8B0000] to-[#FF8C00] bg-clip-text text-transparent mb-4">Monastery360</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Preserving and sharing Sikkim's sacred heritage through immersive digital experiences.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 text-[#FF8C00] flex-shrink-0" />
                <span className="text-sm">Sikkim, India</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-[#FF8C00] flex-shrink-0" />
                <span className="text-sm">info@monastery360.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 text-[#FF8C00] flex-shrink-0" />
                <span className="text-sm">+91 XXX XXX XXXX</span>
              </div>
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#FF8C00] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Community</h4>
            <ul className="space-y-3">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#FF8C00] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Connect</h4>
            <ul className="space-y-3 mb-6">
              {connectLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-600 dark:text-gray-400 hover:text-[#FF8C00] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Follow Us</p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-8 h-8 bg-gray-100 dark:bg-white rounded-full flex items-center justify-center hover:bg-[#FF8C00] hover:text-white transition-all duration-300 transform hover:scale-110 text-gray-600 dark:text-black"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex justify-center items-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <span>&copy; {new Date().getFullYear()} Monastery360. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}