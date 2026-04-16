import { useState, useEffect, useMemo } from "react";
import { getMyCars } from "../../services/ownerService";

function mapCar(c) {
  return {
    id: String(c.post_id),
    title: c.title,
    ownerRentalStatus: c.approval_status === "Approved" ? c.rental_status : c.approval_status,
    approvalStatus: c.approval_status,
    rentalStatus: c.rental_status,
    rentalPrice: Number(c.rental_price),
    createdAt: c.created_at,
    // Provide dummy fields that the UI might render
    carType: '',
    brand: '',
    model: '',
    year: '',
    transmission: '',
    location: '',
    fuelType: '',
    seats: '',
    mileage: '',
    availability: '',
    minRentalDays: 1,
    ownerName: '',
  };
}

export default function useOwnerHome() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyCars()
      .then((data) => setPosts(Array.isArray(data) ? data.map(mapCar) : []))
      .catch((err) => {
        console.error(err);
        setError("Failed to load your car listings.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const stats = useMemo(() => {
    const active  = posts.filter((p) => p.rentalStatus === "Available").length;
    const pending = posts.filter((p) => p.approvalStatus === "Pending").length;
    const rented  = posts.filter((p) => p.rentalStatus === "Rented").length;
    return { totalPosts: posts.length, active, pending, rented };
  }, [posts]);

  return { posts, stats, isLoading, error };
}
