'use client';

import { Col, Divider, Layout, Row, Skeleton } from 'antd';

const BarbershopPageLoading = () => {
  return (
    <Layout className="w-full md:p-4">
      <Row className="mx-auto max-w-7xl" gutter={8}>
        <Col xs={24} md={12} className="flex items-center justify-center">
          <Skeleton.Image className="h-64 w-full" />
        </Col>

        <Col xs={24} md={12} className="flex flex-col">
          <Skeleton active paragraph={{ rows: 1 }} />

          <Divider />

          <Skeleton active paragraph={{ rows: 4 }} />
        </Col>
      </Row>
      <Divider />
    </Layout>
  );
};

export default BarbershopPageLoading;
