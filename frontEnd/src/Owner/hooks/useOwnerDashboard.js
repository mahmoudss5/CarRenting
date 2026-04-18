import { useState, useEffect, useMemo } from "react";
import { getOwnerRentals, acceptRental, rejectRental, getMyCars } from "../../services/ownerService";

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/+$/, '');

function normalizeImageUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) return url;
  return url.startsWith('/') ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/${url}`;
}

function mapRental(r) {
  return {
    id: String(r.requestId || r.request_id),
    carPostId: String(r.postId || r.post_id || ""),
    renterName: r.renterName || r.renter_name || "Unknown Renter",
    carName: r.carTitle || r.car_title || "—",
    dateRange: `${r.startDate || r.start_date || "?"} - ${r.endDate || r.end_date || "?"}`,
    startDate: r.startDate || r.start_date,
    endDate: r.endDate || r.end_date,
    totalPrice: r.totalPrice || r.total_price,
    type: "new",
    status: (r.status || "").toLowerCase(),
    decision: (r.status || "").toLowerCase(),
    requestedAt: r.requestedAt || r.requested_at,
    driverLicense: {
      status: (r.licenseStatus || r.license_status || "unknown").toLowerCase(),
      licenseNumber: r.licenseNumber || r.license_number || "—",
      issuingCountry: r.licenseIssuingCountry || r.license_issuing_country || "—",
      expiryDate: r.licenseExpiryDate || r.license_expiry_date || "—",
      imageUrl: normalizeImageUrl(r.licenseFrontImageUrl || r.license_front_image_url),
      frontImageUrl: normalizeImageUrl(r.licenseFrontImageUrl || r.license_front_image_url),
      backImageUrl: normalizeImageUrl(r.licenseBackImageUrl || r.license_back_image_url),
    },
    pickupLocation: r.location || "—",
    totalDays: (r.startDate || r.start_date) && (r.endDate || r.end_date)
      ? Math.max(
          1,
          Math.ceil(
            (new Date(r.endDate || r.end_date) - new Date(r.startDate || r.start_date)) / (1000 * 60 * 60 * 24)
          )
        )
      : 0,
  };
}

function mapPost(c) {
  return {
    id: String(c.post_id),
    carName: c.title ?? "Car Listing",
    pricePerDay: Number(c.rental_price ?? 0),
    submittedAt: c.created_at
      ? new Date(c.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—",
    approvalStatus: (c.approval_status ?? "pending").toLowerCase(),
    rentalStatus: (c.rental_status ?? "available").toLowerCase(),
  };
}

export default function useOwnerDashboard() {
  const [rentals, setRentals] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = () => {
    setIsLoading(true);
    setError(null);
    Promise.all([
      getOwnerRentals().catch(() => []),
      getMyCars().catch(() => []),
    ])
      .then(([rentalsData, carsData]) => {
        setRentals(Array.isArray(rentalsData) ? rentalsData.map(mapRental) : []);
        setAllPosts(Array.isArray(carsData) ? carsData.map(mapPost) : []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load dashboard data.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const newRequests  = rentals.filter((r) => r.status === "pending");
  const pastRequests = rentals.filter((r) =>
    ["accepted", "rejected", "completed", "cancelled"].includes(r.status)
  );

  // Posts pending admin approval
  const pendingPosts = allPosts.filter((p) => p.approvalStatus === "pending");

  const summary = useMemo(() => ({
    pendingApprovalCount: pendingPosts.length,
    newRequestCount: newRequests.length,
    pastRequestCount: pastRequests.length,
    totalActivePosts: allPosts.filter((p) => p.approvalStatus === "approved").length,
  }), [pendingPosts.length, newRequests.length, pastRequests.length, allPosts.length]);

  const acceptRentalRequest = async (request) => {
    try {
      await acceptRental(request.id);
      fetchAll();
    } catch (err) {
      console.error("Accept failed:", err);
    }
  };

  const rejectRentalRequest = async (request) => {
    try {
      await rejectRental(request.id, "Rejected by owner.");
      fetchAll();
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  const verifyLicense = (requestId) => {
    setRentals((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, driverLicense: { ...r.driverLicense, status: "verified" } }
          : r
      )
    );
  };

  const rejectLicense = (requestId) => {
    setRentals((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, driverLicense: { ...r.driverLicense, status: "rejected" } }
          : r
      )
    );
  };

  return {
    newRequests,
    pastRequests,
    pendingPosts,        // ← now populated from real API
    allPosts,
    summary,
    isLoading,
    error,
    refetch: fetchAll,
    acceptRentalRequest,
    rejectRentalRequest,
    verifyLicense,
    rejectLicense,
  };
}
