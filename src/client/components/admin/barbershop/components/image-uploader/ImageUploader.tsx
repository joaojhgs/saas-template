'use client';

import React, { useState } from 'react';

import { Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

const ImageUploader = () => {
  // const { data } = useGetBarbershop();
  // const { mutate: editBarbershop } = useEditBarbershop();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        action="/api/upload"
        listType="picture"
        fileList={fileList}
        onChange={onChange}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUploader;
