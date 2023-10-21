import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import 'react-toastify/dist/ReactToastify.css';
import Otp from './pages/Otp';
import PasswordReset from './pages/PasswordReset';
import ForgotPassword from './pages/ForgotPassword';
import Error from './pages/Error';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<SignUp />} />
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/reset-password' element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
        <Route path="error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
