import React from "react";
import PageTitle from "../components/PageTitle";
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      <div className="text-4xl text-center pt-8 border-t">
        <PageTitle txt1={"CONTACT"} txt2={"US"}></PageTitle>
      </div>
      {/* <div className="my-10 flex flex-col md:flex-row gap-16"></div> */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <div className="md:w-1/2 text-left p-10">
          <p className="text-lg text-gray-700 mb-3">
            Have questions? Reach out to us, and we'll be happy to help!
            <br></br>
            Whether you need assistance with donations, have inquiries about our
            platform, or simply want to connect, our team is here to support
            you. Your feedback and queries are important to us, and we strive to
            respond promptly.
          </p>
          <p className="text-lg font-semibold">Email:</p>
          <a
            href="mailto: utcarsh@ac.in"
            className="text-blue-600 underline text-lg"
            target="_blank"
          >
            utcarsh@ac.in
          </a>
          <p className="mt-3 text-lg font-semibold">Phone:</p>
          <p className="text-gray-700">+91 8580298058</p>{" "}
          <p className="mt-3 text-lg font-semibold">Address:</p>
          <p className="text-gray-700">
            VIT Vellore College, Tamil Nadu<br></br>634019
          </p>{" "}
        </div>

        <div className="md:w-1/2 flex justify-center mt-5 md:mt-0">
          <img
            src={assets.contact_img}
            alt="Contact Us"
            className="w-3/4 max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
