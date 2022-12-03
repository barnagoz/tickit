import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

function Footer({ domains }) {
  return (
    <div className="w-full h-auto flex justify-evenly bg-tickit-dark-green">
      <div className="m-4 flex flex-col justify-self-start">
        <Link href="/">
          <a className="p-2 bg-white w-48 h-auto text-center rounded-md m-1 font-poppins tickit-green-text font-bold">
            Home
          </a>
        </Link>
        <Link href="/about">
          <a className="p-2 bg-white w-48 h-auto text-center rounded-md m-1 font-poppins tickit-green-text font-bold">
            About tickit
          </a>
        </Link>
        <Link href="/contact-us">
          <a className="p-2 bg-white w-48 h-auto text-center rounded-md m-1 font-poppins tickit-green-text font-bold">
            Contact us
          </a>
        </Link>
        <a
          href="http://app-tickit.vercel.app/login"
          className="p-2 bg-white w-48 h-auto text-center rounded-md m-1 font-poppins tickit-green-text font-bold"
        >
          Login
        </a>
        <a
          href="http://app-tickit.vercel.app/register"
          className="p-2 bg-white w-48 h-auto text-center rounded-md m-1 font-poppins tickit-green-text font-bold "
        >
          Register
        </a>
      </div>
      <div className="m-4 flex flex-col justify-self-start">
        <button
          onClick={() => {
            alert(
              "This project is currently being developed. Please wait until release!"
            );
          }}
          className="p-2 bg-white w-48 h-auto text-center rounded-md m-1 font-poppins tickit-green-text font-bold"
        >
          Legal
        </button>
        <button
          onClick={() => {
            alert(
              "This project is currently being developed. Please wait until release!"
            );
          }}
          className="p-2 bg-white w-48 h-auto text-center rounded-md m-1 font-poppins tickit-green-text font-bold"
        >
          Impressum
        </button>
        <button
          onClick={() => {
            alert(
              "This project is currently being developed. Please wait until release!"
            );
          }}
          className="p-2 bg-white w-48 h-auto text-center rounded-md m-1 font-poppins tickit-green-text font-bold"
        >
          Privacy policy
        </button>
      </div>
    </div>
  );
}

Footer.propTypes = {};

export default Footer;
