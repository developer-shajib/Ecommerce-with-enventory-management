import { Link, useNavigate } from 'react-router-dom';
import registerLogo from '../../assets/img/logo-white.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authApiSlice.jsx';
import { getAllAuthData, setMessageEmpty } from '../../features/auth/authSlice.jsx';
import { createToast } from '../../utils/toastify.js';

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch();
  const { error, message } = useSelector(getAllAuthData);
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

    // <!-- Form Validation -->
    if (!input.name || !input.email || !input.password || !input.confirmPassword) {
      createToast('All fields are required', 'warning');
    } else if (input.password !== input.confirmPassword) {
      createToast(' Password not match', 'warning');
    } else {
      dispatch(
        register({
          name: input.name,
          email: input.email,
          password: input.password
        })
      );
    }
  };

  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }

    if (message) {
      navigate('/login');
      createToast(message, 'success');
      setInput({ name: '', email: '', password: '', confirmPassword: '' });
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch, navigate]);

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
                  src={registerLogo}
                  alt='Logo'
                />
              </div>
              <div className='login-right'>
                <div className='login-right-wrap'>
                  <h1>Register</h1>
                  <p className='account-subtitle'>Access to our dashboard</p>

                  {/* <!-- Form --> */}
                  <form onSubmit={handleFormSubmit}>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={input.name}
                        onChange={handleInputChange}
                      />
                    </div>
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
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={input.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='form-group mb-0'>
                      <button
                        className='btn btn-primary btn-block'
                        type='submit'>
                        Register
                      </button>
                    </div>
                  </form>
                  {/* <!-- /Form --> */}

                  <div className='login-or'>
                    <span className='or-line'></span>
                    <span className='span-or'>or</span>
                  </div>

                  <div className='text-center dont-have'>
                    Already have an account? <Link to='/login'>Login</Link>
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

export default Register;
