import { useMemo, useState } from 'react';
import { RENTER_PREFERENCES, RENTER_PROFILE } from '../data/profileSettingsData';

/**
 * Centralized renter profile settings state.
 * Keeps forms controlled and exposes simple handlers for presentational components.
 */
export function useProfileSettings() {
  const [profileForm, setProfileForm] = useState(RENTER_PROFILE);
  const [preferenceForm, setPreferenceForm] = useState(RENTER_PREFERENCES);
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

  const fullName = useMemo(
    () => `${profileForm.firstName} ${profileForm.lastName}`.trim(),
    [profileForm.firstName, profileForm.lastName]
  );

  const updateProfileField = (field, value) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const updatePreferenceField = (field, value) => {
    setPreferenceForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateSecurityField = (field, value) => {
    setSecurityForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = (event) => {
    event.preventDefault();
    setIsSavingProfile(true);
    setProfileMessage('');

    setTimeout(() => {
      setIsSavingProfile(false);
      setProfileMessage('Profile details updated successfully.');
    }, 800);
  };

  const savePreferences = (event) => {
    event.preventDefault();
    setIsSavingPreferences(true);
    setPreferencesMessage('');

    setTimeout(() => {
      setIsSavingPreferences(false);
      setPreferencesMessage('Rental preferences saved.');
    }, 800);
  };

  const saveSecurity = (event) => {
    event.preventDefault();
    setSecurityMessage('');

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityMessage('New password and confirmation must match.');
      return;
    }

    setIsSavingSecurity(true);
    setTimeout(() => {
      setIsSavingSecurity(false);
      setSecurityForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setSecurityMessage('Password updated.');
    }, 800);
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
