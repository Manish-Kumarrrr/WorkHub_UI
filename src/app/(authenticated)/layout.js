"use client";
import Navbar from "@/components/custom/Navbar";
import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import Footer from "@/components/custom/Footer";



export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = !["/register", "/login"].includes(pathname);
  
  return (
        <SidebarProvider>
          <div className="flex w-screen">
            <AppSidebar />
            <SidebarInset className="flex flex-col">
              <Navbar />
              <main className="flex-1 overflow-auto ">{children}</main>
              <Footer/>
            </SidebarInset>
          </div>
        </SidebarProvider>
  );
}
