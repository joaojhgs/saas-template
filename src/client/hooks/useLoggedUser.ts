import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/server/use-cases/auth';

/*
    This hook uses react-query to fetch the current user from our server side function with supabase;
    It has a caching strategy and shared provider, so you can use it inside any component without having duplicate requests;
    It'll refetch automatically after a set interval, which is the same duration of the user's token validity;
    This ensures, the users stays logged in and authorized securely.
*/

const useLoggedUser = () =>
  useQuery({
    queryKey: ['logged-user'],
    queryFn: getCurrentUser,
    refetchInterval: 3600,
  });

export default useLoggedUser;
