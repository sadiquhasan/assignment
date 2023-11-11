import React from "react";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
