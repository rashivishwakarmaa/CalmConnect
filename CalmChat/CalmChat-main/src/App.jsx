import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Exercises from './pages/Exercises';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Appointments from './pages/Appointments';
import MyAppointments from './pages/MyAppointments';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
