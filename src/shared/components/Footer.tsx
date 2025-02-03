import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

type FooterProps = {
  companyName: string;
  currentYear: number;
  footerLinks: {
    title: string;
    links: { name: string; url: string }[];
  }[];
};

function Footer({ companyName, currentYear, footerLinks }: FooterProps) {
  const socialLinks = [
    { icon: FaFacebook, url: "https://facebook.com" },
    { icon: FaTwitter, url: "https://twitter.com" },
    { icon: FaInstagram, url: "https://instagram.com" },
    { icon: FaLinkedin, url: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">{companyName}</h2>
            <p className="text-gray-400 mb-4">
              Entregando calidad, conveniencia e innovación a tu puerta.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.url}
                      className="text-gray-400 hover:text-white hover:underline transition duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Signup */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Mantén la información actualizada
            </h3>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Introduce tu correo electrónico"
                className="px-3 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} {companyName}. Todos los derechos reservados.
          </p>
          <div className="mt-2 space-x-4">
            <Link
              to="/politica-de-privacidad"
              className="text-gray-400 hover:text-white hover:underline text-sm"
            >
              Política de Privacidad
            </Link>
            <Link
              to="/terminos-y-condiciones"
              className="text-gray-400 hover:text-white hover:underline text-sm"
            >
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
