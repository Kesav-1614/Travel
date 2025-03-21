import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useFetchData = () => {
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login'); // Redirect if token is not available
        return;
      }

      const response = await axios.get('/get-user-travel-requests/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect if unauthorized
      } else {
        console.error('Error fetching travel requests:', error);
      }
    }
  };

  return { fetchData };
};

export default useFetchData;
