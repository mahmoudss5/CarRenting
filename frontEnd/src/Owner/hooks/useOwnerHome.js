import { useState, useEffect, useMemo } from "react";
import { getMyCars } from "../../services/ownerService";
import { getCarById } from "../../services/carService";

/** Merge the summary row from /api/owner/cars with the full detail from /api/cars/:id */
function mergeCarData(summary, detail) {
  return {
    // identity
    id: String(summary.post_id),
    // from summary (always present)
    title: summary.title ?? detail?.title ?? "Untitled",
    approvalStatus: (summary.approval_status ?? "pending").toLowerCase(),
    rentalStatus: (summary.rental_status ?? "available").toLowerCase(),
    rentalPrice: Number(summary.rental_price ?? detail?.rental_price ?? 0),
    createdAt: summary.created_at,
    // UI display status label
    ownerRentalStatus: (() => {
      const approval = (summary.approval_status ?? "").toLowerCase();
      const rental   = (summary.rental_status ?? "").toLowerCase();
      if (approval === "pending") return "Pending";
      if (rental === "rented")   return "Rented";
      return "Active";
    })(),
    // from full detail (may be null if fetch fails)
    description: detail?.description ?? "",
    carType: detail?.car_type ?? "—",
    brand: detail?.brand ?? "—",
    model: detail?.model ?? "—",
    year: String(detail?.year ?? "—"),
    transmission: detail?.transmission ?? "—",
    location: detail?.location ?? "—",
    ownerName: detail?.owner_name ?? "—",
    fuelType: "—",   // not returned by backend — placeholder
    seats: "—",      // not returned by backend — placeholder
    mileage: "—",    // not returned by backend — placeholder
    availability: "—",
    minRentalDays: 1,
  };
}

export default function useOwnerHome() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getMyCars()
      .then(async (summaries) => {
        if (!Array.isArray(summaries)) {
          setPosts([]);
          return;
        }
        // Fetch full details in parallel (best-effort; failures are swallowed)
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

  const stats = useMemo(() => {
    const active  = posts.filter((p) => p.ownerRentalStatus === "Active").length;
    const pending = posts.filter((p) => p.ownerRentalStatus === "Pending").length;
    const rented  = posts.filter((p) => p.ownerRentalStatus === "Rented").length;
    return { totalPosts: posts.length, active, pending, rented };
  }, [posts]);

  return { posts, stats, isLoading, error };
}
