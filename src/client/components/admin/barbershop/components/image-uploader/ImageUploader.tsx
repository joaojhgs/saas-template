'use client';

import React from 'react';

import { Button, Image, Upload, UploadProps, message } from 'antd';
import ImgCrop from 'antd-img-crop';

import Icons from '@/client/components/Icons';
import {
  useEditBarbershop,
  useGetBarbershop,
} from '@/client/hooks/useBarbershop';
import { env } from '@/env';

const ImageUploader = () => {
  const { data, isLoading } = useGetBarbershop();
  const { mutate: editBarbershop } = useEditBarbershop();

  const onChange: UploadProps['onChange'] = ({ file }) => {
    if (file && file.status === 'done') {
      if (file.response.data?.fullPath) {
        editBarbershop(
          {
            id: data?.data?.id ?? '',
            picture:
              env.NEXT_PUBLIC_SUPABASE_STORAGE +
              '/' +
              file.response.data?.fullPath,
          },
          {
            onSuccess: () => {
              message.success('Picture updated successfully!');
            },
            onError: () => {
              message.error('Failed to update picture.');
            },
          },
        );
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <ImgCrop rotationSlider>
        <Upload
          action="/api/upload"
          supportServerRender
          listType="picture"
          className="absolute left-0 top-0 z-50"
          onChange={onChange}
          showUploadList={false}
        >
          <Button type="link">
            <Icons.Pencil />
          </Button>
        </Upload>
      </ImgCrop>
      <Image alt="banner" src={data?.data?.picture} />
    </div>
  );
};

export default ImageUploader;
