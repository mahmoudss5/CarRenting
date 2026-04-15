/**
 * Static featured car data for the home page.
 * Move to an API call when a backend endpoint is available.
 */
export const FEATURED_CARS = [
  {
    id: 1,
    name: 'Tesla Model 3',
    year: '2023',
    type: 'Electric',
    chipVariant: 'electric',
    pricePerDay: 120,
    specs: ['350mi Range', '5 Seats', 'Autopilot'],
    rating: 4.5,
    reviews: 142,
    image:
      'https://images.unsplash.com/photo-1619767886558-9b7a5d2ecb7a?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'BMW M4 Competition',
    year: '2022',
    type: 'Performance',
    chipVariant: 'performance',
    pricePerDay: 185,
    specs: ['503hp', 'M Differential', 'Harman Kardon'],
    rating: 5.0,
    reviews: 98,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'Range Rover Sport',
    year: '2023',
    type: 'Luxury SUV',
    chipVariant: 'suv',
    pricePerDay: 210,
    specs: ['7 Seats', 'Air Suspension', 'Meridian Audio'],
    rating: 4.0,
    reviews: 204,
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop&auto=format',
  },
];
