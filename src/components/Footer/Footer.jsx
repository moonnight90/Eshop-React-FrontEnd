import React from "react";
import Logo from "../Logo";

function Footer() {
  return (
    <>
      <footer className="mx-auto w-full max-w-[1200px] justify-between pb-10 flex flex-col lg:flex-row">
        <div className="ml-5">
          <div className="mt-10 mb-5">
            <Logo />
          </div>
          <p className="pl-0">
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit.
          </p>
          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="mx-5 mt-10">
            <p className="font-medium text-gray-500">FEATURES</p>
            <ul className="text-sm leading-8">
              <li>
                <a href="#">Marketing</a>
              </li>
              <li>
                <a href="#">Commerce</a>
              </li>
              <li>
                <a href="#">Analytics</a>
              </li>
              <li>
                <a href="#">Merchendise</a>
              </li>
            </ul>
          </div>

          <div className="mx-5 mt-10">
            <p className="font-medium text-gray-500">SUPPORT</p>
            <ul className="text-sm leading-8">
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Docs</a>
              </li>
              <li>
                <a href="#">Audition</a>
              </li>
              <li>
                <a href="#">Art Status</a>
              </li>
            </ul>
          </div>

          <div className="mx-5 mt-10">
            <p className="font-medium text-gray-500">DOCUMENTS</p>
            <ul className="text-sm leading-8">
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Conditions</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">License</a>
              </li>
            </ul>
          </div>

          <div className="mx-5 mt-10">
            <p className="font-medium text-gray-500">DELIVERY</p>
            <ul className="text-sm leading-8">
              <li>
                <a href="#">List of countries</a>
              </li>
              <li>
                <a href="#">Special information</a>
              </li>
              <li>
                <a href="#">Restrictions</a>
              </li>
              <li>
                <a href="#">Payment</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <section className="h-11 bg-amber-400 flex">
        <div className="mx-auto px-4 pt-2">
          <p>&copy; Copyright, 2024</p>
        </div>
      </section>
    </>
  );
}

export default Footer;
