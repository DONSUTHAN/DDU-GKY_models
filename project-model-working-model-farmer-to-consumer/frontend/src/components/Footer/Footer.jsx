import React from "react";
import { Mail, MapPin, Phone, Sprout } from "lucide-react";

import "./Footer.css";

const contactDetails = {
  // This line creates one place to update footer contact information.
  phone: "+919909945623",
  email: "support@thefarmvegi.com",
  address: "kozikode Fresh Market, india"

};

function Footer() {
  // This line creates the Footer component.
  return (
    <footer className="footer">
      {/* This line creates the footer container. */}
      <div className="footer-brand">
        {/* This line creates the footer brand area. */}
        <Sprout size={28} />
        {/* This line shows the plant logo icon. */}
        <strong>The Farm Vegi</strong>
        {/* This line shows the app name. */}
        <p>Fresh produce from farmers to consumers without extra middlemen.</p>
        {/* This line explains the app mission. */}
      </div>

      <div className="footer-contact">
        {/* This line creates the footer contact area. */}
        <h3>Contact details</h3>
        {/* This line shows the footer contact heading. */}
        <p>
          {/* This line starts the phone row. */}
          <Phone size={18} />
          {/* This line shows the phone icon. */}
          {contactDetails.phone}
          {/* This line shows the footer phone number. */}
        </p>
        {/* This line ends the phone row. */}
        <p>
          {/* This line starts the email row. */}
          <Mail size={18} />
          {/* This line shows the email icon. */}
          {contactDetails.email}
          {/* This line shows the footer email address. */}
        </p>
        {/* This line ends the email row. */}
        <p>
          {/* This line starts the address row. */}
          <MapPin size={18} />
          {/* This line shows the address icon. */}
          {contactDetails.address}
          {/* This line shows the footer address. */}
        </p>
        {/* This line ends the address row. */}
      </div>
      {/* This line ends the footer contact area. */}
    </footer>
  );
}

export default Footer;
// This line exports Footer so the Home page can use it.
