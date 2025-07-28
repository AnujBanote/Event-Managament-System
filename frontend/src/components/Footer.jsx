import React from "react";

function Footer() {
  return (
    <footer className="text-sm text-center text-[#333] opacity-80 py-4 border-t mt-8">
      © {new Date().getFullYear()} AnujEventHub. All rights reserved.
    </footer>
  );
}

export default Footer;
