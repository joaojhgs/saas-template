import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { useTranslations } from 'next-intl';

import { loginWithPassword } from '@/server/use-cases/auth';
import { ISignInPasswordInput } from '@/types';
import { handleSAResult } from '@/utils/result-handling';

/* 
  The custom hook calls the loginWithPassword function from the server use-cases
  to authenticate the user with the provided email and password.
  It uses react-query to handle the mutation and automatically update the cached data and rendering.
  It also shows a notification on success or error.
  You can define onSuccess and onError functions here to make the usage on components clearer, unless it's too generic of a hook.
  The hook return a "error" state as well if there's any need to render it on the component aside from showing a notification.
*/

const useLogin = (options?: Record<string, unknown>) => {
  const queryClient = useQueryClient();
  const t = useTranslations();
  return useMutation({
    ...options,
    mutationFn: (data: ISignInPasswordInput) =>
      handleSAResult(loginWithPassword(data)),
    mutationKey: ['login'],
    onSuccess: (data) => {
      // On login success, it invalidates the getUser query to automatically update the cached data and rendering
      queryClient.invalidateQueries({ queryKey: ['logged-user'] });
      notification.success({
        message: t('results.success'),
        description: data.message,
      });
    },
    onError: (error) => {
      notification.error({
        message: t('results.error'),
        description: error.message,
      });
    },
  });
};

export default useLogin;
