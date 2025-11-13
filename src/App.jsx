import { CssBaseline } from '@mui/material';
import { DashboardProvider } from './features/dashboard/context/DashboardContext';
import { DashboardFormsProvider } from './features/dashboard-forms';
import { ThemeProvider } from './shared/context/ThemeContext';
import { UserProvider } from './shared/context/UserContext';

import './App.css';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <DashboardProvider>
          <DashboardFormsProvider>
            <CssBaseline />
            <AppRoutes />
          </DashboardFormsProvider>
        </DashboardProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
