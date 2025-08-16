import { SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { useLoginMutation } from '../redux/slices/authApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { isAPIError } from '../utils';
import { useGetCartQuery } from '../redux/slices/ordersApiSlice';
import { useNavigate } from 'react-router-dom';

type LoginInputs = {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const [login, {isError, error, isLoading}] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginInputs> = async ({username, password}) => {
    navigate('/');
    const { token, user } = await login({username, password}).unwrap();
    dispatch(setCredentials({token, user}))
    localStorage.setItem('token', token);
    swal(`Welcome back ${username}!`, 'Good to see you again.');
  };

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {isError && isAPIError(error) && (
        <div style={{ 
          fontSize: '14px', 
          color: 'red', 
          backgroundColor: '#fef2f2', 
          border: '1px solid #fecaca', 
          borderRadius: '4px', 
          padding: '8px' 
        }}>
          {error.data.message}
        </div>
      )}
      <form 
        style={{ display: 'flex', gap: '8px' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register('username', {
            required: 'Username is required'
          })}
          type='text'
          placeholder='username'
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <input
          {...register('password', {
            required: 'Password is required'
          })}
          type='password'
          placeholder='password'
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          disabled={isLoading}
          type='submit'
          style={{
            padding: '8px 16px',
            backgroundColor: '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.5 : 1
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
