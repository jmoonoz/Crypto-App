import React from "react";
import "./Footer.scss";

const Footer = () => {
    const year = new Date();

  return (
    <div className="footer">
      <p>Copyright @ {year.getFullYear()} Crypto Currency</p>
    </div>
  );
};

export default Footer;
