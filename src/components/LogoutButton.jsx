const handleLogout = async () => {
    try {
      const response = await fetch('/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        localStorage.clear();
        sessionStorage.clear();
  
        // Force a hard reload
        window.location.href = '/login'; 
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  