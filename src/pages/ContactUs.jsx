import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useDocumentTitle from "../CustomHook/useDocumentTitle";

function ContactUs() {
  useDocumentTitle("Contact Us");
  return (
    <section class="w-full flex-grow">
      <div class="relative">
        <img
          class="w-full object-cover brightness-50 filter lg:h-[500px]"
          src="https://res.cloudinary.com/dmz847afv/image/upload/v1738738105/static/lg3fzlugfwfnrhcsnyn5.jpg"
          alt="Iphone with Macbook image"
        />

        <div class="absolute top-1/2 left-1/2 mx-auto flex w-11/12 max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col text-center text-white lg:ml-5">
          <h1 class="text-4xl font-bold sm:text-5xl">Contact us</h1>
          <p class="mx-auto pt-3 text-xs lg:w-3/5 lg:pt-5 lg:text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur aperiam natus, nulla, obcaecati nesciunt, itaque
            adipisci earum ducimus pariatur eaque labore.
          </p>
        </div>
      </div>
      <section class="mx-auto w-full my-6 grid max-w-[350px] grid-cols-1 gap-3 px-5 pb-10  lg:pt-10">
        <div>
          <div class="border py-5 shadow-md">
            <div class="flex justify-between px-4 pb-5">
              <p class="text-xl font-bold">Developer</p>
            </div>
            <div class="flex flex-col gap-1 px-4">
              <a
                class="flex items-center"
                href="mailto:ahmadraza1907r@gmail.com"
              >
                <span className="text-violet-900 pr-2">
                  <EmailIcon sx={{ color: "inherit", fontSize: "20px" }} />
                </span>
                ahmadraza1907r@gmail.com
              </a>
              <a class="flex items-center" href="tel:+923251036190">
                <span className="text-violet-900 pr-2">
                  <LocalPhoneIcon sx={{ color: "inherit", fontSize: "20px" }} />
                </span>
                +92 (325) 103-6190
              </a>
              <a
                class="flex items-center"
                href="https://github.com/moonnight90"
                target="_blank"
              >
                <span className="text-violet-900 pr-2">
                  <GitHubIcon sx={{ color: "inherit", fontSize: "20px" }} />
                </span>
                GitHub Profile
              </a>
              <a
                class="flex items-center"
                href="http://wa.me/+923069419989"
                target="_blank"
              >
                <span className="text-violet-900 pr-2">
                  <WhatsAppIcon sx={{ color: "inherit", fontSize: "20px" }} />
                </span>
                Whatsapp
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ContactUs;
