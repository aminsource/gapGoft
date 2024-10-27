import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { RegisterForm } from '@/features/auth/components/register-form';

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AuthLayout title="حساب کاربری خود را ثبت کنید">
      <RegisterForm
        onSuccess={() =>
          navigate(`${redirectTo ? `${redirectTo}` : '/app'}`, {
            replace: true,
          })
        }
      />
    </AuthLayout>
  );
};
