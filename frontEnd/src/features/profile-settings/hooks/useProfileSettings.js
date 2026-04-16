import { useState, useEffect, useMemo } from 'react';
import { getMe, updateProfile, changePassword } from '../../../services/authService';

export function useProfileSettings() {
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    bio: '',
  });

  const [preferenceForm, setPreferenceForm] = useState({
    vehicleType: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Electric',
    notifications: true,
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);

  const [profileMessage, setProfileMessage] = useState('');
  const [preferencesMessage, setPreferencesMessage] = useState('');
  const [securityMessage, setSecurityMessage] = useState('');

  // Load current user profile on mount
  useEffect(() => {
    getMe()
      .then((data) => {
        const nameParts = (data.full_name ?? '').split(' ');
        setProfileForm((prev) => ({
          ...prev,
          firstName: nameParts[0] ?? '',
          lastName: nameParts.slice(1).join(' ') ?? '',
          email: data.email ?? '',
          phone: data.phone_number ?? '',
        }));
      })
      .catch(console.error);
  }, []);

  const fullName = useMemo(
    () => `${profileForm.firstName} ${profileForm.lastName}`.trim(),
    [profileForm.firstName, profileForm.lastName],
  );

  const updateProfileField = (field, value) =>
    setProfileForm((prev) => ({ ...prev, [field]: value }));

  const updatePreferenceField = (field, value) =>
    setPreferenceForm((prev) => ({ ...prev, [field]: value }));

  const updateSecurityField = (field, value) =>
    setSecurityForm((prev) => ({ ...prev, [field]: value }));

  const saveProfile = async (event) => {
    event.preventDefault();
    setIsSavingProfile(true);
    setProfileMessage('');
    try {
      await updateProfile({
        fullName: fullName,
        phoneNumber: profileForm.phone || undefined,
      });
      setProfileMessage('Profile details updated successfully.');
    } catch (err) {
      setProfileMessage(err?.response?.data?.message ?? 'Failed to update profile.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const savePreferences = (event) => {
    event.preventDefault();
    setIsSavingPreferences(true);
    setPreferencesMessage('');
    // Preferences are local-only (no backend endpoint for them)
    setTimeout(() => {
      setIsSavingPreferences(false);
      setPreferencesMessage('Rental preferences saved.');
    }, 400);
  };

  const saveSecurity = async (event) => {
    event.preventDefault();
    setSecurityMessage('');

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityMessage('New password and confirmation must match.');
      return;
    }
    if (securityForm.newPassword.length < 6) {
      setSecurityMessage('New password must be at least 6 characters.');
      return;
    }

    setIsSavingSecurity(true);
    try {
      await changePassword({
        currentPassword: securityForm.currentPassword,
        newPassword: securityForm.newPassword,
      });
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSecurityMessage('Password updated successfully.');
    } catch (err) {
      setSecurityMessage(err?.response?.data?.message ?? 'Failed to update password.');
    } finally {
      setIsSavingSecurity(false);
    }
  };

  return {
    profileForm,
    preferenceForm,
    securityForm,
    fullName,
    isSavingProfile,
    isSavingPreferences,
    isSavingSecurity,
    profileMessage,
    preferencesMessage,
    securityMessage,
    updateProfileField,
    updatePreferenceField,
    updateSecurityField,
    saveProfile,
    savePreferences,
    saveSecurity,
  };
}
