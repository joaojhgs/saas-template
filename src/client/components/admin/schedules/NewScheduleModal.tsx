import React from 'react';

import { Button, Form, Input, Modal } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { Except } from 'type-fest';

import { useI18nZodErrorsForm } from '@/client/hooks/useI18nZodErrors';
import {
  CreateScheduleBarberInput,
  ICreateScheduleBarberInput,
} from '@/schemas/schedules';

interface NewScheduleModalProps {
  visible:
    | {
        start: dayjs.Dayjs;
        end: dayjs.Dayjs;
      }
    | undefined;
  onCancel: () => void;
}

const NewScheduleModal: React.FC<NewScheduleModalProps> = ({
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm<Except<ICreateScheduleBarberInput, 'status'>>();
  const t = useI18nZodErrorsForm(useTranslations('forms.new-schedule-barber'));
  const rule = createSchemaFieldRule(CreateScheduleBarberInput);

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Handle form submission here
      console.log(values);
      form.resetFields();
      onCancel();
    });
  };

  // const disabledDate: RangePickerProps['disabledDate'] = (date, info) => {
  //   const ValidateRange = CreateScheduleBarberInput.pick({
  //     schedule_range: true,
  //   });
  //   try {
  //     ValidateRange.parse({
  //       schedule_range: [
  //         info.from?.toISOString() ?? dayjs().add(1, 'minute').toISOString(),
  //         date.toISOString(),
  //       ],
  //     });
  //   } catch (e) {
  //     return true;
  //   }
  //   return false;
  // };

  return (
    <Modal
      open={!!visible}
      title={t('title')}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t('cancel')}
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {t('create')}
        </Button>,
      ]}
    >
      <Form form={form} initialValues={visible} layout="vertical">
        <Form.Item name="user_name" label={t('user_name')} rules={[rule]}>
          <Input />
        </Form.Item>
        <Form.Item name="user_phone" label={t('user_phone')} rules={[rule]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="additional_information"
          label={t('additional-information')}
          rules={[rule]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="allow_notifications"
          label={t('allow-notifications')}
          rules={[rule]}
        >
          <Input.TextArea />
        </Form.Item>
        {/* <Form.Item
          name="schedule_range"
          label={t('schedule_range')}
          initialValue={visible?.start}
          rules={[rule]}
        >
          <DatePicker.RangePicker disabledDate={disabledDate} showTime />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default NewScheduleModal;
