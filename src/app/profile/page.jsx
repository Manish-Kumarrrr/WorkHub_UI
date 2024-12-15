'use client'

import { UserProfile } from '@/components/custom/UserProfile'
import { userStore } from "@/store/userStore";
// This would typically come from a database or API
const initialUser = {
  name: "John Doe",
  email: "john@example.com",
  phoneNo: "+1234567890",
  interest: ["technology", "sports"],
  profileUrl: "https://github.com/shadcn.png"
}

export default function ProfilePage() {
    const user = userStore((state) => state.user);
    const setUser = userStore((state) => state.setUser);

  const handleSave = (updatedUser) => {
    // In a real application, you would update the user in your database here
    setUser(updatedUser)
    console.log('Updated user:', updatedUser)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <UserProfile user={user} onSave={handleSave} />
    </div>
  )
}

