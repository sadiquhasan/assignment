import React from "react";
import { BiLayer, BiLogIn } from "react-icons/bi";
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-slate-500 flex items-center justify-between px-12 py-5 shadow-md text-white">
      <div className="flex text-2xl">
        <BiLayer />
      </div>
      <div className="text-md flex items-center justify-between">
        <Link href="/" className="mx-3 cursor-pointer">Home</Link>
        <Link href="/kabanBoard" className="mx-3 cursor-pointer">Kaban Board</Link>
      </div>
      <div className="flex justify-between">
        Account <BiLogIn className="mx-2 text-2xl" />
      </div>
    </header>
  );
};

export default Navbar;
