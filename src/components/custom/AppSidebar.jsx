import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserCircle, ListTodo, PlusCircle, Search } from "lucide-react";
import { ProfileDialog } from "./ProfileDialog";
import { set } from "date-fns";
import { AddTask } from "./AddTask";

export function AppSidebar() {
  return (
    <Sidebar className="border-black">
      <SidebarHeader className="bg-black">
        {/* <SidebarTrigger className="p-4 mr-4 bg-white" onclick={()=>setToggle(true)}/> */}
          <div className="bg-black h-8 m-0"></div>
      </SidebarHeader>
      <SidebarHeader className="mt-2">
        <Input type="text" placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                {/* View Profile */}
                <UserCircle className="mr-2 h-4 w-4" />
                <ProfileDialog />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <ListTodo className="mr-2 h-4 w-4" />
                Your tasks
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <PlusCircle className="mr-2 h-4 w-4" />
                {/* Add task */}
                <AddTask/>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="useCurrentLocation" />
                <Label htmlFor="useCurrentLocation">Use Current Location</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="byMe" />
                <Label htmlFor="byMe">By Me</Label>
              </div>
              <Button className="w-full">Apply</Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarHeader>
        <Button
        // onClick={handleLogOut}
        >
          Sign Out
        </Button>
      </SidebarHeader>
    </Sidebar>
  );
}
