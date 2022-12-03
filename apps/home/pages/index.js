import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { height } from "@mui/system";
import p0 from "../public/picsFor/Pic-0.png"
import p1 from "../public/picsFor/Pic-1.png";
import p2 from "../public/picsFor/Pic-2.png";
import p3 from "../public/picsFor/Pic-3.png"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Home({ domains }) {

  return (
    <>
      <div className="pt-7 w-full flex flex-row justify-around min-h-full flex-wrap align-middle">
        <div className="w-auto h-auto pl-5">
          <h1 className="font-poppins lg:text-8xl text-7xl leading-snug tracking-tight text-black1">
            <span className="font-black">tickit</span> -
            <br />
            the best <span className="font-black">error</span>
            <br />
            <span className="font-black">reporting</span> software.
          </h1>
          <br />
          <a
          href="http://app-tickit.vercel.app/login"
            className="bg-tickit-dark-green rounded-md pt-2 pb-2 pr-4 pl-4 text-white font-poppins mt-3 text-lg font-semibold"
          >
            Try it!
          </a>
          <a
          href="http://app-tickit.vercel.app/register"
            className="bg-tickit-dark-green rounded-md
             ml-2 pt-2 pb-2 pr-4 pl-4 text-white font-poppins mt-3 text-lg font-semibold"
          >
            Log in
          </a>
        </div>
        <div
          id="photos"
          className="w-full h-auto flex justify-center items-center pt-10 pb-20"
        >
          <Carousel className="w-auto" showThumbs={false} width="100%" autoPlay={true} interval="2500" showStatus={false} showIndicatiors={false} useKeyboardArrows={true} infiniteLoop={true} centerMode={true}>
            <Image src={p0}></Image>
            <Image src={p1}></Image>
            <Image src={p2}></Image>
            <Image src={p3}></Image>
          </Carousel>
        </div>
      </div>
    </>
  );
}
