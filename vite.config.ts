
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Mock data for monasteries
const mockMonasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    location: "Gangtok",
    coordinates: { lat: 27.3023, lng: 88.5638 },
    description: "One of the largest and most significant monasteries in Sikkim",
    images: ["rumtek1.jpg", "rumtek2.jpg"],
    established: 1740
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    location: "Pelling",
    coordinates: { lat: 27.3042, lng: 88.2521 },
    description: "Ancient premier monastery of the Nyingma order",
    images: ["pemayangtse1.jpg", "pemayangtse2.jpg"],
    established: 1705
  }
];

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'mock-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/monasteries') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(mockMonasteries));
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
    // Configure server to serve video files with proper MIME types
    middlewareMode: false,
    fs: {
      strict: false
    }
  },
  // Configure asset handling for video files
  assetsInclude: ['**/*.mkv', '**/*.mp4', '**/*.webm', '**/*.ogg'],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'vaul': 'vaul',
      'sonner': 'sonner',
      'recharts': 'recharts',
      'react-resizable-panels': 'react-resizable-panels',
      'react-hook-form': 'react-hook-form',
      'react-day-picker': 'react-day-picker',
      'next-themes': 'next-themes',
      'lucide-react': 'lucide-react',
      'input-otp': 'input-otp',
      'embla-carousel-react': 'embla-carousel-react',
      'cmdk': 'cmdk',
      'class-variance-authority': 'class-variance-authority',
      '@radix-ui/react-tooltip': '@radix-ui/react-tooltip',
      '@radix-ui/react-toggle': '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group': '@radix-ui/react-toggle-group',
      '@radix-ui/react-tabs': '@radix-ui/react-tabs',
      '@radix-ui/react-switch': '@radix-ui/react-switch',
      '@radix-ui/react-slot': '@radix-ui/react-slot',
      '@radix-ui/react-slider': '@radix-ui/react-slider',
      '@radix-ui/react-separator': '@radix-ui/react-separator',
      '@radix-ui/react-select': '@radix-ui/react-select',
      '@radix-ui/react-scroll-area': '@radix-ui/react-scroll-area',
      '@radix-ui/react-radio-group': '@radix-ui/react-radio-group',
      '@radix-ui/react-progress': '@radix-ui/react-progress',
      '@radix-ui/react-popover': '@radix-ui/react-popover',
      '@radix-ui/react-navigation-menu': '@radix-ui/react-navigation-menu',
      '@radix-ui/react-menubar': '@radix-ui/react-menubar',
      '@radix-ui/react-label': '@radix-ui/react-label',
      '@radix-ui/react-hover-card': '@radix-ui/react-hover-card',
      '@radix-ui/react-dropdown-menu': '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog': '@radix-ui/react-dialog',
      '@radix-ui/react-context-menu': '@radix-ui/react-context-menu',
      '@radix-ui/react-collapsible': '@radix-ui/react-collapsible',
      '@radix-ui/react-checkbox': '@radix-ui/react-checkbox',
      '@radix-ui/react-avatar': '@radix-ui/react-avatar',
      '@radix-ui/react-aspect-ratio': '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-alert-dialog': '@radix-ui/react-alert-dialog',
      '@radix-ui/react-accordion': '@radix-ui/react-accordion',
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
});