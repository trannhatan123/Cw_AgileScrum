import React from 'react';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { name: '3D Exploration', url: '#' },
      { name: 'Astronomy Quiz', url: '#' },
      { name: 'Event Calendar', url: '#' },
      { name: 'Resources', url: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { name: 'Blog & Docs', url: '#' },
      { name: 'FAQ', url: '#' },
      { name: 'User Guide', url: '#' },
      { name: 'Contact', url: '#' },
    ],
  },
];

const socials = [
  {
    name: "Facebook",
    icon: "/images/fb.png",
    url: "#",
  },
  {
    name: "Twitter",
    icon: "/images/x.png",
    url: "#",
  },
  {
    name: "Instagram",
    icon: "/images/insta.png",
    url: "#",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Column 1: Logo & description */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold text-white mb-3">Solar System Explorer</h2>
            <p className="text-gray-400 mb-4">
              Explore the Solar System in 3D. Learn, play, and join the journey across planets and beyond.
            </p>
            <div className="flex gap-4 mt-4">
              {socials.map((s) => (
                <a key={s.name} href={s.url} className="hover:opacity-80 transition">
                  <img src={s.icon} alt={s.name} className="h-7 w-7" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2 & 3: Links */}
          <div className="flex flex-1 flex-col sm:flex-row gap-10">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-white font-semibold mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a href={link.url} className="text-gray-400 hover:text-white transition">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-3">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">Get the latest updates from us.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="rounded-l-lg px-3 py-2 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-r-lg px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pb-6">
          <p className="text-gray-500 text-sm">© 2025 Solar System Explorer. All rights reserved.</p>
          <div className="flex space-x-4 text-gray-400 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
