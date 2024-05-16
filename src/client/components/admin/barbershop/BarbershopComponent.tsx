'use client';

import React, { useEffect, useState } from 'react';

import { Col, Divider, Flex, Image, Layout, Row, Typography } from 'antd';

import useBarbers from '@/client/hooks/useBarbers';

const { Title, Paragraph } = Typography;

interface IBarber {
  name: string;
  picture: string;
  slug: string;
}

const BarbershopPage = () => {
  const { data } = useBarbers();
  const [barbers, setBarbers] = useState<IBarber[]>([]);

  useEffect(() => {
    if (data && data.data) {
      setBarbers(data.data.barbers as IBarber[]);
    }
  }, [data]);

  const renderBarberCard = (barberName: string, barberPicture: string) => {
    return (
      <Col span={4}>
        <Flex vertical={true} className="items-center p-10">
          <Image src={barberPicture} alt="barbershop" />
          <Title level={4}>{barberName}</Title>
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
        {barbers.map((barber: IBarber, index) => (
          <React.Fragment key={index}>
            {renderBarberCard(barber.name, barber.picture)}
          </React.Fragment>
        ))}
      </Row>
    </Layout>
  );
};

export default BarbershopPage;
