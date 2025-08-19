import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useAppDispatch } from "../redux/hooks";
import { useRegisterMutation } from "../redux/slices/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { User } from "../types";
import { isAPIError } from "../utils";

type RegisterInputs = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

type RegisterProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Register = ({ showModal, setShowModal }: RegisterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();
  const [registerUser, { isError, error, isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (newUser: User) => {
    const { token, user } = await registerUser(newUser).unwrap();
    dispatch(setCredentials({ token, user }));
    localStorage.setItem("token", token);
    swal(`Welcome ${user.username}!`, "Good to see you.");
    setShowModal(false);
  };

  return <Card></Card>;
};

export default Register;
