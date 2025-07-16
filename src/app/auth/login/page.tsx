
import { AuthForm } from '@/components/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - EdTechCart',
  description: 'Log in to your EdTechCart account.',
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
