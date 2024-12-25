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
    <Sidebar className="border-customBg bg-customeBg text-itemOnCustomBg ">
      <SidebarHeader className="bg-customBg">
        {/* <SidebarTrigger className="p-4 mr-4 bg-white" onclick={()=>setToggle(true)}/> */}
          <div className="bg-customBg h-8 m-0"></div>
      </SidebarHeader>
      <SidebarHeader className="mt-2">
        <Input type="text" placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent className="bg-customBg ">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem >
              <SidebarMenuButton className="hover:bg-faintCustomBg ">
                {/* View Profile */}
                <UserCircle className="mr-2 h-4 w-4 text-itemOnCustomBg " />
                <ProfileDialog />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
            <a href="/mytask" >
              <SidebarMenuButton className="hover:underline hover:bg-faintCustomBg  hover:text-itemOnCustomBg text-itemOnCustomBg ">
                <ListTodo className="mr-2 h-4 w-4 text-itemOnCustomBg" />
                My Tasks 
              </SidebarMenuButton>
            </a>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-faintCustomBg ">
                <PlusCircle className="mr-2 h-4 w-4 text-itemOnCustomBg" />
                {/* Add task */}
                <AddTask/>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-itemOnCustomBg text-balance ">Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="useCurrentLocation" className="bg-itemOnCustomBg"/>
                <Label htmlFor="useCurrentLocation">Use Current Location</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="byMe" className="bg-itemOnCustomBg" />
                <Label htmlFor="byMe">By Me</Label>
              </div>
              <Button className="w-full">Apply</Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarHeader>
        <Button
        // onClick={handleLogOut}
        >
          Sign Out
        </Button>
      </SidebarHeader> */}
    </Sidebar>
  );
}
