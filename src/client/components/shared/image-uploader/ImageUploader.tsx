import React from 'react';

import { Image, Skeleton, Upload, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

interface IImageUploaderProps {
  onChange: UploadProps['onChange'];
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
    return (
      <Skeleton.Image className="size-full flex justify-center items-center" />
    );
  }

  return (
    <div className={rootClassName ? rootClassName : 'relative'}>
      <ImgCrop rotationSlider>
        <Upload
          action="/api/upload"
          supportServerRender
          listType="picture"
          className={
            uploadClassName ? uploadClassName : 'absolute left-0 top-0 z-50'
          }
          onChange={onChange}
          showUploadList={false}
        >
          {children}
        </Upload>
      </ImgCrop>
      <Image
        alt={imageAlt}
        src={imageSrc}
        style={{ width: '720px', height: '480px', objectFit: 'cover' }}
      />
    </div>
  );
};

export default ImageUploader;
