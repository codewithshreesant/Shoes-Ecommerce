import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AminDashboardProtect({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const isAdmin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/user/admin', {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      return res.status === 200;
    } catch (err) {
      console.log("isAdmin error: ", err);
      return false;
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const result = await isAdmin();
      setIsAuthenticated(result);
    };
    
    checkAdmin();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    window.location.href = '/login';
    return null;
  }
}

export default AminDashboardProtect;
