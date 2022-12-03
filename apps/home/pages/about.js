import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import p0 from "../public/picsFor/Pic-0.png"
import p1 from "../public/picsFor/Pic-1.png";
import p2 from "../public/picsFor/Pic-2.png";
import p3 from "../public/picsFor/Pic-3.png"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function About(props) {
  return (
    <div>
      <div className="pt-7 w-full flex flex-row justify-around min-h-full flex-wrap align-middle">
        <div className="w-auto h-auto pl-5">
          <h1 className="font-poppins text-8xl leading-11 tracking-tight text-black1">
            so, <span className="font-black">you</span> are <br />
            asking, what
            <br />
            is <span className="font-black">tickit</span>?
          </h1>
        </div>
      </div>

      <div className="pt-4 lg:pt-10 w-full flex flex-row justify-around min-h-full flex-wrap align-middle pb-20">
        <div className="lg:w-8/12 w-full h-auto pl-5">
          <h1 className="font-lato text-3xl lg:text-4xl leading-snug tracking-tight font-normal text-black1">
            <span className="font-bold">tickit</span> is the best{" "}
            <span className="font-bold">web based</span> error reporting
            application.
            <br />
            It gives you
            <span className="font-bold"> outstanding features</span> over the
            competition, like{" "}
            <span className="font-bold">customizable reporting pages</span>,{" "}
            <span className="font-bold">unlimited reports</span> and much more!
          </h1>
        </div>
      </div>
      <div className="pt-7 w-full flex flex-row justify-around min-h-full flex-wrap align-middle">
        <div className="w-auto h-auto pl-5">
          <h1 className="font-poppins text-8xl leading-11 tracking-tight text-black1 font-black">
            lets have a look!
          </h1>
        </div>
      </div>
      <div
          id="photos"
          className="w-full h-auto flex flex-col justify-center pt-10 pb-20"
        >
           <Carousel className="w-auto" showThumbs={false} width="100%" autoPlay={true} interval="2500" showStatus={false} showIndicatiors={false} useKeyboardArrows={true} infiniteLoop={true} centerMode={true}>
            <Image src={p0}></Image>
            <Image src={p1}></Image>
            <Image src={p2}></Image>
            <Image src={p3}></Image>
          </Carousel>
        </div>
    </div>
  );
}

About.propTypes = {};

export default About;
