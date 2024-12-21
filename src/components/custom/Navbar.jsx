import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { userStore } from "@/store/userStore";

function Navbar() {
  const user = userStore((state) => state.user);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 bg-black shadow-md">
      {/* Sidebar Trigger on the Left */}
      <div className="flex items-center">
        <SidebarTrigger className="mr-4 bg-white" />
      </div>

      {/* Centered "WorkHub" Text */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-extrabold font-serif text-2xl tracking-wide drop-shadow-lg">
        WorkHub
      </div>

      {/* Avatar on the Right */}
      <div className="flex items-center">
        <Avatar className="cursor-pointer md:flex p-0 mr-4">
          <AvatarImage
            src={user.profileUrl}
            alt={`${user.name}'s avatar`}
            className="p-0 m-0"
          />
          <AvatarFallback>
            {user.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

export default Navbar;
