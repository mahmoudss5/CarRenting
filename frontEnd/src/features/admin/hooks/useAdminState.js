import { useState, useEffect, useCallback } from "react";
import {
  getPendingOwners,
  getPendingCars,
  approveUser,
  rejectUser,
  approveCar,
  rejectCar,
  getAdminStats,
} from "../../../services/adminService";

function mapUser(u) {
  const name = u.full_name ?? "";
  return {
    id: String(u.user_id),
    initials: name.slice(0, 2).toUpperCase() || "??",
    fullName: name,
    email: u.email ?? "",
    role: u.role === "CarOwner" ? "Owner" : (u.role ?? "Owner"),
    status: "pending",
    dateRegistered: u.created_at
      ? new Date(u.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—",
  };
}

function mapCar(c) {
  return {
    id: String(c.post_id),
    carModel: c.title ?? `${c.brand ?? ""} ${c.car_type ?? ""}`.trim(),
    owner: c.owner_name ?? "—",
    dateSubmitted: c.created_at
      ? new Date(c.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—",
    status: (c.approval_status ?? "pending").toLowerCase(),
    pricePerDay: c.rental_price ? `$${Number(c.rental_price).toFixed(0)}` : "—",
    category: c.car_type ?? "—",
    location: c.location ?? "—",
  };
}

/**
 * Encapsulates all admin dashboard state and action handlers.
 * All data is fetched from the backend — no hardcoded values.
 */
export function useAdminState() {
  const [stats, setStats] = useState({ totalUsers: 0, totalActiveCars: 0, pendingCount: 0 });
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingCarPosts, setPendingCarPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [ownersData, pendingCarsData, statsData] = await Promise.all([
        getPendingOwners().catch(() => []),
        getPendingCars().catch(() => []),
        getAdminStats().catch(() => null),
      ]);

      const mappedUsers = Array.isArray(ownersData) ? ownersData.map(mapUser) : [];
      const mappedCars = Array.isArray(pendingCarsData) ? pendingCarsData.map(mapCar) : [];

      setPendingUsers(mappedUsers);
      setPendingCarPosts(mappedCars);

      // Backend returns nested: { users: { total, pending_approvals }, cars: { active }, ... }
      setStats({
        totalUsers: statsData?.users?.total ?? 0,
        totalActiveCars: statsData?.cars?.active ?? 0,
        pendingCount: mappedUsers.length + mappedCars.length,
      });
    } catch (err) {
      console.error("Failed to load admin data:", err);
      setError("Failed to load dashboard data. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleApproveUser = async (id) => {
    await approveUser(id).catch(console.error);
    setPendingUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleRejectUser = async (id) => {
    await rejectUser(id, "Application rejected by admin.").catch(console.error);
    setPendingUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleApproveCar = async (id) => {
    await approveCar(id).catch(console.error);
    setPendingCarPosts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleRejectCar = async (id) => {
    await rejectCar(id, "Car post rejected by admin.").catch(console.error);
    setPendingCarPosts((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    stats,
    pendingUsers,
    pendingCarPosts,
    isLoading,
    error,
    refetch: fetchAll,
    handlers: {
      approveUser: handleApproveUser,
      rejectUser: handleRejectUser,
      approveCar: handleApproveCar,
      rejectCar: handleRejectCar,
    },
  };
}
