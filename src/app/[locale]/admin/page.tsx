import React from 'react';

import { Card } from 'antd';

interface PageProps {
  // Add any props you need for your page component
}

const Page: React.FC<PageProps> = () => {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '16px',
        }}
      >
        <Card title="Card 1">Content of Card 1</Card>
        <Card title="Card 2">Content of Card 2</Card>
        <Card title="Card 3">Content of Card 3</Card>
      </div>
      <Card title="Big Card" style={{ marginTop: '16px' }}>
        Content of Big Card
      </Card>
    </div>
  );
};

export default Page;
