import { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import Sidebar from './Sidebar';
import TravelRequestDetails from './TravelRequestDetails';
import ApplyTravelRequest from './ApplyTravelRequest';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('apply');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsSidebarOpen(true); // Show sidebar in desktop view
    } else {
      setIsSidebarOpen(false); // Hide sidebar in mobile view
    }
  };

  // Close sidebar if user clicks outside (for mobile only)
  const handleClickOutside = (event) => {
    if (!event.target.closest('.sidebar') && !event.target.closest('.hamburger') && window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dashboard-container" onClick={handleClickOutside}>
      {/* Hamburger Button */}
      <div
        className={`hamburger ${isSidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar setActivePage={setActivePage} />
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {activePage === 'apply' ? <ApplyTravelRequest /> : <TravelRequestDetails />}
      </div>
    </div>
  );
};

export default Dashboard;
