import { useState, useEffect, useCallback } from "react";
import {
  getPendingOwners,
  getPendingCars,
  getAdminAllCars,
  approveUser,
  rejectUser,
  approveCar,
  rejectCar,
  getAllLicenses,
  verifyLicense,
  rejectLicense,
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
    initials: name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "??",
    fullName: name,
    email: u.email ?? "",
    role: u.role ?? "Owner",
    dateRegistered: formatDate(u.created_at),
  };
}

function mapCar(c) {
  return {
    id: String(c.post_id),
    carModel: c.title ?? `${c.brand ?? ""} ${c.car_type ?? ""}`.trim(),
    owner: c.owner_name ?? "",
    dateSubmitted: formatDate(c.created_at),
    status: (c.approval_status ?? "pending").toLowerCase(),
    pricePerDay: c.rental_price ? `$${c.rental_price}` : "—",
    category: c.car_type ?? "—",
    location: c.location ?? "—",
  };
}

function mapLicense(l) {
  const name = l.renter_name ?? "";
  return {
    id: String(l.license_id),
    initials: name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "??",
    name,
    email: l.renter_email ?? "",
    licenseNumber: l.license_number ?? "—",
    issuingCountry: l.issuing_country ?? "—",
    expiryDate: l.expiry_date ?? "—",
    documentName: l.license_number
      ? `license_${l.license_number}.pdf`
      : "license_document.pdf",
    imageUrl: l.image_url ?? null,
    submittedAt: formatDate(l.submitted_at),
    status: (l.verification_status ?? "pending").toLowerCase(),
  };
}

export function useAdminApproval() {
  const [stats, setStats] = useState({ totalUsers: 0, totalActiveCars: 0, pendingCount: 0 });
  const [verifications, setVerifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [carPosts, setCarPosts] = useState([]);       // pending cars
  const [approvedCars, setApprovedCars] = useState([]); // approved cars
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [ownersData, pendingCarsData, licensesData, statsData, allCarsData] =
        await Promise.all([
          getPendingOwners().catch(() => []),
          getPendingCars().catch(() => []),
          getAllLicenses().catch(() => []),
          getAdminStats().catch(() => null),
          getAdminAllCars().catch(() => []),
        ]);

      const mappedPending = Array.isArray(pendingCarsData)
        ? pendingCarsData.map(mapCar)
        : [];
      const mappedAll = Array.isArray(allCarsData) ? allCarsData.map(mapCar) : [];

      setUsers(Array.isArray(ownersData) ? ownersData.map(mapUser) : []);
      setCarPosts(mappedPending);
      // Approved = all cars that are NOT pending (fallback: filter from allCars)
      setApprovedCars(mappedAll.filter((c) => c.status === "approved"));
      setVerifications(Array.isArray(licensesData) ? licensesData.map(mapLicense) : []);

      const pendingCount =
        (Array.isArray(ownersData) ? ownersData.length : 0) +
        mappedPending.length +
        (Array.isArray(licensesData)
          ? licensesData.filter((l) => (l.verification_status ?? "").toLowerCase() === "pending").length
          : 0);

      if (statsData) {
        setStats({
          totalUsers: statsData.total_users ?? statsData.totalUsers ?? 0,
          totalActiveCars: statsData.active_cars ?? statsData.activeCars ?? 0,
          pendingCount,
        });
      } else {
        setStats((prev) => ({ ...prev, pendingCount }));
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
      setError("Failed to load dashboard data. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Users ──────────────────────────────────────────────
  const handleApproveUser = async (id) => {
    try {
      await approveUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Approve user failed:", err);
    }
  };

  const handleRejectUser = async (id) => {
    try {
      await rejectUser(id, "Application rejected by admin.");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Reject user failed:", err);
    }
  };

  // ── Cars ───────────────────────────────────────────────
  const handleApproveCar = async (id) => {
    try {
      await approveCar(id);
      // Move from pending → approved locally for instant feedback
      const approved = carPosts.find((c) => c.id === id);
      setCarPosts((prev) => prev.filter((c) => c.id !== id));
      if (approved) setApprovedCars((prev) => [...prev, { ...approved, status: "approved" }]);
    } catch (err) {
      console.error("Approve car failed:", err);
    }
  };

  const handleRejectCar = async (id) => {
    try {
      await rejectCar(id, "Car post rejected by admin.");
      setCarPosts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Reject car failed:", err);
    }
  };

  // ── Licenses ───────────────────────────────────────────
  const handleApproveVerification = async (id) => {
    try {
      await verifyLicense(id);
      setVerifications((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Verify license failed:", err);
    }
  };

  const handleRejectVerification = async (id) => {
    try {
      await rejectLicense(id, "License rejected by admin.");
      setVerifications((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Reject license failed:", err);
    }
  };

  const pendingCount = verifications.filter((v) => v.status === "pending").length
    + users.length
    + carPosts.length;

  return {
    stats: { ...stats, pendingCount },
    verifications: verifications.filter((v) => v.status === "pending"),
    users,
    carPosts,       // pending cars only
    approvedCars,   // approved cars
    isLoading,
    error,
    refetch: fetchAll,
    handlers: {
      approveVerification: handleApproveVerification,
      rejectVerification: handleRejectVerification,
      approveUser: handleApproveUser,
      rejectUser: handleRejectUser,
      approveCar: handleApproveCar,
      rejectCar: handleRejectCar,
    },
  };
}
