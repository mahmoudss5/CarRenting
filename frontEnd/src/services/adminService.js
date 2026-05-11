import apiClient from "../lib/apiClient";
import { getRole } from "../lib/auth";



export function MakeSureIsAdmin(){
  const role = getRole();
  if (role.toLowerCase() !== "admin") {
    throw new Error("Unauthorized");
  }
}


export async function getAllUsers() {
  MakeSureIsAdmin();
  const { data } = await apiClient.get("/api/admin/users");
  return data;
}


export async function getPendingOwners() {
  const { data } = await apiClient.get("/api/admin/users/pending-owners");
  return data;
}


export async function getUserById(id) {
  const { data } = await apiClient.get(`/api/admin/users/${id}`);
  return data;
}


export async function approveUser(id) {
  MakeSureIsAdmin();
  const { data } = await apiClient.patch(`/api/admin/users/${id}/approve`);
  return data;
}


export async function rejectUser(id, reason) {
  const { data } = await apiClient.patch(`/api/admin/users/${id}/reject`, { reason });
  return data;
}


export async function deleteUser(id) {
  MakeSureIsAdmin();
  const { data } = await apiClient.delete(`/api/admin/users/${id}`);
  return data;
}


export async function promoteToAdmin(id) {
  MakeSureIsAdmin();
  const { data } = await apiClient.patch(`/api/admin/users/${id}/promote`);
  return data;
}


export async function getPendingCars() {
  const { data } = await apiClient.get("/api/admin/cars/pending");
  return Array.isArray(data) ? data : (data?.pending_cars ?? []);
}


export async function getAdminAllCars() {
  const { data } = await apiClient.get("/api/admin/cars");
  return Array.isArray(data) ? data : (data?.cars ?? []);
}


export async function approveCar(id) {
  MakeSureIsAdmin();
  const { data } = await apiClient.patch(`/api/admin/cars/${id}/approve`);
  return data;
}


export async function rejectCar(id, reason) {
  MakeSureIsAdmin();
  const { data } = await apiClient.patch(`/api/admin/cars/${id}/reject`, { reason });
  return data;
}


export async function getAllLicenses() {
  const { data } = await apiClient.get("/api/admin/licenses");
  return data;

}


export async function verifyLicense(id) {
  const { data } = await apiClient.patch(`/api/admin/licenses/${id}/verify`);
  return data;
}



export async function rejectLicense(id, reason) {
  const { data } = await apiClient.patch(`/api/admin/licenses/${id}/reject`, { reason });
  return data;
}



export async function getAllRentals() {
  const { data } = await apiClient.get("/api/admin/rentals");
  return data;
}



export async function getAdminStats() {
  const { data } = await apiClient.get("/api/admin/stats");
  return data;
}
