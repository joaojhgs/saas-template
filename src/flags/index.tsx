'server-only';

import { unstable_flag as flag } from '@vercel/flags/next';

/*
    In this file, all feature flags are to be defined
    They can only be imported in server-side code for the sake of performance
    
*/

export const showSummerSale = flag({
  key: 'summer-sale',
  decide: () => false,
});
