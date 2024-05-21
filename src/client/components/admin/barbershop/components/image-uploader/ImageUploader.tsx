'use client';

import React from 'react';

import { Button, Image } from 'antd';

import {
  useEditBarbershop,
  useGetBarbershop,
} from '@/client/hooks/useBarbershop';

const ImageUploader = () => {
  const { data } = useGetBarbershop();
  const { mutate: editBarbershop } = useEditBarbershop();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;

    if (e.target.files) {
      file = e.target.files[0];
    }

    if (file) {
      const formdata = new FormData();
      formdata.append('files', file);

      const requestOptions = { method: 'POST', body: formdata };

      const response = await fetch('/api/upload', requestOptions);
      const result = await response.json();

      const fullPath = result.data.fullPath;

      editBarbershop({
        id: data?.data?.id ?? '',
        picture: fullPath,
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative inline-block">
      <Image
        src={`https://nhtgmvgjkojhxrtjzzyv.supabase.co/storage/v1/object/public/${data?.data?.picture}`}
        alt="barbershop"
        className="max-h-full w-full object-cover"
      />
      <Button
        onClick={triggerFileInput}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        Edit Image
      </Button>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
    </div>
  );
};

export default ImageUploader;
