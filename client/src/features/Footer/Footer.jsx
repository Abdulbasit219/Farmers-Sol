import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-primary text-white py-10 w-full z-40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo or Brand */}
        <div className="text-2xl font-bold">SabzLink</div>

        {/* Social Icons */}
        <div className="flex space-x-6">
          {/* Twitter */}
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="hover:text-lime-300 transition-colors" />
          </a>

          {/* Facebook */}
          <a
            href="https://github.com/Abdulbasit219/Farmers-Sol"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Github className="hover:text-lime-300 transition-colors" />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="hover:text-lime-300 transition-colors" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/abdul-basit2259/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="hover:text-lime-300 transition-colors" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-center md:text-right">
          © {new Date().getFullYear()} SabzLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
