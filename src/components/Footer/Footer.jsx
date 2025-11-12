import React from "react";
import Container from "../Container";

function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-amber-50 py-5  mt-7">
      <Container>
        <div className="flex flex-col justify-center items-center">
          <div className="text-[20px] uppercase font-normal font-serif tracking-widest">
            Nordic Rose
          </div>
          <div className="w-1/2 my-2">
            <p className=" footerDes text-center text-[14px] font-serif text-gray-300">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium labore cupiditate quo error tempora nobis perspiciatis
              sed optio vero incidunt facilis reprehenderit at.
            </p>
          </div>
          {/* Navlink  */}
          <div className="my-3">
            <ul className="flex flex-row justify-between items-end h-full gap-3">
              <li className="text-[16px] font-semibold text-gray-400 font-sans cursor-pointer">
                Twitter
              </li>
              <li className="text-[16px] font-semibold text-gray-400 font-sans">
                Facebook
              </li>
              <li className="text-[16px] font-semibold text-gray-400 font-sans">
                RSS
              </li>
            </ul>
          </div>
          <div className="text-[10px] text-gray-300">© 2012–2020 Nordic Rose Co. All rights reserved.</div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
