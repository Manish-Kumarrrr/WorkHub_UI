import React from "react";

const Footer = () => {
  return (
    <div className="bg-customBg flex flex-col items-center justify-center text-center  ">
      <div className="text-white mw-4 mt-10 font-extrabold font-serif text-3xl md:text-5xl tracking-wide drop-shadow-lg">
        WorkHub
      </div>
      <div className="text-white mr-10 ml-10 text-sm">
        Welcome to WorkHub – the premier destination for connecting gig workers
        and employers. Together, we’re empowering the future of work.
      </div>
      <div className="mt-6 text-gray-400 text-xs md:text-sm">
        &copy; 2024 All rights reserved by{" "}
        <span className="text-white">Manish Kumar</span>.
      </div>
      <div className="mt-2 flex items-center space-x-4">
        <a
          href="https://github.com/Manish-Kumarrrr/WorkHub_UI"
          className="text-gray-300 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49v-1.7c-2.77.61-3.36-1.34-3.36-1.34-.45-1.14-1.11-1.45-1.11-1.45-.91-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02.9 1.53 2.36 1.09 2.94.84.09-.65.35-1.1.64-1.35-2.21-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.561 9.561 0 0112 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.65.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .27.15.59.67.49A10.005 10.005 0 0022 12c0-5.52-4.48-10-10-10z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/manish-kumarrrr/"
          className="text-gray-300 hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.281c-.967 0-1.75-.783-1.75-1.75s.783-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm13.5 10.281h-3v-4.5c0-1.103-.897-2-2-2s-2 .897-2 2v4.5h-3v-9h3v1.281c.555-.828 1.487-1.281 2.5-1.281 1.932 0 3.5 1.567 3.5 3.5v5.5z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Footer;
