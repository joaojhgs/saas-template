'use client';

import React, { useEffect, useState } from 'react';

import { Upload, UploadFile, UploadProps, message } from 'antd';
import ImgCrop from 'antd-img-crop';

import {
  useEditBarbershop,
  useGetBarbershop,
} from '@/client/hooks/useBarbershop';

const ImageUploader = () => {
  const { data, isLoading } = useGetBarbershop();
  const { mutate: editBarbershop } = useEditBarbershop();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (data?.data?.picture) {
      setFileList([
        {
          uid: '-1',
          name: 'current_picture',
          status: 'done',
          url: data?.data?.picture,
        },
      ]);
    }
  }, [data]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0 && newFileList[0].status === 'done') {
      const uploadedFile = newFileList[0];
      if (uploadedFile.response?.url) {
        editBarbershop(
          {
            id: data?.data?.id ?? '',
            picture: uploadedFile.response.url ?? '',
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

  const beforeUpload = (file: UploadFile) => {
    setFileList([file]);
    return false;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ImgCrop rotationSlider>
      <Upload
        action="/api/upload"
        listType="picture"
        fileList={fileList}
        onChange={onChange}
        beforeUpload={beforeUpload}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUploader;
