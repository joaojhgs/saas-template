'use client';

import React, { useRef, useState } from 'react';

import { Button, Image, Spin } from 'antd';

import {
  useEditBarbershop,
  useGetBarbershop,
} from '@/client/hooks/useBarbershop';

const ImageUploader = () => {
  const { data } = useGetBarbershop();
  const { mutate: editBarbershop } = useEditBarbershop();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;

    if (e.target.files) {
      file = e.target.files[0];
    }

    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('files', file);

      const requestOptions = { method: 'POST', body: formData };

      try {
        const response = await fetch('/api/upload', requestOptions);
        const result = await response.json();

        const fullPath = result.data.fullPath;

        editBarbershop({
          id: data?.data?.id ?? '',
          picture: fullPath,
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative inline-block">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Image
          src={`https://nhtgmvgjkojhxrtjzzyv.supabase.co/storage/v1/object/public/${data?.data?.picture}`}
          alt="barbershop"
          className="max-h-full w-full object-cover"
        />
      )}
      <Button
        onClick={triggerFileInput}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: loading ? 'none' : 'block',
        }}
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
