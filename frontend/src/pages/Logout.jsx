
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    // Clear localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    history.push('/login');
  }, [history]); 

  return <div>Logging out...</div>;
};

export default Logout;
