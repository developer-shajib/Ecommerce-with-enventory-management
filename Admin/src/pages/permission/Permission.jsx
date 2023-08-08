import { useEffect, useState } from 'react';
import ModalPopup from '../../components/ModalPopup/ModalPopup.jsx';
import DataTable from 'datatables.net-dt';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import { BsFillTrashFill } from 'react-icons/bs';
import { createToast } from '../../utils/toastify.js';
import { useDispatch, useSelector } from 'react-redux';
import { createPermission, deletePermission, updatePermission } from '../../features/user/userApiSlice.jsx';
import { getUserData, setMessageEmpty } from '../../features/user/useSlice.jsx';
import swal from 'sweetalert';
import { timeAgo } from '../../helpers/timeAgo.jsx';

const Permission = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { permission, error, message } = useSelector(getUserData);

  // <!-- Handle form submit -->
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      createToast('Fields are required!', 'warning');
    } else {
      dispatch(createPermission(input));
      setInput('');
    }
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
        dispatch(deletePermission(id));
      }
    });
  };

  // <!-- Status Btn -->
  const handleStatusBtn = (id, status) => {
    dispatch(updatePermission({ id, data: { status: !status } }));
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
      {/* <!-- Modal --> */}
      <ModalPopup
        title='Add New Permission'
        target='permissionModalPopup'>
        <form onSubmit={handleFormSubmit}>
          <div className='my-3'>
            <label htmlFor=''>Permission Name</label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type='text'
              className='form-control'
            />
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

      {/* <!-- Page Header --> */}
      <PageHeader title='Permission' />
      {/* <!-- /Page Header --> */}

      <div className='row'>
        <div className='col-md-12'>
          <button
            data-target='#permissionModalPopup'
            data-toggle='modal'
            className='btn btn-success mb-3'>
            Add New
          </button>
          {/* <!-- Recent Orders --> */}
          <div className='card card-table'>
            <div className='card-body'>
              <div className='table-responsive'>
                {permission && (
                  <table className='datatable table table-hover table-center mb-0'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Permission Name</th>
                        <th>Slug</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className='text-right'>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[...permission]?.reverse().map((item, index) => (
                        <tr key={index}>
                          <td> {index + 1} </td>
                          <td>{item?.name}</td>
                          <td> {item?.slug} </td>
                          <td> {timeAgo(new Date(item.createdAt))} </td>
                          <td>
                            <div className='status-toggle'>
                              <input
                                type='checkbox'
                                id='status_1'
                                className='check'
                                checked={item.status ? true : false}
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

export default Permission;
