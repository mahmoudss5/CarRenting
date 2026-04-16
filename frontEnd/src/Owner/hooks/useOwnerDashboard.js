import { useState, useEffect, useMemo } from "react";
import { getOwnerRentals, acceptRental, rejectRental } from "../../services/ownerService";

function mapRental(r) {
  return {
    id: String(r.request_id),
    carPostId: String(r.post_id ?? ''),
    renterName: r.renter_name,
    carName: r.car_title,
    dateRange: `${r.start_date} - ${r.end_date}`,
    startDate: r.start_date,
    endDate: r.end_date,
    totalPrice: r.total_price,
    type: "new",
    status: (r.status ?? "").toLowerCase(),
    requestedAt: r.requested_at,
    // License info not in OwnerRentalDto — show a placeholder
    driverLicense: { status: "unknown", licenseNumber: "—", submittedAt: "—", expiryDate: "—", imageUrl: null },
    pickupLocation: "",
    totalDays: 0,
  };
}

export default function useOwnerDashboard() {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRentals = () => {
    setIsLoading(true);
    getOwnerRentals()
      .then((data) => setRentals(Array.isArray(data) ? data.map(mapRental) : []))
      .catch((err) => {
        console.error(err);
        setError("Failed to load rentals.");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchRentals(); }, []);

  const newRequests  = rentals.filter((r) => r.status === "pending");
  const pastRequests = rentals.filter((r) => ["accepted", "rejected", "completed", "cancelled"].includes(r.status));

  const acceptRentalRequest = async (request) => {
    try {
      await acceptRental(request.id);
      fetchRentals();
    } catch (err) {
      console.error("Accept failed:", err);
    }
  };

  const rejectRentalRequest = async (request) => {
    try {
      await rejectRental(request.id, "Rejected by owner.");
      fetchRentals();
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  const summary = useMemo(
    () => ({
      pendingApprovalCount: 0,
      newRequestCount: newRequests.length,
      pastRequestCount: pastRequests.length,
    }),
    [newRequests.length, pastRequests.length],
  );

  return {
    newRequests,
    pastRequests,
    pendingPosts: [],
    summary,
    isLoading,
    error,
    acceptRentalRequest,
    rejectRentalRequest,
    verifyLicense: () => {},
    rejectLicense: () => {},
  };
}
