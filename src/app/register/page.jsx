"use client";

import axios from "axios";
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
import { useState } from "react";
import DropDown, { MultiSelect } from "@/components/custom/MulltiSelect";
import Footer from "@/components/custom/Footer";
import { ProfilePictureUploadDialog } from "@/components/custom/ProfilePictureUploadDialog";
import { tag } from "@/store/tag";
import { useRouter } from 'next/navigation';
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;



const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Enter Name",
  }),
  email: z
    .string()
    .min(1, {
      message: "Enter Email",
    })
    .email("This is not a valid email."),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  phoneNo: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  interests: z
    .array(z.string())
    .nonempty({ message: "Please select at least one interests." }),
  profileUrl: z.string()
});

function RegisterForm() {
  const router = useRouter()
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNo: "",
      interests: [], // Default value for the multi-select
      profileUrl:""  // initially it stores base64 Image after upload it will store image url
    },
  });
  

  async function onSubmit(data) {
      console.log("register page:",data)
      router.replace("/feed")
      return 
      // Step 1: Request signature and timestamp from the API route
      const SignedResponse = await axios.post('/api/upload');
      const { signature, timestamp } = SignedResponse.data;
  
      // Step 2: Prepare the form data for Cloudinary
      const formData = new FormData();
      formData.append('file', data.profileUrl);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
  
      // Step 3: Upload the image to Cloudinary
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      // Step 4: Return the secure URL of the uploaded image
      data.profileUrl=cloudinaryResponse.data.secure_url;
      console.log(data)
    
    const response = await axios.post(
      "http://localhost:8085/v1/auth/register",
      data
    )
    .then((response)=>{
      setUser(response.data);
      console.log(response);
      setUser(response.data)
      Router.replace("/feed")
    }
    ,(error)=>{
      toast({
        // title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Email is already in use!!</code>
          </pre>
        ),
      });
    })
    console.log(response,"@@@@@@@@@@@@@")

  }

  return (
    <div className="flex flex-col md:flex-row ">
      {/* <left part */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <Card className="mx-auto my-20 max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Register</CardTitle>
            <CardDescription>
              Enter your details below to register to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter Your Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
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
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="phoneNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            id="phoneNo"
                            type="number"
                            placeholder="Enter with Country Code/ +91 8210724381"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
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
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interestss</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={tag}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder="Select Interests"
                            // maxCount={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="profileUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Photo</FormLabel>
                        <FormControl>
                        <ProfilePictureUploadDialog  
                        onSave={field.onChange}
                        onClick={()=>onClick}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button className="w-full mt-80" type="submit">
                  Register
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      {/* right part */}
      <Footer/>
    </div>
  );
}

export default RegisterForm;


