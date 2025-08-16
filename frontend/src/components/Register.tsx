import { Form, Button, Alert } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { useAppDispatch } from '../redux/hooks';
import { useRegisterMutation } from '../redux/slices/authApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { User } from '../types';
import { isAPIError } from '../utils';

type RegisterInputs = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

type RegisterProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Register = ({
  showModal,
  setShowModal
}: RegisterProps) => {
  const { register, handleSubmit, formState: {errors} } = useForm<RegisterInputs>();
  const [registerUser, {isError, error, isLoading}] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (newUser: User) => {
    const { token, user } = await registerUser(newUser).unwrap();
    dispatch(setCredentials({token, user}))
    localStorage.setItem('token', token);
    swal(`Welcome ${user.username}!`, 'Good to see you.');
    setShowModal(false);
  };

  return (
    <div className="bodyWrapper">
      <Modal 
        show={showModal} 
        onHide={() => {setShowModal(false)}}
      >
        <Modal.Header>
          <Modal.Title>Register / Create Account</Modal.Title>
          <Button 
            className="text-white p-2 rounded-sm bg-gray-600 w-10 h-10"
            variant="secondary" 
            onClick={() => {setShowModal(false)}}
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form 
            className='flex flex-col gap-2' 
            onSubmit={handleSubmit(onSubmit)}
          >
            { isError &&
              isAPIError(error) && (
              <Alert
                variant='danger'
              >
                {error.data.message}
              </ Alert>
            )}
            <Form.Group 
              className='flex flex-col gap-2'
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register('email', {
                  required: 'You must provide your email'
                })}
                type="email"
              />
              {errors.email && (
                <Alert
                  variant='danger'
                >
                  {errors.email.message}
                </ Alert>
              )}
            </Form.Group>

            <Form.Group 
              className='flex flex-col gap-2'
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                {...register('username', {
                  required: 'You must provide a username'
                })} 
                type="text"
              />
              {errors.username && (
                <Alert
                  variant='danger'
                >
                  {errors.username.message}
                </ Alert>
              )}
            </Form.Group>

            <Form.Group 
              className='flex flex-col gap-2'
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register('password', {
                  required: 'You must provide a password',
                  minLength: {value: 9, message: 'Password must be 9 characters or more'}
                })}
                type="password"
              />
              {errors.password && (
                <Alert
                  variant='danger'
                >
                  {errors.password.message}
                </ Alert>
              )}
            </Form.Group>

            <Form.Group 
              className='flex flex-col gap-2'
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                {...register('firstName', {
                  required: 'You must provide your First Name'
                })}
                type="text"
              />
              {errors.firstName && (
                <Alert
                  variant='danger'
                >
                  {errors.firstName.message}
                </ Alert>
              )}
            </Form.Group>

            <Form.Group className='flex flex-col gap-2'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                {...register('lastName', {
                  required: 'You must provide your Last Name'
                })}
                type="text"
              />
              {errors.lastName && (
                <Alert
                  variant='danger'
                >
                  {errors.lastName.message}
                </ Alert>
              )}
            </Form.Group>

            <Button 
              className="text-white p-2 mr-3 rounded-sm bg-blue-600"
              variant="primary" 
              type="submit"
              disabled={isLoading}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Register;
