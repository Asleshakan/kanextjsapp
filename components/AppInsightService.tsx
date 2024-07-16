import { useEffect } from 'react';
import { ApplicationInsights, SeverityLevel } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { useRouter } from 'next/router';

const reactPlugin = new ReactPlugin();
let appInsights: ApplicationInsights | undefined;

const initializeAppInsights = () => {
    if (typeof window !== 'undefined') {
        appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: "7af0aa15-eb10-4be8-855d-f09ba8893902",
                extensions: [reactPlugin],
                extensionConfig: {
                    [reactPlugin.identifier]: {
                        history: undefined, // Remove history config for Next.js
                    },
                },
                enableAutoRouteTracking: true,
                disableTelemetry: false,
            }
        });

        appInsights.loadAppInsights();
    }
};

const logPageView = (url: string) => {
    if (appInsights) {
        appInsights.trackPageView({ uri: url });
    }
};

const logErrorToAppInsights = (error: Error, severityLevel: SeverityLevel = SeverityLevel.Error) => {
    if (appInsights) {
        appInsights.trackException({ exception: error, severityLevel });
    }
};

const AppInsightService: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && !appInsights) {
            initializeAppInsights();
        }

        const handleRouteChange = (url: string) => {
            logPageView(url);
        };

        // Log initial page view on component mount
        if (router.asPath) {
            logPageView(router.asPath);
        }

        // Log route changes
        router.events.on('routeChangeComplete', handleRouteChange);

        // Handle 404 errors (Next.js specific)
        const handle404Error = () => {
            logErrorToAppInsights(new Error(`Page not found: ${window.location.pathname}`), SeverityLevel.Warning);
        };

        router.events.on('routeChangeError', (error: Error) => {
            if (error.message === 'PAGE_NOT_FOUND') {
                handle404Error();
            }
        });

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
            router.events.off('routeChangeError', handle404Error);
        };
    }, [router.events]);

    return null;
};

export { reactPlugin, AppInsightService, logErrorToAppInsights };
