import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 py-4 bg-gray-900">
      <div className="container mx-auto px-4 text-center text-white">
        <p>© 2025 FlipFortunes</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-gray-300">
            Terms
          </a>
          <a href="#" className="hover:text-gray-300">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-300">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
