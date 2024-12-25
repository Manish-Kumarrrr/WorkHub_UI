"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userStore } from "@/store/userStore";
import { ForgotPasswordDialog } from "@/components/custom/ForgotPasswordDialog";
import Footer from "@/components/custom/Footer";
const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Enter Email",
    })
    .email("This is not a valid email."),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

function LoginForm() {
  const router = useRouter();
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    
    console.log(data);
    const response = await axios.post(
      "http://localhost:8085/v1/auth/login",
      data,
      { withCredentials: true }// Enable sending and saving cookies
    )
    .then((response) => {
      console.log(response,"@@@@@@@@@login");
      setUser(response.data);
      router.replace("/feed");
    }, (error) => {
      console.log(error);
      toast({
        title: "Wrong Credentials!!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Wrong Credentials!!</code>
          </pre>
        ),
      });
    });
  }

  return (
    <div className="flex flex-col-reverse md:flex-row h-screen">
      {/* Left Section */}
      <Footer/>

      {/* Right Section */}
      <div className=" w-full md:w-1/2 flex items-center justify-center">
        <Card className="mx-auto my-20 max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription>
              Enter your credentials below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter Your Email"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Password</FormLabel>
                            <div>
                              <ForgotPasswordDialog />
                            </div>
                          </div>

                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter Your Password"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </form>
              </Form>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default LoginForm;
