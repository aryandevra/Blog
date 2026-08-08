import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import { LogoutBtn } from '..';

const Navigation = ({ mobile = false, onNavigate }) => {
  // Get the current authentication status
  const authStatus = useSelector(state => state.auth.status);

  // Navigation items
  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
  ];

  return (
    <>
      {navItems.map(
        item =>
          item.active && (
            <li key={item.name}>
              <Link
                to={item.slug}
                onClick={onNavigate}
                className={`header-nav-link hover:bg-violet-100 ${
                  mobile ? 'block w-full text-left' : ''
                }`}
              >
                {item.name}
              </Link>
            </li>
          )
      )}

      {authStatus && (
        <li className={mobile ? 'mt-3 border-t pt-4' : ''}>
          <LogoutBtn
            className={`header-nav-link hover:bg-red-100 ${
              mobile ? 'w-full text-left' : ''
            }`}
          />
        </li>
      )}
    </>
  );
};

export default Navigation;
