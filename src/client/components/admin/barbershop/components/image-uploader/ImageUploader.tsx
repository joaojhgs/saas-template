'use client';

import React from 'react';

// import { Button, Image, Input, Upload, message } from 'antd';
import { Input } from 'antd';

// import Icons from '../../../../Icons';

const ImageUploader = () => {
  //   const [imageUrl, setImageUrl] = useState(
  //     'https://t4.ftcdn.net/jpg/02/10/97/19/360_F_210971959_wXcBYfif7jKeyKkHKhVyOnzQWHawIgK4.jpg',
  //   );

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;

    if (e.target.files) {
      file = e.target.files[0] as File;
    }

    const formdata = new FormData();
    formdata.append('files', file as File);

    const requestOptions = { method: 'POST', body: formdata };

    const response = await fetch('/api/upload', requestOptions);
    const result = await response.text();
    console.log(result);
  };

  //   const uploadProps = {
  //     name: 'file',
  //     accept: 'image/*',
  //     showUploadList: false, // Hide the default upload list
  //     beforeUpload: (file: File) => {
  //       const isImage = file.type.startsWith('image/');
  //       if (!isImage) {
  //         message.error('You can only upload image files!');
  //       }
  //       return isImage;
  //     },
  //     onChange: handleUpload,
  //   };

  return (
    <div className="relative inline-block">
      {/* <Upload {...uploadProps}>
        <Button
          icon={<Icons.Pencil />}
          type="primary"
          className="absolute top-4 left-4 z-10"
        >
          Editar Imagem
        </Button>
      </Upload>
      <Image width={300} src={imageUrl} alt="Banner" className="block" /> */}
      <Input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
};

export default ImageUploader;
