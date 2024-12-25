"use client";
import Navbar from "@/components/custom/Navbar";
import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import Footer from "@/components/custom/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = !["/register", "/login"].includes(pathname);

  return (
    <>
    <SidebarProvider>
      <div className="flex w-screen">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <Navbar />
          <QueryClientProvider client={queryClient}>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
          {/* <main className="flex-1 overflow-auto">{children}</main> */}
          
        </SidebarInset>
      </div>
    </SidebarProvider>
    <Footer />
    </>
  );
}
