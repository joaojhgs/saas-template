import React from 'react';

import { Image, Skeleton, Upload, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

import { useTRPCClient } from '@/trpc/client';
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
  const trpcClient = useTRPCClient();

  if (isLoading) {
    return (
      <Skeleton.Image className="flex size-full items-center justify-center" />
    );
  }

  const customRequest = async (
    options: Parameters<NonNullable<UploadProps['customRequest']>>[0],
  ) => {
    const { file, onSuccess, onError } = options;
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = async () => {
      const base64 = reader.result?.toString().split(',')[1];
      if (base64) {
        try {
          const result = await trpcClient.upload.uploadFile.mutate({
            bucketName,
            fileBase64: base64,
            fileName: (file as File).name,
            contentType: (file as File).type,
          });
          onSuccess?.(result);
        } catch (err) {
          onError?.(err as Error);
        }
      } else {
        onError?.(new Error('Failed to read file'));
      }
    };
  };

  return (
    <div className={cn('relative', rootClassName)}>
      <ImgCrop rotationSlider>
        <Upload
          customRequest={customRequest}
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
