import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { userStore } from "@/store/userStore";

function Navbar() {
  const user = userStore((state) => state.user);
  return (
    <nav className="flex items-center justify-between p-4 bg-black ">
      <div className="text-white font-extrabold font-serif text-3xl  tracking-wide drop-shadow-lg">
        WorkHub
      </div>
      <div className="flex items-center">
        <SidebarTrigger className="mr-4 bg-white" />
        <Avatar className="cursor-pointer hidden md:flex">
              <AvatarImage src={user.profileUrl} alt={`${user.name}'s avatar`} />
              <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  )
}
export default Navbar
