import { Link } from 'react-router-dom';
import logoWhite from '../../assets/img/logo-white.png';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { forgetPassword } from '../../features/auth/authApiSlice.jsx';
import useAuthUser from '../../hooks/useAuthUser.jsx';
import { createToast } from '../../utils/toastify.js';
import { setMessageEmpty } from '../../features/auth/authSlice.jsx';
import CircleLoader from 'react-spinners/CircleLoader.js';

const Forgot = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { message, error, isLoading } = useAuthUser();

  // <!-- handle form submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!email) return createToast('Fill the input');

    dispatch(forgetPassword(email));
  };

  // <!-- For Spinner -->
  const override = {
    display: 'block',
    margin: 'auto',
    marginTop: '100px',

    borderColor: 'red'
  };

  useEffect(() => {
    if (message) {
      createToast(message, 'success');
      setMessageEmpty();
    }
    if (error) {
      createToast(error);
      setMessageEmpty();
    }
  }, [message, error]);

  return (
    <>
      {/* <!-- Page Loading --> */}
      {isLoading && (
        <div style={{ width: '100vw', height: '100%', background: '#000000c9', position: 'absolute', color: 'white' }}>
          <CircleLoader
            color='#e8e5e5 '
            loading={true}
            cssOverride={override}
            size={90}
            aria-label='Please wait'
            data-testid='loader'
          />
        </div>
      )}

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
                  <h1>Forgot Password</h1>

                  {/* <!-- Form --> */}
                  <form onSubmit={handleFormSubmit}>
                    <div className='form-group'>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='form-control'
                        type='text'
                        placeholder='Email'
                      />
                    </div>

                    <div className='form-group'>
                      <button
                        className='btn btn-primary btn-block'
                        type='submit'>
                        Send
                      </button>
                    </div>
                  </form>
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

export default Forgot;
