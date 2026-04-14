import { useState, useEffect, useCallback } from "react";
import { authHeaders } from "../../lib/auth";

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

  const headers = authHeaders();

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [ownersRes, carsRes] = await Promise.all([
        fetch("/api/admin/users/pending-owners", { headers }),
        fetch("/api/admin/cars/pending", { headers }),
      ]);

      if (ownersRes.ok) {
        const data = await ownersRes.json();
        setUsers(Array.isArray(data) ? data.map(mapUser) : []);
      }

      if (carsRes.ok) {
        const data = await carsRes.json();
        setCarPosts(Array.isArray(data) ? data.map(mapCar) : []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const approveUser = async (id) => {
    await fetch(`/api/admin/users/${id}/approve`, { method: "PATCH", headers });
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setTotalUsers((n) => n + 1);
  };

  const rejectUser = async (id) => {
    await fetch(`/api/admin/users/${id}/reject`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ reason: "Application rejected by admin." }),
    });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const approveCar = async (id) => {
    await fetch(`/api/admin/cars/${id}/approve`, { method: "PATCH", headers });
    setCarPosts((prev) => prev.filter((c) => c.id !== id));
    setTotalActiveCars((n) => n + 1);
  };

  const rejectCar = async (id) => {
    await fetch(`/api/admin/cars/${id}/reject`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ reason: "Car post rejected by admin." }),
    });
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
