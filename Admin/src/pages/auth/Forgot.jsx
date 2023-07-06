import { Link } from 'react-router-dom';
import logoWhite from '../../assets/img/logo-white.png';

const Forgot = () => {
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
                  <h1>Forgot Password</h1>

                  {/* <!-- Form --> */}
                  <form action='https://dreamguys.co.in/demo/doccure/admin/index.html'>
                    <div className='form-group'>
                      <input className='form-control' type='text' placeholder='Email' />
                    </div>

                    <div className='form-group'>
                      <button className='btn btn-primary btn-block' type='submit'>
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
