import { useMemo, useState } from "react";
import {
  INITIAL_PAST_RENTALS,
  INITIAL_POST_APPROVALS,
  INITIAL_RENTAL_REQUESTS,
} from "../data/ownerDashboardData";

export default function useOwnerDashboard() {
  const [newRequests, setNewRequests] = useState(INITIAL_RENTAL_REQUESTS);
  const [pastRequests, setPastRequests] = useState(INITIAL_PAST_RENTALS);
  const [pendingPosts, setPendingPosts] = useState(INITIAL_POST_APPROVALS);

  const takeRentalDecision = (request, decision) => {
    setNewRequests((prev) => prev.filter((item) => item.id !== request.id));
    setPastRequests((prev) => [{ ...request, decision }, ...prev]);
  };

  const acceptRentalRequest = (request) => takeRentalDecision(request, "accepted");
  const rejectRentalRequest = (request) => takeRentalDecision(request, "rejected");

  const postsPendingCount = pendingPosts.filter((post) => post.status === "pending").length;

  const summary = useMemo(
    () => ({
      pendingApprovalCount: postsPendingCount,
      newRequestCount: newRequests.length,
      pastRequestCount: pastRequests.length,
    }),
    [postsPendingCount, newRequests.length, pastRequests.length]
  );

  return {
    newRequests,
    pastRequests,
    pendingPosts,
    summary,
    acceptRentalRequest,
    rejectRentalRequest,
  };
}
