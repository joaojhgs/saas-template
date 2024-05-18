'use client';

import React, { useEffect, useState } from 'react';

import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Layout,
  Row,
  Skeleton,
  Typography,
} from 'antd';

import {
  useEditBarbershop,
  useGetBarbershop,
} from '@/client/hooks/useBarbershop';

import Icons from '../../Icons';

const { Title, Paragraph } = Typography;

const BarbershopPage = () => {
  const { data, isLoading } = useGetBarbershop();
  const { mutate: editBarbershop } = useEditBarbershop();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [editingField, setEditingField] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setName(data?.data?.name ?? '');
      setDescription(data?.data?.description ?? '');
    }
  }, [data]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const toggleEditField = (field: string | null) => {
    setEditingField(field === editingField ? null : field);
  };

  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.setFieldValue(editingField, form.getFieldValue(editingField));
    editBarbershop(
      {
        id: '9854482e-2198-47cd-9895-e2f805a01360',
        name,
        description,
      },
      {
        onSuccess: () => {
          setEditingField(null);
          toggleEditField(editingField);
        },
      },
    );
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
          <Form variant="filled" style={{ maxWidth: 600 }} form={form}>
            <Form.Item name="name">
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 1 }} />
              ) : editingField === 'name' ? (
                <div className="flex items-center">
                  <Input
                    value={name}
                    onChange={handleTitleChange}
                    className="w-3/4"
                  />
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    className="ml-4"
                  >
                    <Icons.CheckCircle />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center">
                  <Title level={3} className="grow">
                    {name}
                  </Title>
                  <Button
                    type="primary"
                    onClick={() => toggleEditField('name')}
                    className="ml-4 mt-2"
                    disabled={editingField !== null && editingField !== 'name'}
                  >
                    <Icons.Pencil />
                  </Button>
                </div>
              )}
            </Form.Item>

            <Divider />

            <Form.Item name="description">
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : editingField === 'description' ? (
                <div>
                  <Input.TextArea
                    value={description}
                    onChange={handleDescriptionChange}
                    rows={4}
                  />
                  <div className="mt-2 flex space-x-2">
                    <Button
                      type="default"
                      onClick={() => toggleEditField('description')}
                    >
                      Cancel
                    </Button>
                    <Button type="primary" onClick={handleSubmit}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <Paragraph>{description}</Paragraph>
                  <Button
                    type="primary"
                    onClick={() => toggleEditField('description')}
                    className="mt-2 self-start"
                    disabled={
                      editingField !== null && editingField !== 'description'
                    }
                  >
                    Edit Description
                  </Button>
                </div>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Divider />
    </Layout>
  );
};

export default BarbershopPage;
