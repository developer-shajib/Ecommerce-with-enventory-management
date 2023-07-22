import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '../../assets/img/logo-white.png';
import { useEffect, useState } from 'react';
import { createToast } from '../../utils/toastify.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAuthData, setMessageEmpty } from '../../features/auth/authSlice.jsx';
import { login } from '../../features/auth/authApiSlice.jsx';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const { message, error, user } = useSelector(getAllAuthData);
  const navigate = useNavigate();

  // <!-- Handle Input Change -->
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // <!-- Handle Form Submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input.email || !input.password) return createToast('Fields are required');

    dispatch(login(input));
  };

  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }

    if (message) {
      createToast(message, 'success');
      dispatch(setMessageEmpty());
      setInput({ name: '', email: '', password: '', confirmPassword: '' });
    }
  }, [error, message, dispatch, navigate, user]);

  return (
    <>
      {/* <!-- Main Wrapper --> */}
      <div className='main-wrapper login-body'>
        <div className='login-wrapper'>
          <div className='container'>
            <div className='loginbox'>
              <div className='login-left'>
                <img
                  className='img-fluid'
                  src={logoWhite}
                  alt='Logo'
                />
              </div>
              <div className='login-right'>
                <div className='login-right-wrap'>
                  <h1>Login</h1>
                  <p className='account-subtitle'>Access to our dashboard</p>

                  {/* <!-- Form --> */}
                  <form onSubmit={handleFormSubmit}>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={input.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Password'
                        name='password'
                        value={input.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='form-group'>
                      <button
                        className='btn btn-primary btn-block'
                        type='submit'>
                        Login
                      </button>
                    </div>
                  </form>
                  {/* <!-- /Form --> */}

                  <div className='text-center forgotpass'>
                    <Link to='/forget'>Forgot Password?</Link>
                  </div>
                  <div className='login-or'>
                    <span className='or-line'></span>
                    <span className='span-or'>or</span>
                  </div>

                  <div className='text-center dont-have'>
                    Don’t have an account? <Link to='/register'>Register</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Main Wrapper --> */}
    </>
  );
};

export default Login;
