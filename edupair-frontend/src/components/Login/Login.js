import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        // if (username === 'himanshu' && password === 'himanshu@1234') {
        //     // Temporary successful login
        //     localStorage.setItem('token', 'dummy_token_himanshu');
        //     navigate('/dashboard');
        if (data.token) {
            localStorage.setItem('token', data.token);
            navigate('/dashboard'); // Redirect after login
        } else {
            alert('Login failed!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="bg-white p-8 rounded-2xl shadow-md w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to EduPair</h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don’t have an account?{' '}
                    <span
                        onClick={() => navigate('/register')}
                        className="text-blue-500 cursor-pointer hover:underline"
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
