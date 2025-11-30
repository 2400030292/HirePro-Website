import React from 'react';

export default function SiteFooter(){
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="col">
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="col">
          <h4>Services</h4>
          <ul>
            <li>Home Services</li>
            <li>Tech Services</li>
            <li>Learning</li>
          </ul>
        </div>
        <div className="col">
          <h4>For Professionals</h4>
          <ul>
            <li>Join</li>
            <li>Pricing</li>
            <li>Resources</li>
          </ul>
        </div>
        <div className="col">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} HirePro — All rights reserved</div>
    </footer>
  );
}
