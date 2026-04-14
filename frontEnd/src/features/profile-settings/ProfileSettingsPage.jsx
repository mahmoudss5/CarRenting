import PageLayout from '../../shared/layouts/PageLayout';
import ProfileSettingsHeader from './components/ProfileSettingsHeader';
import PersonalInfoForm from './components/PersonalInfoForm';
import PreferenceSettingsForm from './components/PreferenceSettingsForm';
import SecuritySettingsForm from './components/SecuritySettingsForm';
import { useProfileSettings } from './hooks/useProfileSettings';

/**
 * Renter profile settings page — composition only.
 * Business logic remains in useProfileSettings.
 */
export default function ProfileSettingsPage() {
  const {
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
  } = useProfileSettings();

  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-10 py-12">
          <ProfileSettingsHeader fullName={fullName} email={profileForm.email} />

          <PersonalInfoForm
            form={profileForm}
            onChange={updateProfileField}
            onSubmit={saveProfile}
            isSaving={isSavingProfile}
            message={profileMessage}
          />

          <PreferenceSettingsForm
            form={preferenceForm}
            onChange={updatePreferenceField}
            onSubmit={savePreferences}
            isSaving={isSavingPreferences}
            message={preferencesMessage}
          />

          <SecuritySettingsForm
            form={securityForm}
            onChange={updateSecurityField}
            onSubmit={saveSecurity}
            isSaving={isSavingSecurity}
            message={securityMessage}
          />
        </div>
      </div>
    </PageLayout>
  );
}
