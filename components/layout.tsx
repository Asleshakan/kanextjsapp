import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { logErrorToAppInsights, reactPlugin } from './AppInsightService';
import { SeverityLevel } from '@microsoft/applicationinsights-common';
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const handle404Error = () => {
        logErrorToAppInsights(new Error(`Page not found: ${window.location.pathname}`), SeverityLevel.Warning);
    };

    return (
        <AppInsightsContext.Provider value={reactPlugin}>
            {children}
        </AppInsightsContext.Provider>
    );
}
export default Layout;