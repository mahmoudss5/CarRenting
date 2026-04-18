import { useState, useEffect, useMemo, useCallback } from "react";
import { getMyCars } from "../../services/ownerService";
import { getCarById, deleteCar } from "../../services/carService";

function mergeCarData(summary, detail) {
  return {
    id: String(summary.post_id),
    title: summary.title ?? detail?.title ?? "Untitled",
    approvalStatus: (summary.approval_status ?? "pending").toLowerCase(),
    rentalStatus: (summary.rental_status ?? "available").toLowerCase(),
    rentalPrice: Number(summary.rental_price ?? detail?.rental_price ?? 0),
    createdAt: summary.created_at,
    ownerRentalStatus: (() => {
      const approval = (summary.approval_status ?? "").toLowerCase();
      const rental = (summary.rental_status ?? "").toLowerCase();
      if (approval === "pending") return "Pending";
      if (rental === "rented") return "Rented";
      return "Active";
    })(),
    description: detail?.description ?? "",
    carType: detail?.car_type ?? "—",
    brand: detail?.brand ?? "—",
    model: detail?.model ?? "—",
    year: String(detail?.year ?? "—"),
    transmission: detail?.transmission ?? "—",
    location: detail?.location ?? "—",
    ownerName: detail?.owner_name ?? "—",
    availability: Array.isArray(detail?.availability) ? detail.availability : [],
    image: (() => {
      const imgs = detail?.images ?? [];
      const primary = imgs.find((i) => i.is_primary);
      return (primary ?? imgs[0])?.image_url ?? null;
    })(),
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
      .then(async (summaries) => {
        if (!Array.isArray(summaries)) {
          setPosts([]);
          return;
        }
        const detailed = await Promise.all(
          summaries.map((s) =>
            getCarById(s.post_id)
              .then((detail) => mergeCarData(s, detail))
              .catch(() => mergeCarData(s, null))
          )
        );
        setPosts(detailed);
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
