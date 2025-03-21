import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    React.useEffect(() => {
        document.title = 'Login';
      }, []);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username,
                password
            });

            const { access_token, is_staff } = response.data;

            // ✅ Save token and immediately redirect
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('isStaff', is_staff);

            // ✅ Fast redirect without waiting
            if (is_staff) {
                window.location.replace('/admin-dashboard'); // ✅ Faster redirect
            } else {
                window.location.replace('/user-dashboard'); // ✅ Faster redirect
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.error || error.message);
            alert('Invalid login credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
