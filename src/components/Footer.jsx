import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer__inner">
        <span>Movie World</span> &copy; {new Date().getFullYear()} – All rights reserved.
      </div>
    </footer>
  );
}
