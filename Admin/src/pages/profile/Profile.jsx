import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import useAuthUser from '../../hooks/useAuthUser.jsx';
import avatar from '../../assets/avatar.webp';
import ModalPopup from '../../components/ModalPopup/ModalPopup.jsx';
import useFormFields from '../../hooks/useFormFields.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { changePass, updateUser } from '../../features/user/userApiSlice.jsx';
import { useEffect, useState } from 'react';
import { createToast } from '../../utils/toastify.js';
import { getUserData, setMessageEmpty } from '../../features/user/useSlice.jsx';
// import avatar from '../../assets/avatar.webp';

const Profile = () => {
  const { user } = useAuthUser();
  const { user: allUserData, error, message } = useSelector(getUserData);
  const [loggedUser, setLoggedUser] = useState(user);
  const { input, setInput, handleInputChange } = useFormFields({ ...loggedUser });
  const { input: passInput, setInput: passSetInput, handleInputChange: passHandleInputChange } = useFormFields({ oldPass: '', newPass: '', conPass: '' });
  const dispatch = useDispatch();

  //   <!-- handle user update btn -->
  const handleProfileUpdateBtn = () => {
    setInput(loggedUser);
  };

  //   <!-- handle user form update -->
  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user._id, data: { name: input.name, email: input.email, gender: input.gender, mobile: input.mobile } }));
  };

  //   <!-- handle change password form -->
  const handlePassFormSubmit = (e) => {
    e.preventDefault();
    if (!passInput.oldPass || !passInput.newPass || !passInput.conPass) {
      return createToast('All fields are required!', 'warning');
    }
    if (passInput.newPass !== passInput.conPass) return createToast('Confirm Password not match!', 'warning');
    dispatch(changePass({ id: loggedUser._id, data: passInput }));
    passSetInput({ oldPass: '', newPass: '', conPass: '' });
  };

  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, 'success');
      dispatch(setMessageEmpty());
    }

    setLoggedUser(allUserData?.find((item) => item._id === user._id));
  }, [error, message, dispatch, allUserData, setInput, user._id]);

  return (
    <>
      {/* <!-- User update Modal --> */}
      <ModalPopup
        title='Update Profile'
        target='userUpdateModalPopup'>
        <form onSubmit={handleUpdateFormSubmit}>
          <div className='row form-row'>
            <div className='col-12 col-sm-6'>
              <div className='form-group'>
                <label>Name</label>
                <input
                  name='name'
                  type='text'
                  className='form-control'
                  value={input?.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='col-12 col-sm-6'>
              <div className='form-group'>
                <label>Email</label>
                <input
                  name='email'
                  value={input?.email}
                  onChange={handleInputChange}
                  type='text'
                  className='form-control'
                />
              </div>
            </div>

            <div className='col-12 col-sm-6'>
              <div className='form-group'>
                <label>Mobile</label>
                <input
                  name='mobile'
                  type='text'
                  value={input?.mobile || ''}
                  onChange={handleInputChange}
                  className='form-control'
                />
              </div>
            </div>
            <div className='col-12 col-sm-6'>
              <div className='form-group'>
                <label>Gender</label>
                <select
                  className=' form-control'
                  name='gender'
                  id=''
                  onChange={handleInputChange}>
                  <option
                    selected={loggedUser?.gender ? false : true}
                    disabled>
                    -select-gender-
                  </option>
                  <option
                    value='Male'
                    selected={loggedUser?.gender === 'Male' ? true : false}>
                    Male
                  </option>
                  <option
                    value='Female'
                    selected={loggedUser?.gender === 'Female' ? true : false}>
                    Female
                  </option>
                  <option
                    value='Others'
                    selected={loggedUser?.gender === 'Others' ? true : false}>
                    Others
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='btn btn-primary btn-block'>
            Save Changes
          </button>
        </form>
      </ModalPopup>

      {/* <!-- Page Header --> */}
      <PageHeader title='Profile' />
      {/* <!-- /Page Header --> */}

      <div className='row'>
        <div className='col-md-12'>
          <div className='profile-header'>
            <div className='row align-items-center'>
              <div className='col-auto profile-image'>
                <a href='#'>
                  <img
                    className='rounded-circle'
                    style={{ width: '100px', height: '100px' }}
                    alt='User Image'
                    src={!loggedUser?.photo ? avatar : loggedUser?.photo}
                  />
                </a>
              </div>
              <div className='col ml-md-n2 profile-user-info'>
                <h4 className='user-name mb-0'>{loggedUser?.name}</h4>
                <h6 className='text-muted'>{loggedUser?.email}</h6>
                <div className='user-Location'>
                  <i className='fa fa-map-marker'></i> Florida, United States
                </div>
                <div className='about-text mt-2'>This is you Profile. Here you can see your all info.</div>
              </div>
            </div>
          </div>
          <div className='profile-menu'>
            <ul className='nav nav-tabs nav-tabs-solid'>
              <li className='nav-item'>
                <a
                  className='nav-link active'
                  data-toggle='tab'
                  href='#per_details_tab'>
                  About
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  data-toggle='tab'
                  href='#password_tab'>
                  Password
                </a>
              </li>
            </ul>
          </div>
          <div className='tab-content profile-tab-cont'>
            {/* <!-- Personal Details Tab --> */}
            <div
              className='tab-pane fade show active'
              id='per_details_tab'>
              {/* <!-- Personal Details --> */}
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title d-flex justify-content-between'>
                        <span>Personal Details</span>
                        <a
                          className='edit-link'
                          data-toggle='modal'
                          href='#userUpdateModalPopup'
                          onClick={handleProfileUpdateBtn}>
                          <i className='fa fa-edit mr-1'></i>Edit
                        </a>
                      </h5>
                      <div className='row'>
                        <p className='col-sm-2 text-muted text-sm-right mb-0 mb-sm-3'>Name</p>
                        <p className='col-sm-10'>{loggedUser?.name}</p>
                      </div>

                      <div className='row'>
                        <p className='col-sm-2 text-muted text-sm-right mb-0 mb-sm-3'>Email</p>
                        <p className='col-sm-10'>{loggedUser?.email}</p>
                      </div>
                      <div className='row'>
                        <p className='col-sm-2 text-muted text-sm-right mb-0 mb-sm-3'>Mobile</p>
                        <p className='col-sm-10'>{loggedUser?.mobile || 'None'}</p>
                      </div>
                      <div className='row'>
                        <p className='col-sm-2 text-muted text-sm-right mb-0 mb-sm-3'>Gender</p>
                        <p className='col-sm-10'>{loggedUser?.gender || 'None'}</p>
                      </div>
                      <div className='row'>
                        <p className='col-sm-2 text-muted text-sm-right mb-0'>Address</p>
                        <p className='col-sm-10 mb-0'>4663 Agriculture Lane, Miami, Florida - 33165, United States.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Personal Details --> */}
            </div>
            {/* <!-- /Personal Details Tab --> */}

            {/* <!-- Change Password Tab --> */}
            <div
              id='password_tab'
              className='tab-pane fade'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Change Password</h5>
                  <div className='row'>
                    <div className='col-md-10 col-lg-6'>
                      <form onSubmit={handlePassFormSubmit}>
                        <div className='form-group'>
                          <label>Old Password</label>
                          <input
                            name='oldPass'
                            value={passInput.oldPass}
                            onChange={passHandleInputChange}
                            type='password'
                            className='form-control'
                          />
                        </div>
                        <div className='form-group'>
                          <label>New Password</label>
                          <input
                            name='newPass'
                            value={passInput.newPass}
                            onChange={passHandleInputChange}
                            type='password'
                            className='form-control'
                          />
                        </div>
                        <div className='form-group'>
                          <label>Confirm Password</label>
                          <input
                            name='conPass'
                            value={passInput.conPass}
                            onChange={passHandleInputChange}
                            type='password'
                            className='form-control'
                          />
                        </div>
                        <button
                          className='btn btn-primary'
                          type='submit'>
                          Save Changes
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /Change Password Tab --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
