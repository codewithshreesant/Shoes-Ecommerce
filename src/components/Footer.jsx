import React from 'react';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-[8rem]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
          <IconButton 
        color="primary" 
        aria-label="Facebook" 
        onClick={() => window.open('https://www.facebook.com/your-page-url')} 
      >
        <FacebookIcon />
      </IconButton>
      <IconButton 
        color="primary" 
        aria-label="Twitter" 
        onClick={() => window.open('https://twitter.com/your-handle')} 
      >
        <TwitterIcon />
      </IconButton>
      <IconButton 
        color="primary" 
        aria-label="Instagram" 
        onClick={() => window.open('https://www.instagram.com/your-account')} 
      >
        <InstagramIcon />
      </IconButton>
      <IconButton 
        color="primary" 
        aria-label="LinkedIn" 
        onClick={() => window.open('https://www.linkedin.com/in/your-profile')} 
      >
        <LinkedInIcon />
      </IconButton>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;