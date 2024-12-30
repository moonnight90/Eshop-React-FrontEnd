import React from 'react';

const Burger = () => {
  return (
    <div className="relative w-6 h-6">
      <label className="burger block cursor-pointer w-full h-full bg-transparent" htmlFor="burger">
        <input type="checkbox" id="burger" className="hidden peer" />
        <span className="block absolute h-1 w-full bg-black rounded-full transition-all duration-300 ease-in-out top-0 transform origin-left peer-checked:rotate-45 peer-checked:top-0 peer-checked:left-1.5"></span>
        <span className="block absolute h-1 w-full bg-black rounded-full transition-all duration-300 ease-in-out top-[14px] -translate-y-1/2 origin-left peer-checked:w-0 peer-checked:opacity-0"></span>
        <span className="block absolute h-1 w-full bg-black rounded-full transition-all duration-300 ease-in-out top-full transform origin-left peer-checked:rotate-[-45deg] peer-checked:top-7 peer-checked:left-1.5"></span>
      </label>
    </div>
  );
}

export default Burger;
