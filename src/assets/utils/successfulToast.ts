import toast from 'react-hot-toast';

export const successfulToast = (message: string) =>
  toast.success(message, {
    duration: 5000,
    style: {
      border: '1px solid #7e30e1',
      padding: '16px',
      color: '#7e30e1',
    },
    iconTheme: {
      primary: '#7e30e1',
      secondary: '#fff',
    },
  });
