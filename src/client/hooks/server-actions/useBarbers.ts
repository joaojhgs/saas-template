import { useQuery } from '@tanstack/react-query';

import { getBarbersFromBarbershop } from '@/server/use-cases/barbers';
import { throwIfError } from '@/utils/result-handling';

/*
    This hook uses react-query to fetch the current user from our server side function with supabase;
    It has a caching strategy and shared provider, so you can use it inside any component without having duplicate requests;
    It'll refetch automatically after a set interval of one hour, which is the same duration of the user's token validity;
    This ensures, the users stays logged in and authorized securely.
*/

const useBarbers = () =>
  useQuery({
    queryKey: ['get-barbershop-barbers'],
    queryFn: () => throwIfError(getBarbersFromBarbershop()),
  });

export default useBarbers;
