'use client';

import React from 'react';

import { Form, Input } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useTranslations } from 'next-intl';

import { useI18nZodErrorsForm } from '@/client/hooks/misc/useI18nZodErrors';
import useLogin from '@/client/hooks/server-actions/useLogin';
import { ISignInPasswordInput, SignInPasswordInputValidation } from '@/schemas';

import Icons from '../Icons';

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
              className="text-purple-700 hover:text-purple-700 pl-2 text-sm"
            >
              {t('contact-us')}
            </a>
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <Form.Item name="email" rules={[rule]}>
              <Input
                className="focus:border-purple-400 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none"
                placeholder={t('email')}
              />
            </Form.Item>
          </div>

          <div className="relative" x-data="{ show: true }">
            <Form.Item name="password" rules={[rule]}>
              <Input.Password
                placeholder={t('password')}
                className="focus:border-purple-400 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-200 focus:bg-gray-100 focus:outline-none"
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
              className="bg-purple-800 hover:bg-purple-700 flex w-full  cursor-pointer justify-center rounded-lg  p-3 font-semibold tracking-wide  text-gray-100 transition duration-500 ease-in"
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
              className="text-gray-white mb-6 flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 p-3 text-sm font-medium  tracking-wide transition duration-500  ease-in hover:border-gray-900 hover:bg-gray-900 md:mb-0"
            >
              <Icons.Google />
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LoginComponent;
