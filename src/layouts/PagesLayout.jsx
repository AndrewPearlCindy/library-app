import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const PagesLayout = (props) => {
  return (
    <div>
      {/* <NavBar /> */}
      {props.children}
      <Footer />
    </div>
  );
};

export default PagesLayout;
