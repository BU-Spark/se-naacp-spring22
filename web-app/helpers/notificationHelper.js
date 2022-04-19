import { toast } from 'react-toastify';
import ToastNotification from '../components/primary/ToastNotification';

function success(message, title) {
  toast.success(<ToastNotification title={title} message={message} />);
}

function error(message, title) {
  toast.error(<ToastNotification title={title} message={message} />);
}

export const notify = {
  success,
  error,
};
