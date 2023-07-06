import { Link } from 'react-router-dom';
import registerLogo from '../../assets/img/logo-white.png';

const Register = () => {
  return (
    <>
      {/* <!-- Main Wrapper --> */}
      <div className='main-wrapper login-body'>
        <div className='login-wrapper'>
          <div className='container'>
            <div className='loginbox'>
              <div className='login-left'>
                <img className='img-fluid' src={registerLogo} alt='Logo' />
              </div>
              <div className='login-right'>
                <div className='login-right-wrap'>
                  <h1>Register</h1>
                  <p className='account-subtitle'>Access to our dashboard</p>

                  {/* <!-- Form --> */}
                  <form action='https://dreamguys.co.in/demo/doccure/admin/login.html'>
                    <div className='form-group'>
                      <input className='form-control' type='text' placeholder='Name' />
                    </div>
                    <div className='form-group'>
                      <input className='form-control' type='text' placeholder='Email' />
                    </div>
                    <div className='form-group'>
                      <input className='form-control' type='text' placeholder='Password' />
                    </div>
                    <div className='form-group'>
                      <input className='form-control' type='text' placeholder='Confirm Password' />
                    </div>
                    <div className='form-group mb-0'>
                      <button className='btn btn-primary btn-block' type='submit'>
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
