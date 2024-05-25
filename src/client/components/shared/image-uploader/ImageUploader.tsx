'use client';

import React from 'react';

import { Image, Skeleton, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { cn } from '@/utils/tailwind';

interface IImageUploaderProps {
  onChange: (data: unknown) => void;
  rootClassName?: string;
  uploadClassName?: string;
  imageSrc: string;
  children?: React.ReactNode;
  isLoading: boolean;
  imageAlt: string;
}

const ImageUploader = ({
  onChange,
  rootClassName,
  uploadClassName,
  imageSrc,
  children,
  isLoading,
  imageAlt,
}: IImageUploaderProps) => {
  if (isLoading) {
    return <Skeleton.Image className="h-64 w-full" />;
  }

  return (
    <div className={cn(rootClassName ? rootClassName : 'relative')}>
      <ImgCrop rotationSlider>
        <Upload
          action="/api/upload"
          supportServerRender
          listType="picture"
          className={cn(
            uploadClassName ? uploadClassName : 'absolute left-0 top-0 z-50',
          )}
          onChange={onChange}
          showUploadList={false}
        >
          {children}
        </Upload>
      </ImgCrop>
      <Image alt={imageAlt} src={imageSrc} />
    </div>
  );
};

export default ImageUploader;
