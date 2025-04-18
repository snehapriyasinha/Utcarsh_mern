import React from "react";
import PageTitle from "../components/PageTitle";
import { assets } from "../assets/assets";
import Policy from "../components/Policy";

const About = () => {
  return (
    <div>
      <div className="text-4xl text-center pt-8 border-t">
        <PageTitle txt1={"ABOUT"} txt2={"US"}></PageTitle>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.aboutimg}
          alt=""
        ></img>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <b className="text-gray-800 ">Our Mission</b>
          <p>
            At UTCARSH, we are committed to bridging the gap between donors and
            underprivileged communities by providing a transparent and secure
            platform for charitable giving. Our goal is to empower individuals
            and organizations to make a meaningful impact on those in need.
          </p>
          <p>
            We are a team of passionate individuals dedicated to leveraging
            technology to make donations simple, secure, and impactful. With a
            deep understanding of the challenges faced by rural and underserved
            communities, we strive to bring help and hope through our digital
            platform. Every donation, big or small, has the power to change
            lives. Be part of our mission to bring hope, help, and happiness to
            those in need.
          </p>
          <b className="text-gray-800 ">Our Vision</b>
          <p className="mt-0">
            Be the person for others.<br></br>💙 Together, we can create a
            better tomorrow!
          </p>
        </div>
      </div>
      <div className="text-2xl py-20">
        <PageTitle txt1={"Why Choose"} txt2={"Us"}></PageTitle>
        <Policy></Policy>
      </div>
    </div>
  );
};

export default About;
