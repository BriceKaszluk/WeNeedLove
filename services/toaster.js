import { toast } from 'react-nextjs-toast';

const toaster = {
  success: (title, message) => {
    toast.notify(message, {
      title: title,
      duration: 5,
      type: "success",
      targetId: "toast-comp-3"
    })
  },
  error: (title, message) => {
    toast.notify(message, {
      title: title,
      duration: 5,
      type: "error",
      targetId: "toast-comp-3"
    })
  }
}

export default toaster;
