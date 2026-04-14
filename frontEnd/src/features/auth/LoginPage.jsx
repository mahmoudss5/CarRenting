import PageLayout from '../../shared/layouts/PageLayout';
import AuthCard from './components/AuthCard';
import EditorialInput from '../../shared/components/EditorialInput';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useAuthForm } from './hooks/useAuthForm';

export default function LoginPage() {
  const { values, handleChange, handleSubmit } = useAuthForm({
    email: '',
    password: '',
  });

  const onSubmit = (formValues) => {
    // TODO: connect to auth API
    console.log('Login submitted:', formValues);
  };

  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low/60 px-6 py-16">
        <AuthCard
          title="Welcome back"
          subtitle="Login to your DriveShare account"
          footerText="Don't have an account?"
          footerLinkLabel="Sign Up"
          footerLinkTo="/signup"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <EditorialInput
              id="login-email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
            />
            <EditorialInput
              id="login-password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
            />
            <PrimaryButton type="submit" size="lg" className="w-full mt-2">
              Login
            </PrimaryButton>
          </form>
        </AuthCard>
      </div>
    </PageLayout>
  );
}
