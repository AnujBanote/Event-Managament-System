import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#EAE4D5] text-[#000000] flex flex-col items-center justify-center px-6 relative">
      <h1 className="text-5xl font-bold mb-4 text-[#000000]">
        Welcome to EventHub
      </h1>
      <p className="text-lg text-[#333] opacity-90 mb-8 max-w-xl text-center">
        Discover, book, and manage events with ease. Whether you're an attendee or an organizer, we've got you covered.
      </p>

      <div className="flex gap-6">
        <Link
          to="/events"
          className="bg-[#B6B09F] hover:bg-[#a49e8f] text-white font-semibold px-6 py-2 rounded shadow transition duration-300"
        >
          Browse Events
        </Link>

        <Link
          to="/signup"
          className="bg-[#000000] hover:bg-[#222] text-white font-semibold px-6 py-2 rounded shadow transition duration-300"
        >
          Join Now
        </Link>
      </div>

       
    </div>
  );
}

export default Home;
