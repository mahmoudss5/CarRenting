export const CURRENT_USER = {
  name: 'Alex Harrison',
  email: 'alex.harrison@example.com',
  tier: 'Premium Renter',
  tierVariant: 'electric',
  initials: 'AH',
  licenseStatus: 'pending', // 'verified' | 'pending'
  stats: {
    totalTrips: 14,
    joinDate: "Feb '23",
  },
};

export const PENDING_BOOKINGS = [
  {
    id: 'DS-55821',
    status: 'pending',
    car: {
      name: 'Tesla Model S Plaid',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&q=80',
      pricePerDay: 195,
    },
    startDate: '2024-11-08',
    endDate: '2024-11-11',
    location: 'Los Angeles, CA',
    total: 700.85,
    submittedAt: 'Oct 28, 2024',
  },
];

export const BOOKINGS = [
  {
    id: 'DS-99281',
    status: 'rented',
    car: {
      name: '2023 BMW M4 Competition',
      image:
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80',
      pricePerDay: 210,
    },
    location: 'Miami, FL',
    pickup: { date: 'May 12', time: '10:00 AM' },
    dropoff: { date: 'May 15', time: '04:00 PM' },
    totalDays: 3,
    totalCost: 630.0,
  },
  {
    id: 'DS-88172',
    status: 'completed',
    car: {
      name: 'Porsche 911 Carrera',
      image:
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80',
    },
    dates: 'April 28 – April 30, 2024',
    rating: 5,
    hasRating: true,
  },
  {
    id: 'DS-77043',
    status: 'completed',
    car: {
      name: 'Jeep Wrangler Rubicon',
      image:
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80',
    },
    dates: 'May 05 – May 07, 2024',
    hasRating: false,
  },
];
