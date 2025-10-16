import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReviewProvider } from "./contexts/ReviewContext";
// import { AuthProvider } from "./contexts/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Verilock",
  description: "Created by Neurovise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReviewProvider>
        {children}
        </ReviewProvider>
      </body>
    </html>
  );
}
