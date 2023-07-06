import { useEffect } from 'react';
import doctorAvatar from '../../assets/img/doctors/doctor-thumb-01.jpg';
import ModalPopup from '../../components/ModalPopup/ModalPopup.jsx';
import DataTable from 'datatables.net-dt';

const User = () => {
  useEffect(() => {
    new DataTable('.datatable');
  }, []);

  return (
    <>
      {/* <!-- Modal --> */}
      <ModalPopup title='Add New User' target='userModalPopup'>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo eaque amet excepturi asperiores est, nisi ex
          harum delectus numquam accusamus beatae odio nobis nulla voluptas culpa laboriosam rem quae atque dignissimos
          laudantium quisquam. Atque sint dolore est! Saepe odit incidunt, tempore, velit sint nesciunt recusandae
          delectus accusamus modi illo amet labore minima beatae. Molestiae et maxime aperiam inventore, doloremque nemo
          delectus sunt nisi corporis corrupti iste placeat natus? Asperiores blanditiis nostrum ducimus molestias autem
          natus, quaerat nemo, sapiente optio voluptatum fugiat, nobis fugit magni vitae enim necessitatibus
          voluptatibus eaque temporibus laudantium pariatur quidem debitis deserunt maxime? Magnam excepturi soluta
          iste?
        </p>
      </ModalPopup>

      {/* <!-- Page Header --> */}
      <div className='page-header'>
        <div className='row'>
          <div className='col-sm-12'>
            <h3 className='page-title'>Welcome Admin!</h3>
            <ul className='breadcrumb'>
              <li className='breadcrumb-item active'>Users</li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- /Page Header --> */}

      <div className='row'>
        <div className='col-md-12'>
          <button data-target='#userModalPopup' data-toggle='modal' className='btn btn-success mb-3'>
            Add New
          </button>
          {/* <!-- Recent Orders --> */}
          <div className='card card-table'>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='datatable table table-hover table-center mb-0'>
                  <thead>
                    <tr>
                      <th>Doctor Name</th>
                      <th>Speciality</th>
                      <th>Patient Name</th>
                      <th>Apointment Time</th>
                      <th>Status</th>
                      <th className='text-right'>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h2 className='table-avatar'>
                          <a href='profile.html' className='avatar avatar-sm mr-2'>
                            <img className='avatar-img rounded-circle' src={doctorAvatar} alt='User Image' />
                          </a>
                          <a href='profile.html'>Dra. Ruby Perrin</a>
                        </h2>
                      </td>
                      <td>Dental</td>
                      <td>
                        <h2 className='table-avatar'>
                          <a href='profile.html' className='avatar avatar-sm mr-2'>
                            <img className='avatar-img rounded-circle' src={doctorAvatar} alt='User Image' />
                          </a>
                          <a href='profile.html'>Charlene Reed </a>
                        </h2>
                      </td>
                      <td>
                        9 Nov 2019 <span className='text-primary d-block'>11.00 AM - 11.15 AM</span>
                      </td>
                      <td>
                        <div className='status-toggle'>
                          <input type='checkbox' id='status_1' className='check' checked />
                          <label htmlFor='status_1' className='checktoggle'>
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className='text-right'>$200.00</td>
                    </tr>
                    <tr>
                      <td>
                        <h2 className='table-avatar'>
                          <a href='profile.html' className='avatar avatar-sm mr-2'>
                            <img className='avatar-img rounded-circle' src={doctorAvatar} alt='User Image' />
                          </a>
                          <a href='profile.html'>Dr. Ruby Perrin</a>
                        </h2>
                      </td>
                      <td>Dental</td>
                      <td>
                        <h2 className='table-avatar'>
                          <a href='profile.html' className='avatar avatar-sm mr-2'>
                            <img className='avatar-img rounded-circle' src={doctorAvatar} alt='User Image' />
                          </a>
                          <a href='profile.html'>Charlene Reed </a>
                        </h2>
                      </td>
                      <td>
                        9 Nov 2019 <span className='text-primary d-block'>11.00 AM - 11.15 AM</span>
                      </td>
                      <td>
                        <div className='status-toggle'>
                          <input type='checkbox' id='status_1' className='check' checked />
                          <label htmlFor='status_1' className='checktoggle'>
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className='text-right'>$200.00</td>
                    </tr>
                    <tr>
                      <td>
                        <h2 className='table-avatar'>
                          <a href='profile.html' className='avatar avatar-sm mr-2'>
                            <img className='avatar-img rounded-circle' src={doctorAvatar} alt='User Image' />
                          </a>
                          <a href='profile.html'>Dr. Ruby Perrin</a>
                        </h2>
                      </td>
                      <td>Dental</td>
                      <td>
                        <h2 className='table-avatar'>
                          <a href='profile.html' className='avatar avatar-sm mr-2'>
                            <img className='avatar-img rounded-circle' src={doctorAvatar} alt='User Image' />
                          </a>
                          <a href='profile.html'>Charlene Reed </a>
                        </h2>
                      </td>
                      <td>
                        9 Nov 2019 <span className='text-primary d-block'>11.00 AM - 11.15 AM</span>
                      </td>
                      <td>
                        <div className='status-toggle'>
                          <input type='checkbox' id='status_1' className='check' checked />
                          <label htmlFor='status_1' className='checktoggle'>
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className='text-right'>$200.00</td>
                    </tr>
                    <tr>
                      <td>
                        <h2 className='table-avatar'>
                          <a href='profile.html' className='avatar avatar-sm mr-2'>
                            <img className='avatar-img rounded-circle' src={doctorAvatar} alt='User Image' />
                          </a>
                          <a href='profile.html'>Dr. Ruby Perrin</a>
                        </h2>
                      </td>
                      <td>Dental</td>
                      <td>
                        <h2 className='table-avatar'>
                          <a href='profile.html' className='avatar avatar-sm mr-2'>
                            <img className='avatar-img rounded-circle' src={doctorAvatar} alt='User Image' />
                          </a>
                          <a href='profile.html'>Charlene Reed </a>
                        </h2>
                      </td>
                      <td>
                        9 Nov 2019 <span className='text-primary d-block'>11.00 AM - 11.15 AM</span>
                      </td>
                      <td>
                        <div className='status-toggle'>
                          <input type='checkbox' id='status_1' className='check' checked />
                          <label htmlFor='status_1' className='checktoggle'>
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className='text-right'>$200.00</td>
                    </tr>
                  </tbody>
                </table>
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
