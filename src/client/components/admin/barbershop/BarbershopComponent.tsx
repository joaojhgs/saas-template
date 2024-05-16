'use client';

import React from 'react';

import { Col, Divider, Flex, Image, Layout, Row, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const BarbershopPage = () => {
  const renderBarberCard = () => {
    return (
      <Col span={4}>
        <Flex vertical={true} className="items-center p-10">
          <Image
            src="https://t4.ftcdn.net/jpg/02/10/97/19/360_F_210971959_wXcBYfif7jKeyKkHKhVyOnzQWHawIgK4.jpg"
            alt="barbershop"
          />
          <Title level={4}>Nome barbearia</Title>
        </Flex>
      </Col>
    );
  };
  return (
    <Layout>
      <Row className="m-10 p-10">
        <Col span={12}>
          <Image
            src="https://t4.ftcdn.net/jpg/02/10/97/19/360_F_210971959_wXcBYfif7jKeyKkHKhVyOnzQWHawIgK4.jpg"
            alt="barbershop"
          />
        </Col>
        <Col span={12}>
          <Title>BarberShop</Title>
          <Paragraph>
            BarberShop description Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Provident, mollitia! Aperiam reiciendis quod
            harum, id quia aut nisi quae unde eligendi cupiditate eius quam
            adipisci atque consequuntur laudantium ex dolore.
          </Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row>
        {[...Array(12)].map((_, index) => (
          <React.Fragment key={index}>{renderBarberCard()}</React.Fragment>
        ))}
      </Row>
    </Layout>
  );
};

export default BarbershopPage;
