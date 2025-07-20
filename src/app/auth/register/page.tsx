import { AuthForm } from '@/components/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - EdTechCart',
  description: 'Create your EdTechCart account to start learning or teaching.',
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
