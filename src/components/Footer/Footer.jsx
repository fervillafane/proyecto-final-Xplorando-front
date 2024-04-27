import './Footer.css';
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__left">
        <img src="/src/assets/logofinalexplorando/logoxplorando/logoxplorando.png" alt="Isologotipo Xplorando" />
        <p>&copy; {new Date().getFullYear()} Xplorando. Equipo#4</p>
      </div>
      <div className="footer__right">
        <div className="footer__social-icons">
          <SlSocialFacebook />
          <SlSocialTwitter />
          <SlSocialLinkedin />
          <SlSocialInstagram />
        </div>
      </div>
    </footer>
  );
}

export default Footer;