import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useLogin, loginInputSchema } from '@/lib/auth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { addNotification } = useNotifications();
  const login = useLogin({
    onSuccess: (response) => {
      if (response) {
        localStorage.setItem('authToken', `Bearer ${response.result}`);
      }
      onSuccess();
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: 'خطا',
        message: 'خطا در ورود',
      });
    },
  });

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div>
      <Form
        onSubmit={(values) => {
          login.mutate(values);
        }}
        schema={loginInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="email"
              label="آدرس ایمیل"
              error={formState.errors['username']}
              registration={register('username')}
            />
            <Input
              type="password"
              label="پسورد"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button
                isLoading={login.isPending}
                type="submit"
                className="w-full"
              >
                ورود
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to={`/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            ثبت نام
          </Link>
        </div>
      </div>
    </div>
  );
};
