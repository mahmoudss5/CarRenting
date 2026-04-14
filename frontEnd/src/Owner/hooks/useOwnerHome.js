import { useMemo } from "react";
import { OWNER_CAR_POSTS } from "../data/ownerDashboardData";

export default function useOwnerHome() {
  const posts = OWNER_CAR_POSTS;

  const stats = useMemo(() => {
    const active = posts.filter((post) => post.ownerRentalStatus === "Active").length;
    const pending = posts.filter((post) => post.ownerRentalStatus === "Pending").length;
    const rented = posts.filter((post) => post.ownerRentalStatus === "Rented").length;

    return {
      totalPosts: posts.length,
      active,
      pending,
      rented,
    };
  }, [posts]);

  return { posts, stats };
}
