import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="w-full bg-black flex p-2 shadow-2xl">
      <div className="flex items-center justify-center">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            CRUD
          </span>
        </Link>
      </div>

      <div className=" w-full flex justify-end items-center m-2 text-white">
        <Link to="/" className="font-bold mr-3 hover:text-blue-600">
          Home
        </Link>

        <Link to="/create">
          <Button variant="default" className="px-4 py-2 bg-black text-white rounded transition-all hover:bg-gray-800 hover:shadow-md">
            Create a Post
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
