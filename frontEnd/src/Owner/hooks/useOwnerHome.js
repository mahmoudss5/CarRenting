import { useState, useEffect, useMemo, useCallback } from "react";
import { getMyCars } from "../../services/ownerService";
import { getCarById, deleteCar } from "../../services/carService";

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/+$/, '');

function normalizeImageUrl(url) {
  if (!url) {
    console.log('[normalizeImageUrl - useOwnerHome] URL is empty or null:', url);
    return null;
  }
  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
    console.log('[normalizeImageUrl - useOwnerHome] URL is absolute/data:', url);
    return url;
  }
  const computed = url.startsWith('/') ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/${url}`;
  console.log(`[normalizeImageUrl - useOwnerHome] Original: "${url}" -> Computed: "${computed}" (API_BASE_URL: ${API_BASE_URL})`);
  return computed;
}

function mergeCarData(summary) {
  return {
    id: String(summary.post_id),
    title: summary.title ?? "Untitled",
    approvalStatus: (summary.approval_status ?? "pending").toLowerCase(),
    rentalStatus: (summary.rental_status ?? "available").toLowerCase(),
    rentalPrice: Number(summary.rental_price ?? 0),
    createdAt: summary.created_at,
    ownerRentalStatus: (() => {
      const approval = (summary.approval_status ?? "").toLowerCase();
      const rental = (summary.rental_status ?? "").toLowerCase();
      if (approval === "pending") return "Pending";
      if (rental === "rented") return "Rented";
      return "Active";
    })(),
    carType: summary.car_type ?? "—",
    brand: summary.brand ?? "—",
    model: summary.model ?? "—",
    year: String(summary.year ?? "—"),
    transmission: summary.transmission ?? "—",
    location: summary.location ?? "—",
    image: normalizeImageUrl(summary.primary_image_url),
  };
}

export default function useOwnerHome() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchPosts = useCallback(() => {
    setIsLoading(true);
    setError(null);
    getMyCars()
      .then((summaries) => {
        if (!Array.isArray(summaries)) {
          setPosts([]);
          return;
        }
        setPosts(summaries.map(mergeCarData));
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load your car listings.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const deletePost = useCallback(async (id) => {
    setDeletingId(id);
    try {
      await deleteCar(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        "Failed to delete this listing.";
      throw new Error(msg);
    } finally {
      setDeletingId(null);
    }
  }, []);

  const stats = useMemo(() => {
    const active = posts.filter((p) => p.ownerRentalStatus === "Active").length;
    const pending = posts.filter((p) => p.ownerRentalStatus === "Pending").length;
    const rented = posts.filter((p) => p.ownerRentalStatus === "Rented").length;
    return { totalPosts: posts.length, active, pending, rented };
  }, [posts]);

  return { posts, stats, isLoading, error, deletingId, deletePost, refetch: fetchPosts };
}
