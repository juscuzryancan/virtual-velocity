import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/slices/authApiSlice";
import { isAPIError } from "../utils";
import { setCredentials } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { Link } from "react-router";
import {
  Card,
  CardAction,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Eye } from "lucide-react";

const Register = () => {
  const formSchema = z.object({
    username: z.string().min(1, {
      message: "Username required",
    }),
    password: z.string().min(8, {
      message: "Password required: Must be at least 8 characters",
    }),
    email: z.string().min(1, {
      message: "Email required",
    }),
    firstName: z.string().min(1, {
      message: "First Name required",
    }),
    lastName: z.string().min(1, {
      message: "Last Name required",
    }),
    retypePassword: z.string().min(1, {
      message: "Please retype your password",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      retypePassword: "",
      email: "",
      firstName: "",
      lastName: "",
    },
  });
  const [registerUser, { isError, error, isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  let showPassword = false;
  const navigate = useNavigate();

  const onSubmit = async (newUser: z.infer<typeof formSchema>) => {
    const { password, retypePassword } = newUser;
    if (password !== retypePassword) {
      form.setError("password", {
        type: "Password Error",
        message: "Your passwords must match",
      });
      form.setError("retypePassword", {});
      return;
    }

    const { token, user } = await registerUser(newUser).unwrap();
    dispatch(setCredentials({ token, user }));
    localStorage.setItem("token", token);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center m-16">
      <Card className="w-[500px] flex flex-col shadow-2xl drop-shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Love to have you join as a trader</CardDescription>
          {isError && isAPIError(error) && (
            <div className="text-sm rounded-sm text-red-600 bg-red-100 border-red-500 p-2">
              {error.data.message}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type={!showPassword ? "password" : "text"}
                        {...field}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retypePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retype Your Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type={!showPassword ? "password" : "text"}
                        {...field}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        type="email"
                        {...field}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        type="text"
                        {...field}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        type="text"
                        {...field}
                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline" disabled={isLoading} type="submit">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div>
            Already have an Account?
            <Button variant="link" asChild>
              <Link to="/login">Login here</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
