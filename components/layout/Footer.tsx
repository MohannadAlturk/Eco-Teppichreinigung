import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Eco Teppichreinigung</h3>
            <p className="text-gray-400">
              Umweltfreundliche und professionelle Teppichreinigung
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/configurator"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Teppich reinigen
                </Link>
              </li>
              <li>
                <Link
                  href="/#process"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ablauf
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/agb"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  AGB
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/widerruf"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Widerruf
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400">
              <li>info@eco-teppichreinigung.de</li>
              <li>+49 123 456789</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Eco Teppichreinigung. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};
