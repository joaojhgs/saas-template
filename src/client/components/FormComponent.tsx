'use client';

import { useEffect } from 'react';

import useLoggedUser from '../hooks/useLoggedUser';

export default function FormComponent() {
  const { data } = useLoggedUser();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return <></>;
}
