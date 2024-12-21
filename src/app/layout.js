"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/custom/Navbar";
import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import Footer from "@/components/custom/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "WorkHub",
//   description: "",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = !["/register", "/login"].includes(pathname);
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {/* <SidebarProvider>
          <div className="flex w-screen">
            <AppSidebar />
            <SidebarInset className="flex flex-col">
              <Navbar /> */}
              <main className="flex-1 overflow-auto ">{children}</main>
              <Toaster />
              {/* <Footer/>
            </SidebarInset>
          </div>
        </SidebarProvider> */}
      </body>
    </html>
  );
}
