import { useQuery } from '@tanstack/react-query';

import { getBarberSchedules } from '@/server/use-cases/schedules';
import { handleSAResult } from '@/utils/result-handling';

const useBarberSchedules = () =>
  useQuery({
    queryKey: ['get-barber-schedules'],
    queryFn: () => handleSAResult(getBarberSchedules()),
  });

export default useBarberSchedules;
