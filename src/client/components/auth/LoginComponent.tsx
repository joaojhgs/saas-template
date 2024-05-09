'use client';

import React from 'react';

import { Form, Input } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useTranslations } from 'next-intl';

import { useI18nZodErrorsForm } from '@/client/hooks/useI18nZodErrors';
import useLogin from '@/client/hooks/useLogin';
import { SignInPasswordInputValidation } from '@/schemas/auth-schemas';
import { ISignInPasswordInput } from '@/utils/interfaces';

const LoginComponent: React.FC = () => {
  const rule = createSchemaFieldRule(SignInPasswordInputValidation);
  const t = useI18nZodErrorsForm(useTranslations('forms.sign-in-component'));
  const { mutate } = useLogin();

  const handleSubmit = (values: ISignInPasswordInput) => {
    mutate(values);
  };

  return (
    <Form
      className="z-10 flex justify-center  self-center"
      onFinish={handleSubmit}
    >
      <div className="mx-auto w-96 rounded-3xl bg-white p-12 ">
        <div className="mb-7">
          <h3 className="text-2xl font-semibold text-gray-800">
            {t('sign-in')}
          </h3>
          <p className="text-gray-400">
            {t('dont-have-an-account')}
            <a
              href="#"
              className="text-sm text-purple-700 hover:text-purple-700"
            >
              {t('contact-us')}
            </a>
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <Form.Item name="email" rules={[rule]}>
              <Input
                className="w-full rounded-lg  border border-gray-200 bg-gray-200 px-4 py-3  text-sm focus:border-purple-400 focus:bg-gray-100 focus:outline-none"
                placeholder={t('email')}
              />
            </Form.Item>
          </div>

          <div className="relative" x-data="{ show: true }">
            <Form.Item name="password" rules={[rule]}>
              <Input.Password
                placeholder={t('password')}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-200 focus:border-purple-400 focus:bg-gray-100 focus:outline-none"
              />
            </Form.Item>
          </div>

          <div className="flex items-center justify-between">
            <div className="ml-auto text-sm">
              <a href="#" className="text-purple-700 hover:text-purple-600">
                {t('forgot-your-password')}
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full cursor-pointer justify-center  rounded-lg bg-purple-800 p-3  font-semibold tracking-wide text-gray-100  transition duration-500 ease-in hover:bg-purple-700"
            >
              {t('sign-in')}
            </button>
          </div>
          <div className="my-5 flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-100"></span>
            <span className="font-normal text-gray-300">or</span>
            <span className="h-px w-16 bg-gray-100"></span>
          </div>
          <div className="flex w-full justify-center gap-5 ">
            <button
              type="submit"
              className="mb-6 flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 p-3 text-sm font-medium tracking-wide  text-gray-500 transition duration-500  ease-in hover:border-gray-900 hover:bg-gray-900 md:mb-0"
            >
              <svg
                className="mr-2 w-4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                />
                <path
                  fill="#34A853"
                  d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                />
                <path
                  fill="#4A90E2"
                  d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LoginComponent;
