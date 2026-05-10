import { useState, useEffect } from 'react';
import { getCars } from '../../../services/carService';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/+$/, '');

function normalizeImageUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) return url;
  return url.startsWith('/') ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/${url}`;
}

export function useFeaturedCars() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCars({ page: 1, pageSize: 3 })
      .then((data) => {
        const carsData = data?.cars || data?.results || [];
        const mapped = carsData.slice(0, 3).map((car) => ({
          id: car.post_id || car.id,
          name: car.title || `${car.brand} ${car.model}`,
          year: car.year,
          type: car.car_type || car.carType,
          chipVariant: (car.car_type || car.carType || 'standard').toLowerCase(),
          pricePerDay: car.rental_price || car.rentalPrice,
          specs: [`${car.transmission}`, car.location, `${car.year}`].filter(Boolean),
          rating: car.average_rating || 4.0,
          reviews: 0,
          image: normalizeImageUrl(car.primary_image_url || car.primaryImageUrl),
        }));
        setCars(mapped);
      })
      .catch((err) => {
        console.error('Failed to load featured cars:', err);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { cars, isLoading, error };
}
