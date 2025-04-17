
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  features: string[];
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land';
  listingType: 'sale' | 'rent';
  yearBuilt: number;
  isFeatured: boolean;
}

export const properties: Property[] = [
  {
    id: "prop-1",
    title: "Modern Oceanview Villa",
    address: "123 Coastal Drive",
    city: "Malibu",
    state: "CA",
    zipCode: "90265",
    price: 3250000,
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4200,
    description: "Breathtaking oceanfront villa with panoramic views, gourmet kitchen, and private beach access. This stunning property features floor-to-ceiling windows, a spacious outdoor entertainment area, and a luxurious master suite with a spa-like bathroom.",
    features: ["Ocean View", "Swimming Pool", "Home Theater", "Wine Cellar", "Smart Home", "Private Beach Access"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
    ],
    coordinates: {
      lat: 34.0259,
      lng: -118.7798
    },
    propertyType: "house",
    listingType: "sale",
    yearBuilt: 2018,
    isFeatured: true
  },
  {
    id: "prop-2",
    title: "Downtown Luxury Penthouse",
    address: "888 Financial District",
    city: "New York",
    state: "NY",
    zipCode: "10004",
    price: 5750000,
    bedrooms: 3,
    bathrooms: 3.5,
    squareFeet: 3100,
    description: "Exclusive penthouse with stunning city views, private elevator, and rooftop terrace. Features include custom Italian cabinetry, marble countertops, hardwood floors throughout, and a state-of-the-art smart home system.",
    features: ["City View", "Private Elevator", "Doorman", "Gym", "Rooftop Terrace", "Smart Home"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
    ],
    coordinates: {
      lat: 40.7033,
      lng: -74.0170
    },
    propertyType: "condo",
    listingType: "sale",
    yearBuilt: 2015,
    isFeatured: true
  },
  {
    id: "prop-3",
    title: "Charming Suburban Home",
    address: "456 Maple Avenue",
    city: "Austin",
    state: "TX",
    zipCode: "78704",
    price: 875000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    description: "Beautiful family home in a quiet neighborhood with updated kitchen, spacious backyard, and newly renovated bathrooms. Features include hardwood floors, granite countertops, stainless steel appliances, and a cozy fireplace.",
    features: ["Renovated Kitchen", "Backyard", "Garage", "Fireplace", "Hardwood Floors"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
    ],
    coordinates: {
      lat: 30.2500,
      lng: -97.7500
    },
    propertyType: "house",
    listingType: "sale",
    yearBuilt: 2005,
    isFeatured: false
  },
  {
    id: "prop-4",
    title: "Modern City Apartment",
    address: "789 Urban Street, Unit 12B",
    city: "Chicago",
    state: "IL",
    zipCode: "60611",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    description: "Stylish apartment in the heart of downtown with floor-to-ceiling windows and modern amenities. Building features include 24-hour doorman, fitness center, and rooftop lounge with stunning city views.",
    features: ["City View", "Doorman", "Gym", "Rooftop Lounge", "In-unit Laundry"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1596204976717-1a9ff47f74ef?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
    ],
    coordinates: {
      lat: 41.8954,
      lng: -87.6246
    },
    propertyType: "apartment",
    listingType: "rent",
    yearBuilt: 2017,
    isFeatured: true
  },
  {
    id: "prop-5",
    title: "Rustic Mountain Retreat",
    address: "321 Pine Trail",
    city: "Aspen",
    state: "CO",
    zipCode: "81611",
    price: 2950000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3600,
    description: "Stunning log cabin with breathtaking mountain views, vaulted ceilings, and stone fireplace. Perfect for year-round outdoor activities with ski-in/ski-out access in winter and hiking trails in summer.",
    features: ["Mountain View", "Fireplace", "Ski-in/Ski-out", "Hot Tub", "Wood Beams"],
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
    ],
    coordinates: {
      lat: 39.1911,
      lng: -106.8175
    },
    propertyType: "house",
    listingType: "sale",
    yearBuilt: 2010,
    isFeatured: false
  },
  {
    id: "prop-6",
    title: "Waterfront Townhouse",
    address: "555 Harbor View",
    city: "San Francisco",
    state: "CA",
    zipCode: "94133",
    price: 1850000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2100,
    description: "Elegant townhouse with unobstructed bay views, remodeled kitchen, and private patio. Located in a prime location near shops, restaurants, and public transportation.",
    features: ["Water View", "Patio", "Updated Kitchen", "Hardwood Floors", "Garage"],
    images: [
      "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1574739782594-db4ead022697?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
    ],
    coordinates: {
      lat: 37.8025,
      lng: -122.4051
    },
    propertyType: "townhouse",
    listingType: "sale",
    yearBuilt: 2003,
    isFeatured: false
  },
  {
    id: "prop-7",
    title: "Historic Brownstone",
    address: "222 Heritage Row",
    city: "Boston",
    state: "MA",
    zipCode: "02108",
    price: 3100000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3300,
    description: "Beautifully restored historic brownstone with original details and modern updates. Features include crown moldings, original hardwood floors, gourmet kitchen, and private garden.",
    features: ["Historic Details", "Garden", "Fireplace", "Crown Molding", "Basement"],
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
    ],
    coordinates: {
      lat: 42.3584,
      lng: -71.0598
    },
    propertyType: "townhouse",
    listingType: "sale",
    yearBuilt: 1890,
    isFeatured: true
  },
  {
    id: "prop-8",
    title: "Luxury Beach Condo",
    address: "777 Ocean Avenue, Unit 15",
    city: "Miami",
    state: "FL",
    zipCode: "33139",
    price: 6500,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    description: "Luxurious beachfront condo with panoramic ocean views and high-end finishes. Building amenities include infinity pool, fitness center, spa, and 24-hour security.",
    features: ["Ocean View", "Pool", "Gym", "Spa", "Security", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1560185008-a33f5c5ad2c0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      "https://images.unsplash.com/photo-1628133287836-40bd5453bed1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"
    ],
    coordinates: {
      lat: 25.7867,
      lng: -80.1300
    },
    propertyType: "condo",
    listingType: "rent",
    yearBuilt: 2019,
    isFeatured: false
  }
];

export function formatPrice(price: number, isRental: boolean = false): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(price) + (isRental ? '/month' : '');
}

export function getFilteredProperties(filters: {
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
  propertyType?: Property['propertyType'][];
  listingType?: Property['listingType'];
}) {
  return properties.filter(property => {
    // Filter by price
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    
    // Filter by bedrooms
    if (filters.minBeds && property.bedrooms < filters.minBeds) return false;
    
    // Filter by bathrooms
    if (filters.minBaths && property.bathrooms < filters.minBaths) return false;
    
    // Filter by property type
    if (filters.propertyType && filters.propertyType.length > 0 && 
        !filters.propertyType.includes(property.propertyType)) return false;
    
    // Filter by listing type
    if (filters.listingType && property.listingType !== filters.listingType) return false;
    
    return true;
  });
}
