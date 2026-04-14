import { useState } from 'react';
import { INITIAL_USERS, INITIAL_CAR_POSTS } from '../data/mockData';

/**
 * Encapsulates all admin dashboard state and action handlers.
 * Returns stats, lists, and handlers — no JSX.
 */
export function useAdminState() {
  const [totalUsers, setTotalUsers] = useState(12_482);
  const [totalActiveCars, setTotalActiveCars] = useState(3_105);
  const [pendingUsers, setPendingUsers] = useState(INITIAL_USERS);
  const [pendingCarPosts, setPendingCarPosts] = useState(INITIAL_CAR_POSTS);

  const pendingCount = pendingUsers.length + pendingCarPosts.length;

  const approveUser = (id) => {
    setTotalUsers((n) => n + 1);
    setPendingUsers((list) => list.filter((u) => u.id !== id));
  };

  const rejectUser = (id) =>
    setPendingUsers((list) => list.filter((u) => u.id !== id));

  const approveCar = (id) => {
    setTotalActiveCars((n) => n + 1);
    setPendingCarPosts((list) => list.filter((c) => c.id !== id));
  };

  const rejectCar = (id) =>
    setPendingCarPosts((list) => list.filter((c) => c.id !== id));

  return {
    stats: { totalUsers, totalActiveCars, pendingCount },
    pendingUsers,
    pendingCarPosts,
    handlers: { approveUser, rejectUser, approveCar, rejectCar },
  };
}
