import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import  EdupairLogo from '../../assets/edu-pair.png'

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSessionClick = (objective) => {
    if (objective === 'enroll') {
      navigate('/sessions');  // Redirect to Enroll Session Page
    } else if (objective === 'offer') {
      navigate('/offer-session');  // Redirect to Offer Session Page
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.message || 'Failed to load user data');
        }
      } catch (err) {
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrolledSessions = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/sessions/enrolled', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSessions(data);
        }
      } catch (err) {
        console.log("Error fetching sessions:", err);
      }
    };

    fetchUserData();
    fetchEnrolledSessions();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Slick settings for carousel
  const settings = {
    dots: true,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold">User Info</h2>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Bio:</strong> {userData.bio || 'No bio added yet.'}</p>
      </div>

      {/* Skills and Interests */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold">Skills</h2>
        {userData.skills.length > 0 ? (
          <ul className="list-disc pl-5">
            {userData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No skills added yet.</p>
        )}

        <h2 className="text-xl font-semibold mt-4">Interests</h2>
        {userData.interests.length > 0 ? (
          <ul className="list-disc pl-5">
            {userData.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        ) : (
          <p>No interests added yet.</p>
        )}

        <h2 className="text-xl font-semibold mt-4">Credits</h2>
        <p>{userData.credits} credits</p>
      </div>

      {/* Carousel of Enrolled Sessions */}
      {sessions.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Enrolled Sessions</h2>
          <Slider {...settings}>
            {sessions.map((session, index) => (
              <div key={index} className="p-4">
                <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={EdupairLogo}
                    alt={session.title}
                    className="w-full h-72 object-cover rounded-t-lg fit-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{session.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{session.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Credits Required: {session.creditsRequired}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">You are not enrolled in any sessions yet.</p>
        </div>
      )}

      {/* Session Action Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => handleSessionClick('offer')}
          className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Offer a Session
        </button>
        <button
          onClick={() => handleSessionClick('enroll')}
          className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          View Available Sessions
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
