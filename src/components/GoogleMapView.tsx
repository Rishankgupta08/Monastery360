import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface LatLng {
  lat: number;
  lng: number;
}

interface GoogleMapViewProps {
  selectedName?: string;
  defaultCenter?: LatLng;
  markers?: Array<{ id: number | string; position: LatLng; title?: string }>;
}

const mapStyle: google.maps.MapTypeStyle[] = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      { hue: "#B6A169" },
      { saturation: -15 },
      { lightness: 5 }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      { hue: "#005C97" },
      { saturation: 30 },
      { lightness: 10 }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      { saturation: -70 }
    ]
  }
];

export default function GoogleMapView({
  selectedName,
  defaultCenter = { lat: 27.3389, lng: 88.6065 },
  markers = []
}: GoogleMapViewProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey });
  const [center, setCenter] = useState<LatLng>(defaultCenter);

  useEffect(() => {
    async function geocodeAddress() {
      if (!isLoaded || !selectedName || !window.google?.maps) return;
      try {
        const geocoder = new window.google.maps.Geocoder();
        const result = await geocoder.geocode({ address: selectedName + ", Sikkim, India" });
        if (result.results && result.results[0]) {
          const loc = result.results[0].geometry.location;
          setCenter({ lat: loc.lat(), lng: loc.lng() });
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    }
    geocodeAddress();
  }, [isLoaded, selectedName]);

  if (!apiKey) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center rounded-xl border-2 border-[var(--monastery-gold)]/30 bg-card text-sm text-muted-foreground">
        Set VITE_GOOGLE_MAPS_API_KEY in .env.local to enable the map
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[600px] w-full rounded-xl bg-card border-2 border-[var(--monastery-gold)]/30 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[var(--monastery-gold)]/30 border-t-[var(--monastery-gold)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden bg-[#E5E3DF]">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-full h-full"
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          backgroundColor: "#E5E3DF",
          styles: mapStyle
        }}
        onLoad={(map) => {
          map.setOptions({ backgroundColor: "#E5E3DF" });
        }}
      >
        {markers.map((m) => (
          <Marker
            key={m.id}
            position={m.position}
            title={m.title}
            animation={window.google?.maps.Animation.DROP}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
