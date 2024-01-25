import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import EvaluationFormPage from './components/Pages/EvaluationFormPage';
import MeetingPage from './components/Pages/MeetingPage';
import ReportValidationPage from './components/Pages/ReportValidationPage';
import InternshipPage from './components/Pages/InternshipPage';
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import UploadPage from './components/Pages/UploadPage';
import Navbar from './components/NavBar/NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/internship" element={<InternshipPage />} />
        <Route path="/meeting" element={<MeetingPage />} />
        <Route path="/evaluation-form" element={<EvaluationFormPage />} />
        <Route path="/report-validation" element={<ReportValidationPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload-files" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
