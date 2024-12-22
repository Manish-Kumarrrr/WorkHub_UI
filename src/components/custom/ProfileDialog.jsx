'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Mail, Phone } from 'lucide-react'
import { userStore } from '@/store/userStore'



export function ProfileDialog() {
  
  const user = userStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="text-primary hover:underline cursor-pointer w-full h-full">View Profile</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profileUrl} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground flex items-center justify-center mt-1">
              <Calendar className="mr-2 h-4 w-4" />
              {/* Joined {user.date} */}
              {/* Joined {user.joinDate && (format(user.joinDate, 'MMMM d, yyyy'))} */}
              {/* Joined {format(user.joinDate, 'MMMM d, yyyy')} */}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user?.interests?.map((interest, index) => (
                <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Information</h3>
            <p className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              {user?.email}
            </p>
            <p className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              {user?.phoneNo}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

