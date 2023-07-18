import { Link } from 'react-router-dom';
import logoWhite from '../../assets/img/logo-white.png';
import { useState } from 'react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  // <!-- Handle Input Change -->
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {/* <!-- Main Wrapper --> */}
      <div className='main-wrapper login-body'>
        <div className='login-wrapper'>
          <div className='container'>
            <div className='loginbox'>
              <div className='login-left'>
                <img className='img-fluid' src={logoWhite} alt='Logo' />
              </div>
              <div className='login-right'>
                <div className='login-right-wrap'>
                  <h1>Login</h1>
                  <p className='account-subtitle'>Access to our dashboard</p>

                  {/* <!-- Form --> */}
                  <form action='https://dreamguys.co.in/demo/doccure/admin/index.html'>
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
