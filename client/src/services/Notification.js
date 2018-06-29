const toastr = require('toastr');
toastr.options.progressBar = true;

class Notification {

  static success(message, title = null) {
    toastr.success(message, title)
  }

  static warning(message, title = null) {
    toastr.warning(message, title)
  }

  static error(message, title = null) {
    toastr.error(message, title)
  }
}

export default Notification;
