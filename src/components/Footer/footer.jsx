import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';


function Footer() {
  return (
    <div className='container'>
    <div className="my-5">
      {/* Footer section */}
      <div className="footer text-center">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          {/* Email icon with mailto link */}
          <a href='mailto:mom_adjei@yahoo.com' target="_blank" className='p-2'>
            <AiOutlineMail size="2em" />
          </a>

          {/* LinkedIn icon with link */}
          <a href='https://www.linkedin.com/' target="_blank" className='p-2'>
            <FaLinkedin size="2em" />
          </a>

          {/* GitHub icon with link */}
          <a href='https://github.com/' target="_blank" className='p-2'>
            <FaGithub size="2em" />
          </a>

          {/* Twitter icon with link */}
          <a href='https://twitter.com/' target="_blank" className='p-2'>
            <FaTwitter size="2em" />
          </a>

          {/* Instagram icon with link */}
          <a href='https://www.instagram.com/' target="_blank" className='p-2'>
            <FaInstagram size="2em" />
          </a>
        </div>

        {/* Copyright text */}
        <div className="footer-copyright text-center py-3">Digital Mirage / All rights reserved</div>
      </div>
    </div>
    </div>
    
  );
}

export default Footer;
