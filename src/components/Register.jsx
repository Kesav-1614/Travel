import { useState, useEffect } from 'react';
import { register } from '../services/auth';
import 'animate.css';
import { WOW } from 'wowjs';
import '../styles/register.css'; // ✅ Import the CSS file

function Register() {
  const [data, setData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    is_staff: false,
    is_active: true,
  });
  useEffect(() => {
    document.title = 'Register';
  }, []);

  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(data);
      alert('Registration successful');
      window.location.href = '/login';
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form wow animate__animated animate__fadeInUp">
        <h2 className="wow animate__animated animate__zoomIn">Register</h2>

        <input 
          type="text" 
          placeholder="Username" 
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })} 
          required
          className="wow animate__animated animate__fadeInLeft"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })} 
          required
          className="wow animate__animated animate__fadeInRight"
        />
        <input 
          type="text" 
          placeholder="First Name" 
          value={data.first_name}
          onChange={(e) => setData({ ...data, first_name: e.target.value })} 
          className="wow animate__animated animate__fadeInLeft"
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          value={data.last_name}
          onChange={(e) => setData({ ...data, last_name: e.target.value })} 
          className="wow animate__animated animate__fadeInRight"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })} 
          required
          className="wow animate__animated animate__fadeInLeft"
        />
        
        <div className="checkbox-group wow animate__animated animate__fadeIn">
          <label>
            <input 
              type="checkbox" 
              checked={data.is_staff}
              onChange={(e) => setData({ ...data, is_staff: e.target.checked })}
            />
            Is Staff
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={data.is_active}
              onChange={(e) => setData({ ...data, is_active: e.target.checked })}
            />
            Is Active
          </label>
        </div>

        <button type="submit" className="wow animate__animated animate__bounceIn">Register</button>
      </form>
    </div>
  );
}

export default Register;
