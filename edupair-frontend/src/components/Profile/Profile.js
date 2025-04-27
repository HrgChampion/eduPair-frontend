import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch user data from API
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(data);
        setBio(data.bio || '');
        setSkills(data.skills || []);
        setInterests(data.interests || []);
      } else {
        setError(data.message || 'Failed to load user data');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  // Handle profile update
  const handleUpdateProfile = async () => {
    const token = localStorage.getItem('token');
    const updatedData = { bio, skills, interests };

    try {
      const response = await fetch(`${API_URL}profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok) {
        // Re-fetch user data after successful update
        fetchUserData();
        navigate('/dashboard'); // Redirect to dashboard after profile update
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Error updating profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 my-auto">
      <button 
        onClick={() => navigate('/dashboard')} 
        className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mb-4 mt-16"
      >
        &#8592; Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-center mb-4">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">User Info</h2>
          <p><strong>Username:</strong> {userData.username}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Bio</h2>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <input 
            type="text"
            value={skills.join(', ')}
            onChange={(e) => setSkills(e.target.value.split(', '))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Interests</h2>
          <input 
            type="text"
            value={interests.join(', ')}
            onChange={(e) => setInterests(e.target.value.split(', '))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <button
            onClick={handleUpdateProfile}
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
