'use client';

import React, { useEffect, useState } from 'react';

import {
  Button,
  Col,
  Divider,
  Image,
  Input,
  Layout,
  Row,
  Skeleton,
  Typography,
} from 'antd';

import {
  // useEditBarbershop,
  useGetBarbershop,
} from '@/client/hooks/useBarbershop';

import Icons from '../../Icons';

const { Title, Paragraph } = Typography;

const BarbershopPage = () => {
  const { data, isLoading } = useGetBarbershop();
  // const { mutate: editBarbershop } = useEditBarbershop();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (data) {
      setTitle(data?.data?.name ?? '');
      setDescription(data?.data?.description ?? '');
    }
  }, [data]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };

  const toggleEditDescription = () => {
    setIsEditingDescription(!isEditingDescription);
  };

  return (
    <Layout className="md:p-4">
      <Row className="mx-auto max-w-7xl" gutter={[16, 16]}>
        <Col xs={24} md={12} className="flex items-center justify-center">
          {isLoading ? (
            <Skeleton.Image className="h-64 w-full" />
          ) : (
            <Image
              src={data?.data?.picture}
              alt="barbershop"
              className="max-h-64 w-full object-cover"
            />
          )}
        </Col>
        <Col xs={24} md={12} className="flex flex-col">
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 1 }} />
          ) : isEditingName ? (
            <div className="flex items-center">
              <Input
                value={title}
                onChange={handleTitleChange}
                className="w-3/4"
              />
              <Button type="primary" onClick={toggleEditName} className="ml-4">
                <Icons.CheckCircle />
              </Button>
            </div>
          ) : (
            <div className="flex items-center">
              <Title level={3} className="grow">
                {title}
              </Title>
              <Button
                type="primary"
                onClick={toggleEditName}
                className="ml-4 mt-2"
              >
                <Icons.Pencil />
              </Button>
            </div>
          )}
          <Divider />

          {isLoading ? (
            <Skeleton active paragraph={{ rows: 4 }} />
          ) : isEditingDescription ? (
            <div>
              <Input.TextArea
                value={description}
                onChange={handleDescriptionChange}
                rows={4}
              />
              <div className="mt-2 flex space-x-2">
                <Button type="default" onClick={toggleEditDescription}>
                  Cancel
                </Button>
                <Button type="primary" onClick={toggleEditDescription}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <Paragraph>{description}</Paragraph>
              <Button
                type="primary"
                onClick={toggleEditDescription}
                className="mt-2 self-start"
              >
                Edit Description
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <Divider />
    </Layout>
  );
};

export default BarbershopPage;
