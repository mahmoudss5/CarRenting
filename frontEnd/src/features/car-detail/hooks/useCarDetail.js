import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { findCarById } from '../data/carDetails';

/** Converts two YYYY-MM-DD strings to whole-day difference (min 1). */
function calcDays(start, end) {
  if (!start || !end) return 1;
  const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  return Math.max(1, Math.round(diff));
}

/**
 * Manages Car Detail page state: car lookup + booking form + price calculation.
 * Reads carId from URL params automatically.
 */
export function useCarDetail() {
  const { carId } = useParams();
  const car = findCarById(carId);

  const [startDate, setStartDate] = useState('2024-10-24');
  const [endDate, setEndDate] = useState('2024-10-27');
  const [location, setLocation] = useState('San Francisco, CA');

  const pricing = useMemo(() => {
    const numDays = calcDays(startDate, endDate);
    const subtotal = numDays * car.pricePerDay;
    const serviceFee = Math.round(subtotal * 0.0662 * 100) / 100;
    const insurance = 40 * numDays;
    const total = Math.round((subtotal + serviceFee + insurance) * 100) / 100;
    return { numDays, subtotal, serviceFee, insurance, total };
  }, [startDate, endDate, car.pricePerDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to booking API
    console.log('Rental requested:', { carId, startDate, endDate, location, pricing });
  };

  return {
    car,
    booking: { startDate, endDate, location, ...pricing },
    handlers: { setStartDate, setEndDate, setLocation, handleSubmit },
  };
}
