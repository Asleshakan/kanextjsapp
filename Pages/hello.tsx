import React from 'react';
import RootLayout from '../components/layout';
import { AppInsightService } from '../components/AppInsightService';
const HelloPage: React.FC = () => {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <p>This is the Hello page.</p>
      <RootLayout>
            <AppInsightService />
        </RootLayout>
    </div>
  );
};
export default HelloPage;