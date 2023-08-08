import { useEffect, useState } from 'react';
import ModalPopup from '../../components/ModalPopup/ModalPopup.jsx';
import DataTable from 'datatables.net-dt';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import { AiTwotoneEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { generateRandomPassword } from '../../helpers/geneateRandomPassword.jsx';
import { useForm, Controller } from 'react-hook-form';
import { createToast } from '../../utils/toastify.js';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, deleteUser, updateUser } from '../../features/user/userApiSlice.jsx';
import { getUserData, setMessageEmpty } from '../../features/user/useSlice.jsx';
import { timeAgo } from '../../helpers/timeAgo.jsx';
import swal from 'sweetalert';
import useFormFields from '../../hooks/useFormFields.jsx';

const User = () => {
  const dispatch = useDispatch();
  const { user, role, error, message } = useSelector(getUserData);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm();
  // const [updateData, setUpdateData] = useState({});
  const { input, setInput, handleInputChange } = useFormFields({});

  // <!-- handle random password -->
  const handleRandomPassword = (e) => {
    e.preventDefault();
    const rp_pass = generateRandomPassword();
    setValue('password', rp_pass);
  };

  // <!-- create form submit -->
  const onSubmit = (data) => {
    dispatch(createUser(data));
    reset();
  };

  // <!-- handle update password -->
  const handleUpdateRandomPassword = (e) => {
    e.preventDefault();
    const rp_pass = generateRandomPassword();
    setInput((prevState) => ({ ...prevState, password: rp_pass }));
  };

  // <!-- handle Delete Btn -->
  const handleDeleteBtn = (id) => {
    swal({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUser(id));
      }
    });
  };

  // <!-- handle update btn -->
  const handleUserUpdateBtn = (id) => {
    const editData = user.find((data) => data._id === id);
    setInput({ ...editData, password: '' });
  };

  // <!-- handle update form submit -->
  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    const data = { name: input.name, email: input.email, password: input.password, role: input.role };
    dispatch(updateUser({ id: input._id, data }));
    // setInput({});
  };

  // <!-- handle status btn -->
  const handleStatusBtn = (id, status) => {
    dispatch(updateUser({ id, data: { status: !status } }));
  };

  new DataTable('.datatable');
  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, 'success');
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);

  return (
    <>
      {/* <!-- User create Modal --> */}
      <ModalPopup
        title='Add New User'
        target='userModalPopup'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-3'>
            <label htmlFor=''>Name</label>
            <input
              type='text'
              className='form-control'
              {...register('name', { required: 'Name is required!' })}
            />
            {errors?.name?.message && <p className='text-danger'>{errors.name.message}</p>}
          </div>
          <div className='my-2'>
            <label htmlFor=''>Email</label>
            <input
              className='form-control'
              type='text'
              {...register('email', { required: 'Email is required!', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, message: 'Invalid Email address!' } })}
            />
            {errors?.email?.message && <p className='text-danger'>{errors.email.message}</p>}
          </div>
          <div className='my-2'>
            <label htmlFor=''>Password</label>

            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <input
                  className='form-control'
                  type='text'
                  {...field}
                />
              )}
            />
            {errors?.password?.message && <p className='text-danger mb-0'>{errors.password.message}</p>}

            <button
              className='badge badge-success mb-2  fs-4'
              onClick={handleRandomPassword}>
              Generate
            </button>
          </div>
          <div className='my-2'>
            <label htmlFor=''>Select Role</label>
            <Controller
              name='role'
              control={control}
              defaultValue=''
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <select
                  {...field}
                  className='form-control'>
                  <option
                    value=''
                    disabled>
                    Select an option
                  </option>
                  {role?.map((item, index) => (
                    <option
                      key={index}
                      value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <div className='my-2'>
            <button
              className='btn btn-sm btn-primary form-control'
              type='submit'>
              Create new user
            </button>
          </div>
        </form>
      </ModalPopup>

      {/* <!-- User update Modal --> */}
      <ModalPopup
        title='User update'
        target='userUpdateModalPopup'>
        <form onSubmit={handleUpdateFormSubmit}>
          <div className='my-3'>
            <label htmlFor=''>Name</label>
            <input
              name='name'
              type='text'
              value={input?.name}
              onChange={handleInputChange}
              className='form-control'
            />
          </div>
          <div className='my-2'>
            <label htmlFor=''>Email</label>
            <input
              name='email'
              value={input.email}
              onChange={handleInputChange}
              className='form-control'
              type='text'
            />
          </div>
          <div className='my-2'>
            <label htmlFor=''>Password</label>

            <input
              className='form-control'
              value={input.password}
              onChange={handleInputChange}
              name='password'
              type='text'
            />

            <button
              className='badge badge-success mb-2  fs-4'
              onClick={handleUpdateRandomPassword}>
              Generate
            </button>
          </div>
          <div className='my-2'>
            <label htmlFor=''>Select Role</label>
            <select
              className='form-control'
              name='role'
              id=''
              onChange={handleInputChange}>
              {role?.map((item, index) => (
                <option
                  key={index}
                  value={item.name}
                  selected={item.name == input.role ? true : false}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className='my-2'>
            <button
              className='btn btn-sm btn-primary form-control'
              type='submit'>
              Update User
            </button>
          </div>
        </form>
      </ModalPopup>

      {/* <!-- Page Header --> */}
      <PageHeader title='User' />
      {/* <!-- /Page Header --> */}

      <div className='row'>
        <div className='col-md-12'>
          <button
            data-target='#userModalPopup'
            data-toggle='modal'
            className='btn btn-success mb-3'>
            Add New
          </button>
          {/* <!-- Recent Orders --> */}
          <div className='card card-table'>
            <div className='card-body'>
              <div className='table-responsive'>
                {user && (
                  <table className='datatable table table-hover table-center mb-0'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className='text-right'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...user]?.reverse().map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item?.role?.name} </td>
                          <td>{timeAgo(item.createdAt)} </td>
                          <td>
                            <div className='status-toggle'>
                              <input
                                type='checkbox'
                                id='status_1'
                                className='check'
                                checked={item.status}
                              />
                              <label
                                onClick={() => handleStatusBtn(item._id, item.status)}
                                htmlFor='status_1'
                                className='checktoggle'>
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className='text-right'>
                            <button
                              //  onClick={() => handleRoleEdit(item._id)}
                              data-toggle='modal'
                              data-target='#userUpdateModalPopup'
                              className='btn btn-warning btn-sm'
                              onClick={() => handleUserUpdateBtn(item._id)}>
                              <AiTwotoneEdit />
                            </button>
                            &nbsp;
                            <button
                              onClick={() => handleDeleteBtn(item._id)}
                              className='btn btn-danger btn-sm'>
                              <BsFillTrashFill />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          {/* <!-- /Recent Orders --> */}
        </div>
      </div>
    </>
  );
};

export default User;
