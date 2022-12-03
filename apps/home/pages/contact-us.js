import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function ContactUs(props) {
  const [VerResp, setVerResp] = useState("");
  useEffect(() => {
    window.verifyHumanity=verifyHumanity

  }, [])
  const verifyHumanity = async (frcCaptchaSolution) => {
    try {
      const verify = await axios.post("/verify", {
        solution: frcCaptchaSolution,
        secret: process.env.FRC_SECRET,
        sitekey: process.env.FRC_SITE,
      });


      if (verify.data.success == true) {
        setVerResp(true);
      } else {
        setVerResp(false);
      }
    } catch (e) {
      setMsg(
        "Unknown error happened! Please try again or send an email to tickit@icloud.com ."
      );
    }
  }
  async function sendData(e, name, email, message) {
    e.preventDefault();
    setMsg("");
    try {
      if (VerResp == true) {
        const data = await axios.post("/api/general/contact", {
          name: name,
          email: email,
          message: message,
        });
        if (data.status === 200) {
          setName("");
          setEmail("");
          setMessage("");
          setMsg("We sent your message to our developers.");
        } else {
          setMsg(
            "Unknown error happened! Please try again or send an email to tickit@icloud.com ."
          );
        }
      } else {
        setMsg(
          "Unknown error happened! Please try again or send an email to tickit@icloud.com ."
        );
      }
    } catch (e) {
      setMsg(
        "Unknown error happened! Please try again or send an email to tickit@icloud.com ."
      );
    }
    setTimeout(() => {
      setMsg("");
    }, 8000);
  }
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [Msg, setMsg] = useState("");
  const [hasLoaded1, setHasLoaded1] = useState(false)
  const [hasLoaded2, setHasLoaded2] = useState(false)


  const appendSdkScript1 = () => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/friendly-challenge@0.9.0/widget.module.min.js'
    script.async = true
    script.defer = true
    document.body.append(script)
  };

  const appendSdkScript2 = () => {
    const script = document.createElement('script')
    script.noModule = true
    script.src = 'https://unpkg.com/friendly-challenge@0.9.0/widget.min.js'
    script.async = true
    script.defer = true
    document.body.append(script)
  }

  useEffect(() => {
    appendSdkScript1()
    appendSdkScript2()
  }, [])

  return (
    <div className="mb-24">
      <div className="w-full flex text-center">
        <div className="flex flex-col w-auto items-center mr-auto ml-auto bg-tickit-dark-green p-10 rounded-2xl shadow-lg gap-2">
          <h1 className="text-3xl font-poppins font-bold text-white">Send us a message</h1>
          <h1 className="font-poppins font-bold text-white">This form is currently not working. Please contact us at <a href="mailto:goozbarnabas@gmail.com">this email address</a>.</h1>
          <input
            className="font-poppins w-full p-4 rounded-md text-center"
            value={Name}
            disabled="disabled"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          ></input>
          <input
            className="font-poppins w-full p-4 rounded-md text-center"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            disabled="disabled"
            placeholder="Email address"
          ></input>
          <textarea
            className="font-poppins w-full p-4 rounded-md text-center"
            value={Message}
            disabled="disabled"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message to the developers"
          ></textarea>
          {/*<div className="frc-captcha" data-sitekey="FCMUR3O5H3ANK77F" data-callback="verifyHumanity"></div>
          <button
            className="font-poppins w-full p-4 rounded-md bg-white"
            disabled="disabled"
            onClick={(e) =>
              sendData(e, Name, Email, Message)
            }
          >
            Submit
          </button>
          */}
        </div>
      </div>
      <p className="text-center mt-2 font-poppins text-black1 text-lg">{Msg}</p>
    </div>
  );
}

ContactUs.propTypes = {};

export default ContactUs;
