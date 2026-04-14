import PageLayout from '../../shared/layouts/PageLayout';
import AuthCard from './components/AuthCard';
import EditorialInput from '../../shared/components/EditorialInput';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useAuthForm } from './hooks/useAuthForm';

export default function SignupPage() {
  const { values, handleChange, handleSubmit } = useAuthForm({
    name: '',
    email: '',
    password: '',
  });

  const onSubmit = (formValues) => {
    // TODO: connect to auth API
    console.log('Signup submitted:', formValues);
  };

  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low/60 px-6 py-16">
        <AuthCard
          title="Create account"
          subtitle="Join DriveShare today"
          footerText="Already have an account?"
          footerLinkLabel="Login"
          footerLinkTo="/login"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <EditorialInput
              id="signup-name"
              name="name"
              type="text"
              label="Full Name"
              placeholder="Jane Smith"
              value={values.name}
              onChange={handleChange}
            />
            <EditorialInput
              id="signup-email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
            />
            <EditorialInput
              id="signup-password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
            />
            <PrimaryButton type="submit" size="lg" className="w-full mt-2">
              Create Account
            </PrimaryButton>
          </form>
        </AuthCard>
      </div>
    </PageLayout>
  );
}
