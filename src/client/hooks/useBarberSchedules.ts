import { useQuery } from '@tanstack/react-query';

import { getBarberSchedules } from '@/server/use-cases/schedules';
import { throwIfError } from '@/utils/result-handling';

const useBarberSchedules = () =>
  useQuery({
    queryKey: ['get-barber-schedules'],
    queryFn: () => throwIfError(getBarberSchedules()),
  });

export default useBarberSchedules;
