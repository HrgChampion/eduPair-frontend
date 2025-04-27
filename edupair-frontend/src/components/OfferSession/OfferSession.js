import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';
function OfferSession() {
  const [sessionData, setSessionData] = useState({
    title: '',
    description: '',
    creditsRequired: 5,
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionData({
      ...sessionData,
      [name]: value,
    });
  };

  const handleOfferSession = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    try {
      const response = await fetch(`${API_URL}offer-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Session offered successfully! You earned 5 credits.');
        setTimeout(() => {
          navigate('/dashboard'); // Redirect to dashboard after offering session
        }, 2000);
      } else {
        setError(data.message || 'Failed to offer session');
      }
    } catch (err) {
      setError('Error offering session');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Offer a Session</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="title">
            Session Title
          </label>
          <input
            name="title"
            value={sessionData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter session title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="description">
            Session Description
          </label>
          <textarea
            name="description"
            value={sessionData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter session description"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="creditsRequired">
            Credits Required
          </label>
          <input
            type="number"
            name="creditsRequired"
            value={sessionData.creditsRequired}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter credits required for this session"
          />
        </div>

        <button
          onClick={handleOfferSession}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Offer Session
        </button>

        {message && <div className="text-green-500 mt-4">{message}</div>}
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
}

export default OfferSession;
