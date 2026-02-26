import type { VercelRequest, VercelResponse } from '@vercel/node';

const monasteries = [
    {
        id: 1,
        name: "Rumtek Monastery",
        location: "Gangtok, Sikkim, India",
        coordinates: { lat: 27.2837, lng: 88.5635 },
        description: "The largest monastery in Sikkim, also known as Dharmachakra Centre",
        established: 1740,
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free",
        bestTime: "March to May, September to November",
        images: ["rumtek1.jpg", "rumtek2.jpg"]
    },
    {
        id: 2,
        name: "Pemayangtse Monastery",
        location: "Pelling, Sikkim, India",
        coordinates: { lat: 27.3042, lng: 88.2521 },
        description: "Ancient premier monastery of the Nyingma order",
        established: 1705,
        visitingHours: "6:00 AM - 6:00 PM",
        entryFee: "Free",
        bestTime: "October to May",
        images: ["pemayangtse1.jpg", "pemayangtse2.jpg"]
    },
    {
        id: 3,
        name: "Tawang Monastery",
        location: "Tawang, Arunachal Pradesh, India",
        coordinates: { lat: 27.5862, lng: 91.8674 },
        description: "The largest monastery in India and second largest in the world",
        established: 1680,
        visitingHours: "5:00 AM - 8:00 PM",
        entryFee: "Free",
        bestTime: "April to October",
        images: ["tawang1.jpg", "tawang2.jpg"]
    }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(monasteries);
}
