import { Link, useLocation } from 'react-router-dom';
import { BiCategory, BiLogoProductHunt, BiAnchor } from 'react-icons/bi';
import { MdBorderColor } from 'react-icons/md';
import { AiFillTag, AiOutlineHome, AiOutlineUserAdd } from 'react-icons/ai';
import { SiBrandfolder } from 'react-icons/si';
import { ImUsers } from 'react-icons/im';
import { FaLock } from 'react-icons/fa';
import useAuthUser from '../../hooks/useAuthUser.jsx';

const links = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <AiOutlineHome />
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: <AiOutlineUserAdd />
  },

  {
    name: 'Users',
    path: '/user',
    icon: <ImUsers />
  },
  {
    name: 'Orders',
    path: '/user',
    icon: <MdBorderColor />
  },
  {
    name: 'Products',
    path: '/user',
    icon: <BiLogoProductHunt />
  },
  {
    name: 'Categories',
    path: '/user',
    icon: <BiCategory />
  },
  {
    name: 'Tags',
    path: '/user',
    icon: <AiFillTag />
  },
  {
    name: 'Brands',
    path: '/user',
    icon: <SiBrandfolder />
  },
  {
    name: 'Roles',
    path: '/role',
    icon: <BiAnchor />
  },
  {
    name: 'Permissions',
    path: '/permission',
    icon: <FaLock />
  }
];

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthUser();

  const matchPermission = user?.role.permissions.map((item) => item.name);

  return (
    <>
      {/* <!-- Sidebar --> */}
      <div
        className='sidebar'
        id='sidebar'>
        <div className='sidebar-inner slimscroll'>
          <div
            id='sidebar-menu'
            className='sidebar-menu'>
            <ul>
              {links.map((item, index) => {
                // user.role.permissions.includes(item.name) && (
                return (
                  <>
                    <li
                      style={{ display: `${matchPermission.includes(item.name) ? 'block' : 'none'}` }}
                      key={index}
                      className={location.pathname === item.path && 'active'}>
                      <Link to={item.path}>
                        <i className=''>{item.icon}</i> <span>{item.name}</span>
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- /Sidebar --> */}
    </>
  );
};

export default Sidebar;
