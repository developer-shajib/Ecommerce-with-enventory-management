import logo from '../../assets/img/logo.png';
import avatar from '../../assets/img/doctors/doctor-thumb-01.jpg';
import notiAvatar from '../../assets/img/doctors/doctor-thumb-01.jpg';
import useDropdownPopup from '../../hooks/useDropdownPopup.jsx';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authApiSlice.jsx';
import useAuthUser from '../../hooks/useAuthUser.jsx';

const Header = () => {
  const dispatch = useDispatch();
  const { isOpen, toggleMenu, dropDownRef } = useDropdownPopup();
  const { isOpen: isNotification, toggleMenu: notificationMenu, dropDownRef: notificationRef } = useDropdownPopup();
  const { user } = useAuthUser();

  // <!-- Handle User Logout -->
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      {/* <!-- Header --> */}
      <div className='header'>
        {/* <!-- Logo --> */}
        <div className='header-left'>
          <a
            href='index.html'
            className='logo'>
            <img
              src={logo}
              alt='Logo'
            />
          </a>
          <a
            href='index.html'
            className='logo logo-small'>
            <img
              src={logo}
              alt='Logo'
              width='30'
              height='30'
            />
          </a>
        </div>
        {/* <!-- /Logo --> */}

        <a
          href='javascript:void(0);'
          id='toggle_btn'>
          <i className='fe fe-text-align-left'></i>
        </a>

        <div className='top-nav-search'>
          <form>
            <input
              type='text'
              className='form-control'
              placeholder='Search here'
            />
            <button
              className='btn'
              type='submit'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>

        {/* <!-- Mobile Menu Toggle --> */}
        <a
          className='mobile_btn'
          id='mobile_btn'>
          <i className='fa fa-bars'></i>
        </a>
        {/* <!-- /Mobile Menu Toggle --> */}

        {/* <!-- Header Right Menu --> */}
        <ul className='nav user-menu'>
          {/* <!-- Notifications --> */}
          <li
            ref={notificationRef}
            className='nav-item dropdown noti-dropdown'>
            <a
              href='#'
              className=' nav-link'
              onClick={notificationMenu}>
              <i className='fe fe-bell'></i> <span className='badge badge-pill'>3</span>
            </a>
            {isNotification && (
              <div
                className='dropdown-menu notifications d-block'
                style={{ transform: 'translate(-246px, 0px)' }}>
                <div className='topnav-dropdown-header'>
                  <span className='notification-title'>Notifications</span>
                  <a
                    href='javascript:void(0)'
                    className='clear-noti'>
                    Clear All
                  </a>
                </div>
                <div className='noti-content'>
                  <ul className='notification-list'>
                    <li className='notification-message'>
                      <a href='#'>
                        <div className='media'>
                          <span className='avatar avatar-sm'>
                            <img
                              className='avatar-img rounded-circle'
                              alt='User Image'
                              src={notiAvatar}
                            />
                          </span>
                          <div className='media-body'>
                            <p className='noti-details'>
                              <span className='noti-title'>Dr. Ruby Perrin</span> Schedule <span className='noti-title'>her appointment</span>
                            </p>
                            <p className='noti-time'>
                              <span className='notification-time'>4 mins ago</span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className='notification-message'>
                      <a href='#'>
                        <div className='media'>
                          <span className='avatar avatar-sm'>
                            <img
                              className='avatar-img rounded-circle'
                              alt='User Image'
                              src={notiAvatar}
                            />
                          </span>
                          <div className='media-body'>
                            <p className='noti-details'>
                              <span className='noti-title'>Charlene Reed</span> has booked her appointment to <span className='noti-title'>Dr. Ruby Perrin</span>
                            </p>
                            <p className='noti-time'>
                              <span className='notification-time'>6 mins ago</span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className='notification-message'>
                      <a href='#'>
                        <div className='media'>
                          <span className='avatar avatar-sm'>
                            <img
                              className='avatar-img rounded-circle'
                              alt='User Image'
                              src={notiAvatar}
                            />
                          </span>
                          <div className='media-body'>
                            <p className='noti-details'>
                              <span className='noti-title'>Travis Trimble</span> sent a amount of $210 for his <span className='noti-title'>appointment</span>
                            </p>
                            <p className='noti-time'>
                              <span className='notification-time'>8 mins ago</span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className='notification-message'>
                      <a href='#'>
                        <div className='media'>
                          <span className='avatar avatar-sm'>
                            <img
                              className='avatar-img rounded-circle'
                              alt='User Image'
                              src={notiAvatar}
                            />
                          </span>
                          <div className='media-body'>
                            <p className='noti-details'>
                              <span className='noti-title'>Carl Kelly</span> send a message <span className='noti-title'> to his doctor</span>
                            </p>
                            <p className='noti-time'>
                              <span className='notification-time'>12 mins ago</span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='topnav-dropdown-footer'>
                  <a href='#'>View all Notifications</a>
                </div>
              </div>
            )}
          </li>
          {/* <!-- /Notifications --> */}

          {/* <!-- User Menu --> */}
          <li
            ref={dropDownRef}
            className='nav-item dropdown has-arrow'>
            <a
              href='#'
              className=' nav-link'
              onClick={toggleMenu}>
              <span className='user-img'>
                <img
                  className='rounded-circle'
                  src={user?.photo ? user?.photo : notiAvatar}
                  alt={user?.name}
                  width='31'
                />
              </span>
            </a>

            {isOpen && (
              <div
                className='dropdown-menu d-block'
                style={{ transform: 'translate(-131px, 0px)' }}>
                <div className='user-header'>
                  <div className='avatar avatar-sm'>
                    <img
                      src={user?.photo ? user?.photo : notiAvatar}
                      alt={user?.name}
                      className='avatar-img rounded-circle'
                    />
                  </div>
                  <div className='user-text'>
                    <h6>{user?.name}</h6>
                    <p className='text-muted mb-0'>{user?.role}</p>
                  </div>
                </div>
                <a
                  className='dropdown-item'
                  href='profile.html'>
                  My Profile
                </a>
                <a
                  className='dropdown-item'
                  href='settings.html'>
                  Settings
                </a>
                <a
                  href=''
                  onClick={handleLogout}
                  className='dropdown-item'>
                  Logout
                </a>
              </div>
            )}
          </li>
          {/* <!-- /User Menu --> */}
        </ul>
        {/* <!-- /Header Right Menu --> */}
      </div>
      {/* <!-- /Header --> */}
    </>
  );
};

export default Header;
