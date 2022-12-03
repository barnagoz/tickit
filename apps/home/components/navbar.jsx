import React from "react";
import Image from "next/image";
import logo from "../public/logo.png";
import LoginIcn from "@mui/icons-material/LoginRounded";
import MenuIcn from "@mui/icons-material/MenuRounded";
import { useState, useEffect } from "react";
import Link from "next/link";

function NavBar({ domains }) {
  const [buttonBoolean, setButtonBoolean] = useState(false);
  useEffect(() => {
    setButtonBoolean(false);
  }, [window.location.pathname]);
  return (
    <nav className="w-full-width max-w-screen">
      <div className="w-full-width hidden pt-2 lg:flex text-hd justify-between flex-wrap font-montserrat align-middle h-auto">
        <div className="w-1/6">
          <Image src={logo} layout="responsive" alt="Picture of the author" />
        </div>
        <div className="flex w-3/5 justify-between">
          <div className="flex items-center justify-center w-auto h-auto">
            <Link href={"/"}>Home</Link>
          </div>
          <div className="flex items-center justify-center w-auto h-auto">
            <Link href={"/about"}>About tickit</Link>
          </div>
          <div className="flex items-center justify-center w-auto h-auto">
            <Link href={"/contact-us"}>Contact us</Link>
          </div>
          <a
            href="http://app-tickit.vercel.app/login"
            className="flex items-center justify-center w-auto h-auto cursor-pointer mr-2"
          >
            <p>Login</p>
            <LoginIcn></LoginIcn>
          </a>
        </div>
      </div>
      <div className="flex lg:hidden items-center justify-start w-full-width">
        <div className="w-3/6">
          <Image src={logo} layout="responsive" alt="Picture of the author" />
        </div>
        <div className="w-3/6 flex justify-end items-center ">
          <button
            className=" bg-tickit-dark-green p-3 rounded-full "
            onClick={() => {
              setButtonBoolean(!buttonBoolean);
            }}
          >
            <MenuIcn className=" text-white h-7 w-7"></MenuIcn>
          </button>
        </div>
      </div>
      {buttonBoolean && (
        <div className="w-full flex justify-center">
          <div className="w-full flex flex-col items-center text-center text-xl gap-3">
            <Link href={"/"} className="w-auto">
              <h1 className="p-2 w-5/12 bg-tickit-dark-green text-white font-poppins rounded-md">
                Home
              </h1>
            </Link>
            <Link href={"/"} className="w-auto">
              <h1 className="p-2 w-5/12 bg-tickit-dark-green text-white font-poppins rounded-md">
                About us
              </h1>
            </Link>
            <Link href={"/"} className="w-auto">
              <h1 className="p-2 w-5/12 bg-tickit-dark-green text-white font-poppins rounded-md">
                Contact us
              </h1>
            </Link>
            <a
              href="http://app-tickit.vercel.app/login"
              className="p-2 w-5/12 bg-tickit-dark-green text-white font-poppins rounded-md"
            >
              <p>Login</p>
              <LoginIcn></LoginIcn>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
