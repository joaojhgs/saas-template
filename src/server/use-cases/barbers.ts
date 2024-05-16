'use server';

// import { createClient } from '@/lib/supabase/server-client';
import {
  ServerActionError,
  ServerActionSuccess,
} from '../../utils/result-handling';

// import { initErrorsAndTranslations } from '../init-errors';

/*
    This is a controller file. It is used to define the functions that will be used by the server.
    The functions defined here will be called by the server to perform the necessary operations.
*/

// This should either be instantiate every request or only called in request contexts, as of now, leave like this
// const supabase = createClient();

export const getBarbersFromBarbershop = async () => {
  try {
    const data = {
      barbers: [
        {
          name: 'Barbeiro 1',
          picture:
            'https://t4.ftcdn.net/jpg/02/10/97/19/360_F_210971959_wXcBYfif7jKeyKkHKhVyOnzQWHawIgK4.jpg',
          slug: 'barbeiro-1',
        },
        {
          name: 'Barbeiro 2',
          picture:
            'https://t4.ftcdn.net/jpg/02/10/97/19/360_F_210971959_wXcBYfif7jKeyKkHKhVyOnzQWHawIgK4.jpg',
          slug: 'barbeiro-2',
        },
        {
          name: 'Barbeiro 3',
          picture:
            'https://t4.ftcdn.net/jpg/02/10/97/19/360_F_210971959_wXcBYfif7jKeyKkHKhVyOnzQWHawIgK4.jpg',
          slug: 'barbeiro-3',
        },
        {
          name: 'Barbeiro 4',
          picture:
            'https://t4.ftcdn.net/jpg/02/10/97/19/360_F_210971959_wXcBYfif7jKeyKkHKhVyOnzQWHawIgK4.jpg',
          slug: 'barbeiro-4',
        },
        {
          name: 'Barbeiro 5',
          picture:
            'https://t4.ftcdn.net/jpg/02/10/97/19/360_F_210971959_wXcBYfif7jKeyKkHKhVyOnzQWHawIgK4.jpg',
          slug: 'barbeiro-5',
        },
      ],
    };

    return new ServerActionSuccess(data).stringfy();
  } catch (e) {
    return new ServerActionError(e).stringfy();
  }
};
