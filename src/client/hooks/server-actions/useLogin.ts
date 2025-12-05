import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import { useTranslations } from 'next-intl';

import { ISignInPasswordInput } from '@/schemas';
import { useTRPC, useTRPCClient } from '@/trpc/client';

/* 
  The custom hook calls the loginWithPassword function from the server use-cases
  to authenticate the user with the provided email and password.
  It uses react-query to handle the mutation and automatically update the cached data and rendering.
  It also shows a notification on success or error.
  You can define onSuccess and onError functions here to make the usage on components clearer, unless it's too generic of a hook.
  The hook return a "error" state as well if there's any need to render it on the component aside from showing a notification.
*/

const useLogin = (options?: Record<string, unknown>) => {
  const trpc = useTRPC();
  const trpcClient = useTRPCClient();
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  return useMutation({
    ...options,
    mutationFn: (data: ISignInPasswordInput) =>
      trpcClient.auth.loginWithPassword.mutate(data),
    mutationKey: ['login'],
    onSuccess: () => {
      // On login success, it invalidates the getUser query to automatically update the cached data and rendering
      queryClient.invalidateQueries({
        queryKey: trpc.auth.getCurrentUser.queryKey(),
      });
      notification.success({
        message: 'Login successful',

        title: t('results.success'),
        description: 'Login successful',
      });
      router.push(searchParams.get('redirect') || '/admin');
    },
    onError: (error) => {
      notification.error({
        message: error.message,

        title: t('results.error'),
        description: error.message,
      });
    },
  });
};

export default useLogin;
