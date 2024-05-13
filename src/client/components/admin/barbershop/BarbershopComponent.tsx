'use client';

import React, { useEffect, useState } from 'react';

import { Card, Flex, Typography } from 'antd';

const BarbershopComponent: React.FC = () => {
  const [cardsPerRow, setCardsPerRow] = useState(5);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        setCardsPerRow(4);
      } else if (screenWidth >= 992) {
        setCardsPerRow(3);
      } else if (screenWidth >= 768) {
        setCardsPerRow(2);
      } else {
        setCardsPerRow(1);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Flex className="w-full" vertical={true}>
      <Card className="p-10" title="Informações da Barbearia">
        <Flex className="w-full p-10">
          <img
            alt="avatar"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            style={{ marginRight: '20px' }}
          />
          <Flex vertical={true} className="w-full p-10">
            <Typography.Title level={1}>Nome da Barbearia</Typography.Title>
            <Typography.Title level={3}>
              Descrição da Barbearia Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Quas in doloremque assumenda qui temporibus quae
              non, aperiam aliquam quisquam iure error fugiat quidem ipsum ea
              placeat deleniti perspiciatis obcaecati sequi!
            </Typography.Title>
          </Flex>
        </Flex>
      </Card>

      <Card className="p-10" title="Barbeiros">
        <Flex wrap="wrap" className="w-full p-10">
          {Array.from({ length: 8 }, (_, index) => (
            <Card
              key={index}
              style={{
                width: `${100 / cardsPerRow}%`,
                margin: '0 10px 20px 0',
              }}
            >
              <img
                alt="avatar"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <Typography.Title level={4}>
                Barbeiro {index + 1}
              </Typography.Title>
            </Card>
          ))}
        </Flex>
      </Card>
    </Flex>
  );
};

export default BarbershopComponent;
