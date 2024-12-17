import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
} from "@/components/ui/sidebar"
import { UserCircle, ListTodo, PlusCircle, Search } from 'lucide-react'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Input type="text" placeholder="Search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <UserCircle className="mr-2 h-4 w-4" />
                Profile
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
                Add task
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
    </Sidebar>
  )
}

