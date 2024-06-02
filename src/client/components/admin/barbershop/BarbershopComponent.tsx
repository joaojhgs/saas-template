'use client';

import React, { useState } from 'react';

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
  UploadProps,
} from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useTranslations } from 'next-intl';

import ImageUploader from '@/client/components/shared/image-uploader/ImageUploader';
import {
  useEditBarbershop,
  useGetBarbershop,
} from '@/client/hooks/useBarbershop';
import { useI18nZodErrorsForm } from '@/client/hooks/useI18nZodErrors';
import { env } from '@/env';
import { UpdateBarbershopInputValidation } from '@/schemas/barbershop';

import Icons from '../../Icons';
import BarbershopPageLoading from './BarbershopLoadingComponent';

const { Title, Paragraph } = Typography;

const BarbershopPage = () => {
  const { data, isLoading } = useGetBarbershop();
  const { mutate: editBarbershop, isPending } = useEditBarbershop();

  const [form] = Form.useForm();
  const [editingField, setEditingField] = useState<string | null>(null);

  const rule = createSchemaFieldRule(UpdateBarbershopInputValidation);
  const t = useI18nZodErrorsForm(useTranslations('forms.barbershop-config'));

  const toggleEditField = (field: string | null) => {
    setEditingField(field === editingField ? null : field);
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      editBarbershop(
        {
          id: data?.data?.id ?? '',
          name: form.getFieldValue('name'),
          description: form.getFieldValue('description'),
        },
        {
          onSuccess: () => {
            setEditingField(null);
            toggleEditField(editingField);
          },
        },
      );
    });
  };

  const handleCancel = () => {
    toggleEditField(null);
    form.resetFields();
  };

  const renderImageUploader = () => {
    const onChange: UploadProps['onChange'] = ({ file }) => {
      if (file && file.status === 'done') {
        if (file.response.data?.fullPath) {
          editBarbershop({
            id: data?.data?.id ?? '',
            picture: `${env.NEXT_PUBLIC_SUPABASE_STORAGE}/${file.response.data?.fullPath}`,
          });
        }
      }
    };
    return (
      <ImageUploader
        src={data?.data?.picture ?? ''}
        onChange={onChange}
        isLoading={isPending}
        alt="Barbershop banner"
        width="100%"
        rootClassName="w-full"
        height={400}
        bucketName="organization"
      >
        <Button type="link">
          <Icons.Pencil />
        </Button>
      </ImageUploader>
    );
  };

  if (isLoading) {
    return <BarbershopPageLoading />;
  }

  return (
    <div>
      <Row gutter={40}>
        <Col xs={24} md={12}>
          <div className="flex justify-center">{renderImageUploader()}</div>
        </Col>
        <Col xs={24} md={12}>
          <Form
            variant="filled"
            style={{ maxWidth: 600, margin: '0 auto' }}
            form={form}
            onFinish={handleSubmit}
            initialValues={data?.data}
          >
            {editingField === 'name' ? (
              <div className="flex items-center">
                <Form.Item className="grow" name="name" rules={[rule]}>
                  <Input />
                </Form.Item>
                <div className="ml-4 flex space-x-2">
                  <Button
                    type="default"
                    onClick={handleCancel}
                    disabled={isPending}
                  >
                    {t('cancel-button')}
                  </Button>
                  <Button type="primary" htmlType="submit" disabled={isPending}>
                    {t('save-button')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Title level={3} className="grow">
                  {data?.data?.name}
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
            <Divider />
            {editingField === 'description' ? (
              <div>
                <Form.Item name="description" rules={[rule]}>
                  <Input.TextArea
                    rows={4}
                    disabled={isPending}
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item>
                <div className="mt-2 flex space-x-2">
                  <Button
                    type="default"
                    onClick={handleCancel}
                    disabled={isPending}
                  >
                    {t('cancel-button')}
                  </Button>
                  <Button type="primary" htmlType="submit" disabled={isPending}>
                    {t('save-button')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <Paragraph>{data?.data?.description}</Paragraph>
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
          </Form>
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export default BarbershopPage;
