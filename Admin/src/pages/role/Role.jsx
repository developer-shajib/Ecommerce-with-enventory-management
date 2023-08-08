import { useEffect, useState } from 'react';
import ModalPopup from '../../components/ModalPopup/ModalPopup.jsx';
import DataTable from 'datatables.net-dt';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiTwotoneEdit } from 'react-icons/ai';
import useFormFields from '../../hooks/useFormFields.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, setMessageEmpty } from '../../features/user/useSlice.jsx';
import { createToast } from '../../utils/toastify.js';
import { createRole, deleteRole, updateRole } from '../../features/user/userApiSlice.jsx';
import { timeAgo } from '../../helpers/timeAgo.jsx';
import swal from 'sweetalert';
import Skeleton from 'react-loading-skeleton';

const Role = () => {
  const { input, handleInputChange, setInput } = useFormFields({ name: '' });
  const { role, permission, error, message } = useSelector(getUserData);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const [roleEdit, setRoleEdit] = useState({});

  // <!-- handle form checkbox -->
  const handleCheckBoxChange = (e) => {
    const val = e.target.value;
    const updateList = [...selected];

    if (selected.includes(val)) {
      updateList.splice(selected.indexOf(val), 1);
    } else {
      updateList.push(val);
    }
    setSelected(updateList);
  };

  // <!-- Handle form submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input.name) return createToast('Role name are required!', 'warning');

    if (selected.length === 0) return createToast('Permission not selected!', 'warning');

    dispatch(createRole({ name: input.name, permissions: selected }));
    setInput({ name: '' });
    setSelected([]);
  };

  // <!-- Handle Status btn -->
  const handleStatusBtn = (id, name, status, permissions) => {
    // dispatch(updateRole({ id, status: !status }));
    dispatch(updateRole({ id, data: { name, status: !status, permissions: selected.length > 0 ? selected : permissions } }));
  };

  // <!-- Delete for permission -->
  const handleDeleteBtn = (id) => {
    swal({
      title: 'Are you sure?',
      text: '',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteRole(id));
      }
    });
  };

  // <!-- Role Edit  -->
  const handleRoleEdit = (id) => {
    const editData = role.find((data) => data._id === id);
    setRoleEdit(editData);

    const data = editData.permissions.map((item) => item._id);
    setSelected(data);
  };

  // <!-- handle Edit Input Change -->
  const handleEditInputChange = (e) => {
    setRoleEdit((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  // <!-- Handle role update form submit -->
  const handleRoleUpdateFormSubmit = (e) => {
    e.preventDefault();

    dispatch(updateRole({ id: roleEdit._id, data: { name: roleEdit.name, status: roleEdit.status, permissions: selected } }));
    setSelected([]);
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
  }, [dispatch, error, message]);

  return (
    <>
      {/* <!-- Create  Modal --> */}
      <ModalPopup
        title='Add New Role'
        target='roleModalPopup'>
        <form onSubmit={handleFormSubmit}>
          <div className='my-3'>
            <label htmlFor=''>Role Name</label>
            <input
              value={input.name}
              onChange={handleInputChange}
              type='text'
              className='form-control'
              name='name'
            />
          </div>
          <div className='my-3'>
            <label className='d-flex'>Permissions</label>

            <div className='d-flex flex-wrap gap-6 mx-auto'>
              {permission?.map((item, index) => {
                return (
                  <>
                    <label
                      key={index}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '10px', width: '22%' }}>
                      <input
                        type='checkbox'
                        value={item._id}
                        checked={selected.includes(item._id)}
                        onChange={handleCheckBoxChange}
                      />{' '}
                      <p style={{ marginBottom: 0, paddingTop: '4px' }}> {item.name}</p>
                    </label>
                  </>
                );
              })}
            </div>
          </div>
          <div className='my-3'>
            <button
              className='btn btn-primary w-100'
              type='submit'>
              Add Now
            </button>
          </div>
        </form>
      </ModalPopup>

      {/* <!-- Role Edit Modal --> */}
      <ModalPopup
        title='Edit Role'
        target='roleEdit'>
        <form onSubmit={handleRoleUpdateFormSubmit}>
          <div className='my-3'>
            <label htmlFor=''>Edit Role</label>
            <input
              value={roleEdit.name}
              onChange={handleEditInputChange}
              type='text'
              className='form-control'
              name='name'
            />
          </div>
          <div className='my-3'>
            <label className='d-flex'>Permissions</label>

            <div className='d-flex flex-wrap gap-6 mx-auto'>
              {permission?.map((item, index) => {
                return (
                  <>
                    <label
                      key={index}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '10px', width: '22%' }}>
                      <input
                        type='checkbox'
                        value={item._id}
                        checked={selected.includes(item._id)}
                        onChange={handleCheckBoxChange}
                      />{' '}
                      <p style={{ marginBottom: 0, paddingTop: '4px' }}> {item.name}</p>
                    </label>
                  </>
                );
              })}
            </div>
          </div>
          <div className='my-3'>
            <button
              className='btn btn-primary w-100'
              type='submit'>
              Update
            </button>
          </div>
        </form>
      </ModalPopup>

      {/* <!-- Page Header --> */}
      <PageHeader title='Role' />
      {/* <!-- /Page Header --> */}

      <div className='row'>
        <div className='col-md-12'>
          <button
            data-target='#roleModalPopup'
            data-toggle='modal'
            className='btn btn-success mb-3'>
            Add New
          </button>
          {/* <!-- Recent Orders --> */}
          <div className='card card-table'>
            <div className='card-body'>
              <div className='table-responsive'>
                {role ? (
                  <table className='datatable table table-hover table-center mb-0'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Role Name</th>
                        <th>Slug</th>
                        <th>Permissions</th>
                        <th>CreatedAt</th>
                        <th>Status</th>
                        <th className='text-right'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...role].reverse().map((item, index) => (
                        <tr key={index}>
                          <td> {index + 1 || <Skeleton />}</td>
                          <td>{item.name || <Skeleton />}</td>
                          <td> {item.slug || <Skeleton />} </td>
                          <td>
                            <ul className='d-flex flex-wrap'>
                              {item?.permissions?.map((item, index) => (
                                <span
                                  className='ml-3 border px-2 mb-2'
                                  key={index}>
                                  {item.name || <Skeleton />}
                                </span>
                              ))}
                            </ul>
                          </td>
                          <td> {timeAgo(new Date(item.createdAt))} </td>
                          <td>
                            <div className='status-toggle'>
                              <input
                                type='checkbox'
                                id='status_1'
                                className='check'
                                checked={item.status}
                              />
                              <label
                                onClick={() => handleStatusBtn(item._id, item.name, item.status, item.permissions)}
                                htmlFor='status_1'
                                className='checktoggle'>
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className='text-right'>
                            <button
                              onClick={() => handleRoleEdit(item._id)}
                              data-toggle='modal'
                              data-target='#roleEdit'
                              className='btn btn-warning btn-sm'>
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
                ) : (
                  <Skeleton
                    height={50}
                    count={4}
                  />
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

export default Role;
