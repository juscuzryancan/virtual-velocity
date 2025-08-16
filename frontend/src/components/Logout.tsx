import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { logOut } from '../redux/slices/authSlice';

const Logout = () => {
  const dispatch = useAppDispatch(); 
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    dispatch(logOut());
    navigate('/');
  }

  return (
    <Button onClick={handleClick}>
      Log Out
    </Button>
  );
}

export default Logout;
