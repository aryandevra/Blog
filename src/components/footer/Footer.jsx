import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

import { Button, Logo } from '../index';

const categories = [
  { name: 'Technology', slug: '/#' },
  { name: 'Travel', slug: '/#' },
  { name: 'Lifestyle', slug: '/#' },
];

const Footer = () => {
  // Newsletter state
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Authentication status
  const authStatus = useSelector(state => state.auth.status);

  // Hide the success message after 3 seconds
  useEffect(() => {
    if (!isSubscribed) return;

    const timeout = setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isSubscribed]);

  // Footer navigation links
  const quickLinks = [
    { name: 'Home', slug: '/', active: true },
    { name: 'All Posts', slug: '/all-posts', active: true },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  // Handle newsletter subscription
  const handleSubscribe = e => {
    e.preventDefault();

    toast.success('Subscribed to the newsletter!');
    setEmail('');
    setIsSubscribed(true);
  };

  return (
    <footer className="mt-5 bg-linear-to-r from-slate-950 to-indigo-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-8 py-16 md:grid-cols-4">
        {/* Logo and description */}
        <div>
          <Logo className="text-3xl font-bold" />

          <p className="mt-4 text-slate-300">
            Read, write and share your thoughts with the world.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-3 font-bold">Quick Links</h3>

          <ul className="space-y-2 text-slate-300">
            {quickLinks.map(
              item =>
                item.active && (
                  <li key={item.name}>
                    <Link to={item.slug}>
                      <span className="footer-link">{item.name}</span>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-3 font-bold">Categories</h3>

          <ul className="space-y-2 text-slate-300">
            {categories.map(item => (
              <li key={item.name}>
                <Link to={item.slug}>
                  <span className="footer-link">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-3 font-bold">Newsletter</h3>

          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              readOnly={isSubscribed}
              value={email}
              required
              className="w-full rounded-xl p-3 text-white outline-1 outline-white focus:outline-2"
              onChange={e => setEmail(e.target.value.trim())}
            />

            <Button
              type="submit"
              disabled={isSubscribed}
              className="mt-3 rounded-xl px-3 py-1 text-sm hover:bg-violet-700 disabled:bg-gray-400"
            >
              {isSubscribed ? 'Subscribed 🔔' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6 text-center">
        &copy; {new Date().getFullYear()} <Logo className="inline-block" />.
        Built with React & Appwrite.
      </div>
    </footer>
  );
};

export default Footer;
