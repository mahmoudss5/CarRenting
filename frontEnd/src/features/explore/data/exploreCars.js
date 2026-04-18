/**
 * Static data for the Explore/Browse page.
 * Includes all filterable fields: fuelType, carType, brand, transmission, pricePerDay.
 */
export const EXPLORE_CARS = [
  {
    id: 1,
    name: 'Lucid Air Pure',
    year: '2024',
    fuelType: 'Electric',
    carType: 'Sedan',
    brand: 'Lucid',
    transmission: 'Automatic',
    pricePerDay: 185,
    chipLabel: 'Verified',
    chipVariant: 'verified',
    image:
      'https://images.unsplash.com/photo-1619767886558-9b7a5d2ecb7a?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'BMW M4 Competition',
    year: '2023',
    fuelType: 'Petrol',
    carType: 'Coupe',
    brand: 'BMW',
    transmission: 'Automatic',
    pricePerDay: 210,
    chipLabel: 'Low Stock',
    chipVariant: 'lowstock',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'Porsche 911 Carrera',
    year: '2024',
    fuelType: 'Petrol',
    carType: 'Sports',
    brand: 'Porsche',
    transmission: 'Automatic',
    pricePerDay: 295,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Tesla Model S Plaid',
    year: '2023',
    fuelType: 'Electric',
    carType: 'Sedan',
    brand: 'Tesla',
    transmission: 'Automatic',
    pricePerDay: 155,
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 5,
    name: 'Mercedes G 63 AMG',
    year: '2024',
    fuelType: 'Petrol',
    carType: 'SUV',
    brand: 'Mercedes',
    transmission: 'Automatic',
    pricePerDay: 350,
    image:
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 6,
    name: 'Audi RS e-tron GT',
    year: '2024',
    fuelType: 'Electric',
    carType: 'Sedan',
    brand: 'Audi',
    transmission: 'Automatic',
    pricePerDay: 195,
    image:
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 7,
    name: 'Ferrari Roma Spider',
    year: '2024',
    fuelType: 'Petrol',
    carType: 'Sports',
    brand: 'Ferrari',
    transmission: 'Automatic',
    pricePerDay: 450,
    image:
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 8,
    name: 'Lamborghini Urus',
    year: '2023',
    fuelType: 'Petrol',
    carType: 'SUV',
    brand: 'Lamborghini',
    transmission: 'Automatic',
    pricePerDay: 520,
    image:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop&auto=format',
  },
  {
    id: 9,
    name: 'Rivian R1T',
    year: '2024',
    fuelType: 'Electric',
    carType: 'Truck',
    brand: 'Rivian',
    transmission: 'Automatic',
    pricePerDay: 175,
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop&auto=format',
  },
];

export const FILTER_CATEGORIES = [
  { id: 'priceRange',    label: 'Price Range'   },
  { id: 'location',      label: 'Location'       },
  { id: 'carType',       label: 'Car Type'       },
  { id: 'brand',         label: 'Brand'          },
  { id: 'transmission',  label: 'Transmission'   },
];

export const FILTER_OPTIONS = {
  carType:      ['Sedan', 'SUV', 'Sports', 'Coupe', 'Truck', 'Hatchback', 'Convertible'],
  brand:        ['BMW', 'Tesla', 'Mercedes', 'Audi', 'Porsche', 'Ferrari', 'Toyota', 'Honda', 'Lucid', 'Lamborghini', 'Rivian'],
  transmission: ['Automatic', 'Manual'],
};

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc',   label: 'Price: Low to High' },
  { value: 'price-desc',  label: 'Price: High to Low' },
];

export const CARS_PER_PAGE = 6;
