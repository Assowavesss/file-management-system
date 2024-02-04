import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from '../UserContext';

import EvaluationFormPage from './components/Pages/EvaluationFormPage';
import MeetingPage from './components/Pages/MeetingPage';
import ReportValidationPage from './components/Pages/ReportValidationPage';
import InternshipPage from './components/Pages/InternshipPage';
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import UploadPage from './components/Pages/UploadPage';
import Navbar from './components/NavBar/NavBar';
import IntershipsAllPage from './components/Pages/IntershipsAllPage.tsx';
import './App.css';
import { Box, CssBaseline, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';
import ProfilePage from './components/Pages/ProfilePage.tsx';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <Stack
            direction={'column'}
            sx={{
              minHeight: '100vh',
              width: '100vw',
            }}
          >
            <Navbar />
            <Box
              sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Routes>
                <Route path="/internship" element={<InternshipPage />} />
                <Route path="/meeting" element={<MeetingPage />} />
                <Route
                  path="/evaluation-form"
                  element={<EvaluationFormPage />}
                />
                <Route
                  path="/report-validation"
                  element={<ReportValidationPage />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/all-internships"
                  element={<IntershipsAllPage />}
                />
                <Route
                  path="/all-internships/:internshipId"
                  element={<UploadPage />}
                />
              </Routes>
            </Box>
          </Stack>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
