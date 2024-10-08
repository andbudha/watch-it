import toast from 'react-hot-toast';

export const successfulToast = (message: string) =>
  toast.success(message, {
    duration: 3500,
    style: {
      border: '1px solid #7e30e1',
      padding: '16px',
      color: '#7e30e1',
      fontSize: '16px',
      textAlign: 'center',
      letterSpacing: '1px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#864af9',
      secondary: '#fff',
    },
  });
