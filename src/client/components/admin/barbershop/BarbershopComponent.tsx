'use client';

import React, { useEffect, useState } from 'react';

import {
  Button,
  Col,
  Divider,
  Flex,
  Image,
  Input,
  Layout,
  Row,
  Typography,
} from 'antd';

import useBarbershop from '@/client/hooks/useBarbershop';

import Icons from '../../Icons';

const { Title, Paragraph } = Typography;

const BarbershopPage = () => {
  const { data } = useBarbershop();
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
    <Layout>
      <Row className="m-10 p-10">
        <Col span={12}>
          <Image src={data?.data?.picture} alt="barbershop" />
        </Col>
        <Col span={12}>
          {isEditingName ? (
            <>
              <Input
                value={title}
                onChange={handleTitleChange}
                className="mb-4 w-80"
              />
              <Button
                type="primary"
                onClick={toggleEditName}
                className="ml-4 mt-2"
              >
                <Icons.CheckCircle />
              </Button>
            </>
          ) : (
            <>
              <Flex>
                <Title>{title}</Title>
                <Button
                  type="primary"
                  onClick={toggleEditName}
                  className="ml-4 mt-2"
                >
                  <Icons.Pencil />
                </Button>
              </Flex>
            </>
          )}

          {isEditingDescription ? (
            <>
              <Input.TextArea
                value={description}
                onChange={handleDescriptionChange}
                rows={4}
              />
              <Button
                type="primary"
                onClick={toggleEditDescription}
                className="ml-4 mt-2"
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Flex>
                <Paragraph>{description}</Paragraph>
                <Button
                  type="primary"
                  onClick={toggleEditDescription}
                  className="ml-4 mt-2"
                >
                  Edit
                </Button>
              </Flex>
            </>
          )}
        </Col>
      </Row>
      <Divider />
    </Layout>
  );
};

export default BarbershopPage;
