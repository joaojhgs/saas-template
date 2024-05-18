'use client';

import React, { useEffect, useState } from 'react';

import { Col, Divider, Flex, Image, Layout, Row, Typography } from 'antd';

import useBarbers from '@/client/hooks/useBarbers';
import useBarbershop from '@/client/hooks/useBarbershop';

const { Title, Paragraph } = Typography;

interface IBarber {
  name: string;
  picture: string;
  slug: string;
}

const BarbershopPage = () => {
  const { data } = useBarbers();
  const { data: barberShopData } = useBarbershop();
  const [barbers, setBarbers] = useState<IBarber[]>([]);

  useEffect(() => {
    console.log(data);
    if (data && data.data) {
      setBarbers(data.data as IBarber[]);
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
          <Image src={barberShopData?.data?.picture} alt="barbershop" />
        </Col>
        <Col span={12}>
          <Title>{barberShopData?.data?.name}</Title>
          <Paragraph>{barberShopData?.data?.description}</Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row>
        {barbers.map((barber: IBarber, index) => (
          <React.Fragment key={index}>
            {renderBarberCard(
              barber.name,
              'https://t4.ftcdn.net/jpg/02/10/97/19/360_F_210971959_wXcBYfif7jKeyKkHKhVyOnzQWHawIgK4.jpg',
            )}
          </React.Fragment>
        ))}
      </Row>
    </Layout>
  );
};

export default BarbershopPage;
