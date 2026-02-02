import { Link } from 'react-router-dom'
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPinterestP,
  FaWhatsapp,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      <div className="border-t border-stone-200 bg-[#f7f3ea]">
        <div className="max-w-none mx-auto px-0 py-10">
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-stone-300/70">
            <div className="py-8 md:py-0 md:px-6">
              <p className="text-sm font-semibold text-stone-900">Pakistan</p>
              <div className="mt-4 space-y-3 text-sm text-stone-700">
                <div className="flex gap-3">
                  <FaMapMarkerAlt className="mt-1 h-4 w-4 text-stone-700" />
                  <span>Hameed Ullah Mokal Colony, Sahiwal</span>
                </div>
                <div className="flex gap-3">
                  <FaWhatsapp className="mt-1 h-4 w-4 text-stone-700" />
                  <span>WhatsApp: (302)-052-1000</span>
                </div>
                <div className="flex gap-3">
                  <FaEnvelope className="mt-1 h-4 w-4 text-stone-700" />
                  <a href="mailto:support@lampandglow.com" className="hover:underline">
                    support@lampandglow.com
                  </a>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-5 text-stone-700">
                <a href="#" aria-label="Facebook" className="hover:text-stone-900">
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-stone-900">
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Pinterest" className="hover:text-stone-900">
                  <FaPinterestP className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="py-8 md:py-0 md:px-6">
              <p className="text-sm font-semibold text-stone-900">Quick Links</p>
              <ul className="mt-4 space-y-2 text-sm text-stone-700">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:underline">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Cart
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Register With Us
                  </a>
                </li>
                <li>
                  <Link to="/blogs" className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="py-8 md:py-0 md:px-6">
              <p className="text-sm font-semibold text-stone-900">Collections</p>
              <ul className="mt-4 space-y-2 text-sm text-stone-700">
                <li>
                  <a href="#" className="hover:underline">
                    Table Lamps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Floor Lamps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Roof/Ceiling Lamps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Wall Lamps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Hanging Lamps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Bedside/Side Table Lamps
                  </a>
                </li>
              </ul>
            </div>

            <div className="py-8 md:py-0 md:px-6">
              <p className="text-sm font-semibold text-stone-900">Policies</p>
              <ul className="mt-4 space-y-2 text-sm text-stone-700">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms Of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Affiliate Program
                  </a>
                </li>
              </ul>
            </div>

            <div className="py-8 md:py-0 md:px-6">
              <p className="text-sm font-semibold text-stone-900">Newsletter Sign Up</p>
              <p className="mt-4 text-sm text-stone-700">
                Receive our latest updates about our products &amp; promotions.
              </p>

              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-sm border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="button"
                  className="mt-4 w-full rounded-sm bg-amber-500 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-600"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-stone-200">
        <div className="max-w-none mx-auto px-0 py-4 text-center text-xs text-stone-700">
          © {new Date().getFullYear()} Lamp And Glow. Powered By WORKWOX Private Limited.
        </div>
      </div>

      <a
        href="https://wa.me/923134371467"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="h-5 w-5" />
        Chat on WhatsApp
      </a>
    </footer>
  )
}
