import React from 'react';

import { Image, Skeleton, Upload, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

import { cn } from '@/utils/tailwind';

interface IImageUploaderProps {
  onChange: UploadProps['onChange'];
  rootClassName?: string;
  uploadClassName?: string;
  imageClassName?: string;
  src: string;
  children?: React.ReactNode;
  isLoading: boolean;
  alt: string;
  width: number | string;
  height: number | string;
  bucketName: string;
}

const ImageUploader = ({
  onChange,
  rootClassName,
  uploadClassName,
  imageClassName,
  src,
  children,
  isLoading,
  alt,
  width,
  height,
  bucketName,
}: IImageUploaderProps) => {
  if (isLoading) {
    return (
      <Skeleton.Image className="flex size-full items-center justify-center" />
    );
  }

  return (
    <div className={cn('relative', rootClassName)}>
      <ImgCrop rotationSlider>
        <Upload
          action={`/api/upload/${bucketName}`}
          supportServerRender
          listType="picture"
          className={cn(uploadClassName, 'absolute left-0 top-0 z-50')}
          onChange={onChange}
          showUploadList={false}
        >
          {children}
        </Upload>
      </ImgCrop>
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        className={cn('object-cover', imageClassName)}
      />
    </div>
  );
};

export default ImageUploader;
