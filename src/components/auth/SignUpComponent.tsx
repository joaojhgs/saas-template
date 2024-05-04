import React from 'react';

import { Button, Form, Input, notification } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useTranslations } from 'next-intl';

import { useI18nZodErrors } from '@/hooks/useI18nZodErrors';
import { SignUpPasswordInputValidation } from '@/schemas/auth-schemas';
import { registerWithPassword } from '@/server/use-cases/auth';
import { ISignUpPasswordInput } from '@/utils/interfaces';

const SignUpComponent: React.FC = () => {
  useI18nZodErrors();
  const onFinish = (values: ISignUpPasswordInput) => {
    registerWithPassword(values)
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'User registered successfully',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Error',
          description: error.message,
        });
      });
  };

  const rule = createSchemaFieldRule(SignUpPasswordInputValidation);
  const t = useTranslations('forms.sign-up-component');
  return (
    <Form onFinish={onFinish}>
      <Form.Item name="email" label={t('email')} rules={[rule]}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label={t('password')} rules={[rule]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name="confirmPassword" label={t('confirmPassword')}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('signup')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpComponent;
