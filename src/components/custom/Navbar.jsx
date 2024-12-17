'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { userStore } from '@/store/userStore'



export default function Navbar() {
  // Simulating a user object with an avatar URL
// const user = {
//   avatarUrl: "https://github.com/shadcn.png",
//   name: "John Doe"
// }
const user = userStore((state) => state.user);

  return (
    <nav className="border-b bg-black">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            <div className="text-white font-extrabold font-serif text-2xl md:text-3xl tracking-wide drop-shadow-lg">
              WorkHub
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block relative text-white ">
            <Search className="absolute left-2 top-2.5 h-4 w-4 " />
            <Input placeholder="Search" className="pl-8 w-[200px] lg:w-[300px] text-white" />
          </div>
          <Button 
            variant="default" 
            size="sm" 
            className=" border-white border-1"
          >
            Add Task
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hidden md:flex">
                <AvatarImage src={user.profileUrl} alt={`${user.name}'s avatar`} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-none">
              <DropdownMenuItem>
                <Link href="/profile">Update Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/my-posts">My Posts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/faq">FAQ</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={() => console.log('Logout clicked')}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Add Task
                </Button>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
                <Link href="/profile" className="text-sm">Update Profile</Link>
                <Link href="/my-posts" className="text-sm">My Posts</Link>
                <Link href="/faq" className="text-sm">FAQ</Link>
                <button onClick={() => console.log('Logout clicked')} className="text-sm text-left">Logout</button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

