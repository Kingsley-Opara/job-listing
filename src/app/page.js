"use client"
import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { GlobalStateProvider } from "./context";

export default function Home() {
  return (
    <GlobalStateProvider>
      <main className="h-fit bg-gray-200 w-full min-h-full">
        <Navbar/>
        <Hero/>
        
      </main>
    </GlobalStateProvider>
  
  );
}
