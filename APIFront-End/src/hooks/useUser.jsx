import { useState, useEffect } from 'react';

const useUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (loginRequest) => {
    setLoading(true);
    const params = new URLSearchParams(loginRequest);

    try {
      const response = await fetch(`https://localhost:7051/users/login?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} ${response.statusText}, Details: ${JSON.stringify(errorData)}`);
      }

      const userData = await response.json();
      setData(userData);
      setLoading(false);
    } catch (error) {
      setError("User not found");
      setLoading(false);
    }
  };

  return [data, loading, error, loginUser];
};

export default useUser;

/*
      navigate("/")
      window.location.reload(); */