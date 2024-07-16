import React, { useEffect } from 'react';
import RootLayout from '../components/layout';
import { AppInsightService, logErrorToAppInsights } from '../components/AppInsightService';

const ErrorPage: React.FC = () => {
    useEffect(() => {
        // Simulate an error (replace with actual error-prone code)
        try {
            // Simulate an error by throwing a new Error object
            throw new Error('Simulated error in ErrorPage.tsx');
        } catch (error) {
            // Log the error to Application Insights
            if (error instanceof Error) {
                logErrorToAppInsights(error);
            } else {
                // Log non-Error types as well, if needed
                logErrorToAppInsights(new Error(`Caught non-Error: ${error}`));
            }
        }
    }, []);

    return (
        <div>
            <h1>Error Page</h1>
            <p>This page simulates an error.</p>
            <RootLayout>
                <AppInsightService />
                {/* Other content */}
            </RootLayout>
        </div>
    );
};

export default ErrorPage;
