'use client';

import React, { useEffect, useState } from 'react';

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useTranslations } from 'next-intl';

import {
  useEditBarbershop,
  useGetBarbershop,
} from '@/client/hooks/useBarbershop';
import { useI18nZodErrorsForm } from '@/client/hooks/useI18nZodErrors';
import { UpdateBarbershopInputValidation } from '@/schemas/barbershop';

import Icons from '../../Icons';
import ImageUploader from './components/image-uploader/ImageUploader';

const { Title, Paragraph } = Typography;

const BarbershopPage = () => {
  const { data, isLoading } = useGetBarbershop();
  const { mutate: editBarbershop, isPending } = useEditBarbershop();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [form] = Form.useForm();

  const [editingField, setEditingField] = useState<string | null>(null);

  const rule = createSchemaFieldRule(UpdateBarbershopInputValidation);

  const t = useI18nZodErrorsForm(useTranslations('forms.barbershop-config'));

  useEffect(() => {
    if (data) {
      setName(data?.data?.name ?? '');
      setDescription(data?.data?.description ?? '');
    }
  }, [data, form]);

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

  const handleSubmit = () => {
    form.setFieldValue(editingField, form.getFieldValue(editingField));
    editBarbershop(
      {
        id: data?.data?.id ?? '',
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

  const handleCancel = () => {
    toggleEditField(null);
    setName(data?.data?.name ?? '');
    setDescription(data?.data?.description ?? '');
    form.resetFields();
  };

  return (
    <Layout className="w-full md:p-4">
      <Row className="mx-auto max-w-7xl" gutter={8}>
        <Col xs={24} md={12} className="flex items-center justify-center">
          {isLoading ? (
            <Skeleton.Image className="h-64 w-full" />
          ) : (
            <ImageUploader />
          )}
        </Col>

        <Col xs={24} md={12} className="flex flex-col">
          <Form
            variant="filled"
            style={{ maxWidth: 600 }}
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" rules={[rule]}>
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 1 }} />
              ) : editingField === 'name' ? (
                <div className="flex items-center">
                  <Input
                    value={name}
                    onChange={handleTitleChange}
                    disabled={isPending}
                  />
                  <div className="ml-4 flex space-x-2">
                    <Button
                      type="default"
                      onClick={handleCancel}
                      disabled={isPending}
                    >
                      {t('cancel-button')}
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={isPending}
                    >
                      {t('save-button')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <Title level={3} className="grow">
                    {name}
                  </Title>
                  <Button
                    type="link"
                    onClick={() => toggleEditField('name')}
                    className="mb-3 ml-4"
                    disabled={editingField !== null && editingField !== 'name'}
                  >
                    <Icons.Pencil />
                  </Button>
                </div>
              )}
            </Form.Item>

            <Divider />

            <Form.Item name="description" rules={[rule]}>
              {isLoading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : editingField === 'description' ? (
                <div>
                  <Input.TextArea
                    value={description}
                    onChange={handleDescriptionChange}
                    rows={4}
                    disabled={isPending}
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                  <div className="mt-2 flex space-x-2">
                    <Button
                      type="default"
                      onClick={handleCancel}
                      disabled={isPending}
                    >
                      {t('cancel-button')}
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={isPending}
                    >
                      {t('save-button')}
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
                    {t('edit-description-button')}
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
