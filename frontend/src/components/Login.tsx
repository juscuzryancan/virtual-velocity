import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/slices/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { isAPIError } from "../utils";
import { Link, useNavigate } from "react-router";
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
import { useState } from "react";
import { Eye } from "lucide-react";

const Login = () => {
  const [login, { isError, error, isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formSchema = z.object({
    username: z.string().min(1, {
      message: "Username required",
    }),
    password: z.string().min(1, {
      message: "Password required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async ({
    username,
    password,
  }: z.infer<typeof formSchema>) => {
    try {
      const { token, user } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ token, user }));
      localStorage.setItem("token", token);
      navigate("/");
    } catch (e) {}
  };

  return (
    <div className="flex justify-center items-center m-16">
      <Card className="w-[500px] flex flex-col shadow-2xl drop-shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Welcome Back! Please enter your account info
          </CardDescription>
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
              <Button variant="outline" disabled={isLoading} type="submit">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div>
            Need an account?
            <Button variant="link" asChild>
              <Link to="/register">Register here</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
