import { useState, useEffect, useCallback } from "react";
import {
  getPendingOwners,
  approveOwnerAccount,
  rejectOwnerAccount,
  getPendingCarPosts,
  approveCarPost,
  rejectCarPost,
} from "../../Services/Admin services";

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
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
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalActiveCars, setTotalActiveCars] = useState(0);
  const [verifications, setVerifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [carPosts, setCarPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [owners, cars] = await Promise.all([getPendingOwners(), getPendingCarPosts()]);
      setUsers(owners.map(mapUser));
      setCarPosts(cars.map(mapCar));
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const approveUser = async (id) => {
    await approveOwnerAccount(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setTotalUsers((n) => n + 1);
  };

  const rejectUser = async (id) => {
    await rejectOwnerAccount(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const approveCar = async (id) => {
    await approveCarPost(id);
    setCarPosts((prev) => prev.filter((c) => c.id !== id));
    setTotalActiveCars((n) => n + 1);
  };

  const rejectCar = async (id) => {
    await rejectCarPost(id);
    setCarPosts((prev) => prev.filter((c) => c.id !== id));
  };

  const pendingCount = verifications.length + users.length + carPosts.length;

  return {
    stats: { totalUsers, totalActiveCars, pendingCount },
    verifications,
    users,
    carPosts,
    isLoading,
    handlers: {
      approveVerification: (id) => setVerifications((v) => v.filter((x) => x.id !== id)),
      rejectVerification: (id) => setVerifications((v) => v.filter((x) => x.id !== id)),
      approveUser,
      rejectUser,
      approveCar,
      rejectCar,
    },
  };
}
