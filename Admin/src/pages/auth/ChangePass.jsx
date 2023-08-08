import { Link, useParams } from 'react-router-dom';
import logoWhite from '../../assets/img/logo-white.png';
import { useEffect, useState } from 'react';
import useAuthUser from '../../hooks/useAuthUser.jsx';
import { createToast } from '../../utils/toastify.js';
import { setMessageEmpty } from '../../features/auth/authSlice.jsx';
import { useDispatch } from 'react-redux';
import { getForTokenVerify } from '../../features/auth/authApiSlice.jsx';

const ChangePass = () => {
  const [input, setInput] = useState({
    password: '',
    conPassword: ''
  });
  const { id, token } = useParams();
  const { message, error } = useAuthUser();
  const dispatch = useDispatch();

  console.log(id, token);

  // <!-- Handle Input Change -->
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // <!-- Form Submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   if (message) {
  //     createToast(message, 'success');
  //     setMessageEmpty();
  //   }
  //   if (error) {
  //     createToast(error);
  //     setMessageEmpty();
  //   }

  //   dispatch(getForTokenVerify(id, token));
  // }, [message, error, dispatch, id, token]);

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
                  <h1 style={{ marginBottom: '30px' }}>Change Password</h1>

                  {/* <!-- Form --> */}

                  <form onSubmit={handleFormSubmit}>
                    <div className='form-group'>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='New Password'
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
                        name='conPassword'
                        value={input.conPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='form-group'>
                      <button
                        className='btn btn-primary btn-block'
                        type='submit'>
                        Change
                      </button>
                    </div>
                  </form>

                  {/* <form>
                    <div className='form-group'>
                      <input
                        value={input.password}
                        onChange={handleInputChange}
                        name='password'
                        className='form-control'
                        type='text'
                        placeholder='New Password'
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        value={input.conPassword}
                        onChange={handleInputChange}
                        name='conPassword'
                        className='form-control'
                        type='text'
                        placeholder='Confirm Password'
                      />
                    </div>

                    <div className='form-group'>
                      <button
                        onClick={handleFormSubmit}
                        className='btn btn-primary btn-block'>
                        Change
                      </button>
                    </div>
                  </form> */}
                  {/* <!-- /Form --> */}

                  <div className='text-center dont-have'>
                    Did have an account? <Link to='/login'>Login</Link>
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

export default ChangePass;
