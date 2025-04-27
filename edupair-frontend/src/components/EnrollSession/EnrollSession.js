import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnrollSession() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/sessions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.length) {
          setSessions(data);
        }
      } catch (err) {
        console.error('Error fetching sessions', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const enrollSession = async (sessionId, creditsRequired) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/sessions/${sessionId}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Enrolled successfully!");
        // Update the sessions state to remove the enrolled session
        const updatedSessions = sessions.filter(session => session._id !== sessionId);
        setSessions(updatedSessions);
      } else {
        alert(data.message || "Failed to enroll");
      }
    } catch (err) {
      alert("Error enrolling in session");
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.teacher?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading sessions...</div>;
  }

  if (sessions.length === 0) {
    return (
      <div>
        <button 
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-semibold mt-20" 
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
        <div className="text-center mt-10 text-xl font-semibold text-gray-700">
          🎯 No sessions available right now.<br />
          Offer a session or check back later!
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20">
      {/*  Back Arrow */}
      <button 
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-semibold" 
        onClick={() => navigate('/dashboard')}
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">Available Sessions</h2>

      {/*  Search Bar */}
      <div className="flex items-center gap-2 mb-8">
        <input 
          type="text" 
          placeholder="🔎 Search by title or teacher..." 
          className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            onClick={handleClearSearch} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Clear
          </button>
        )}
      </div>

      {/*  List of filtered sessions */}
      <div className="grid gap-6">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <div key={session._id} className="p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold">{session.title}</h3>
              <p className="text-gray-600 mb-2">Teacher: {session.teacher}</p>
              <p className="text-gray-700">{session.description}</p>
              <p className="text-green-600 mt-2">Credits Required: {session.creditsRequired}</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => enrollSession(session._id, session.creditsRequired)}
              >
                Enroll
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No sessions match your search. 🎯</p>
        )}
      </div>
    </div>
  );
}

export default EnrollSession;
