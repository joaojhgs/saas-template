import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { useTranslations } from 'next-intl';

import { getBarbershop, updateBarbershop } from '@/server/use-cases/barbershop';
import { IUpdateBarbershopInput } from '@/types';
import { handleSAResult } from '@/utils/result-handling';

/*
    This hook uses react-query to fetch the current user from our server side function with supabase;
    It has a caching strategy and shared provider, so you can use it inside any component without having duplicate requests;
    It'll refetch automatically after a set interval of one hour, which is the same duration of the user's token validity;
    This ensures, the users stays logged in and authorized securely.
*/

const useGetBarbershop = () =>
  useQuery({
    queryKey: ['get-barbershop'],
    queryFn: () => handleSAResult(getBarbershop()),
  });

const useEditBarbershop = (options?: Record<string, unknown>) => {
  const queryClient = useQueryClient();
  const t = useTranslations('barbershop');
  return useMutation({
    ...options,
    mutationFn: (data: IUpdateBarbershopInput) =>
      handleSAResult(updateBarbershop(data)),
    mutationKey: ['update-barbershop'],
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['get-barbershop'] });
      notification.success({
        message: t('update-barbershop-success'),
        description: data.message,
      });
    },
    onError: (error) => {
      notification.error({
        message: t('update-barbershop-error'),
        description: error.message,
      });
    },
  });
};

export { useGetBarbershop, useEditBarbershop };
