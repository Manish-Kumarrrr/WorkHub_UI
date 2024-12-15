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



const FormSchema = z.object({
  // name: z.string().min(1, {
  //   message: "Enter Name",
  // }),
  // email: z
  //   .string()
  //   .min(1, {
  //     message: "Enter Email",
  //   })
  //   .email("This is not a valid email."),
  // password: z.string().min(5, {
  //   message: "Password must be at least 5 characters.",
  // }),
  // phoneNo: z
  //   .string()
  //   .min(10, { message: "Must be a valid mobile number" })
  //   .max(14, { message: "Must be a valid mobile number" }),
  // interest: z
  //   .array(z.string())
  //   .nonempty({ message: "Please select at least one interest." }),
  profilePhoto: z.string()
});

function RegisterForm() {
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
      interest: [], // Default value for the multi-select
      profilePhoto:""
    },
  });
  

  async function onSubmit(data) {
    console.log(data,"------------------------------------")

    const cloudinarySignature=await axios.get("http://localhost:8085/v1/auth/cloudinarySignature");
    console.log(cloudinarySignature);
    if(cloudinarySignature.status == 201){

      const timestamp = Math.floor(Date.now() / 1000);
      console.log("ManisH k")
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

      // Prepare form data
      const formData = new FormData();
      formData.append("file", data.profilePhoto);
      formData.append("api_key", cloudinarySignature.data.api_key);
      formData.append("timestamp", timestamp);
      formData.append("signature", cloudinarySignature.data.signature);
    
      // Upload to Cloudinary
      const response = await axios.post(cloudinaryUrl, formData);
      console.log(response)
    }

    
    const response = await axios.post(
      "http://localhost:8085/v1/auth/register",
      data
    )
    .then((response)=>{
      setUser(response.data);
      console.log(response);
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

  }

  const frameworksList = [
    { value: "software", label: "Software Development" },
    { value: "teacher", label: "Teaching" },
    { value: "plumber", label: "Plumber" },
    { value: "carpenter", label: "Carpenter" },
    { value: "helper", label: "Helper" },
  ];

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
                            placeholder="Enter Your Phone Number"
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
                    name="interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interests</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={frameworksList}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder="Select Interests"
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
                    name="profilePhoto"
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
                  Next
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


