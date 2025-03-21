import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setActivePage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // ✅ Clear token from localStorage
    navigate('/login'); // ✅ Redirect to login page
  };

  return (
    <div className="sidebar-container">
      <ul>
        <li onClick={() => setActivePage('apply')}>Apply for Travel Request</li>
        <li onClick={() => setActivePage('details')}>Travel Request Details</li>
        <li onClick={handleLogout} className="logout-btn">Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
