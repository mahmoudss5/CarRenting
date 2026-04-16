import { useState, useEffect, useCallback } from "react";
import {
  getPendingOwners,
  getPendingCars,
  approveUser,
  rejectUser,
  approveCar,
  rejectCar,
  getAdminStats,
} from "../../services/adminService";

function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function mapUser(u) {
  const name = u.full_name ?? "";
  return {
    id: String(u.user_id),
    initials: name.slice(0, 2).toUpperCase() || "??",
    fullName: name,
    email: u.email ?? "",
    dateRegistered: formatDate(u.created_at),
  };
}

function mapCar(c) {
  return {
    id: String(c.post_id),
    carModel: c.title ?? `${c.brand} ${c.car_type}`,
    owner: c.owner_name ?? "",
    dateSubmitted: formatDate(c.created_at),
    status: "PENDING",
  };
}

export function useAdminApproval() {
  const [stats, setStats] = useState({ totalUsers: 0, totalActiveCars: 0, pendingCount: 0 });
  const [verifications, setVerifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [carPosts, setCarPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [ownersData, carsData, statsData] = await Promise.all([
        getPendingOwners(),
        getPendingCars(),
        getAdminStats().catch(() => null),
      ]);
      setUsers(Array.isArray(ownersData) ? ownersData.map(mapUser) : []);
      setCarPosts(Array.isArray(carsData) ? carsData.map(mapCar) : []);
      if (statsData) {
        setStats({
          totalUsers: statsData.total_users ?? statsData.totalUsers ?? 0,
          totalActiveCars: statsData.active_cars ?? statsData.activeCars ?? 0,
          pendingCount:
            (Array.isArray(ownersData) ? ownersData.length : 0) +
            (Array.isArray(carsData) ? carsData.length : 0),
        });
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleApproveUser = async (id) => {
    await approveUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleRejectUser = async (id) => {
    await rejectUser(id, "Application rejected by admin.");
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleApproveCar = async (id) => {
    await approveCar(id);
    setCarPosts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleRejectCar = async (id) => {
    await rejectCar(id, "Car post rejected by admin.");
    setCarPosts((prev) => prev.filter((c) => c.id !== id));
  };

  const pendingCount = verifications.length + users.length + carPosts.length;

  return {
    stats: { ...stats, pendingCount },
    verifications,
    users,
    carPosts,
    isLoading,
    handlers: {
      approveVerification: (id) => setVerifications((v) => v.filter((x) => x.id !== id)),
      rejectVerification: (id) => setVerifications((v) => v.filter((x) => x.id !== id)),
      approveUser: handleApproveUser,
      rejectUser: handleRejectUser,
      approveCar: handleApproveCar,
      rejectCar: handleRejectCar,
    },
  };
}
