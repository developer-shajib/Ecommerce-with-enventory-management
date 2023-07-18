import swal from 'sweetalert';

export const sweetAlertBasic = (msg = '') => {
  swal(msg);
};

export const sweetAlertStandard = (msg, icon = 'error') => {
  swal({
    title: msg.title,
    text: msg.text ? msg.text : '',
    icon,
    button: 'ok'
  });
};

export const sweetAlertConfirm = (msg, icon = 'error') => {
  swal({
    title: msg.title,
    text: msg.text ? msg.text : '',
    icon: icon,
    buttons: true,
    dangerMode: true
  }).then((willDelete) => {
    if (willDelete) {
      swal('Poof! Your imaginary file has been deleted!', {
        icon: 'success'
      });
    } else {
      swal('Your imaginary file is safe!');
    }
  });
};
