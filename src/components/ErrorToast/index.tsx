import { ToastBar, Toaster } from 'react-hot-toast';
import { IoRefreshCircle } from 'react-icons/io5';
import { MdError } from 'react-icons/md';

import './index.scss';

const ErrorToast = () => {
  return (
    <Toaster
      position="bottom-center"
      containerClassName="error-container"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        className: 'error-item',
        icon: <MdError size={18} />,
        duration: 5000,
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              <IoRefreshCircle
                className="error-item-icon--reload"
                size={18}
                onClick={() => window.location.reload()}
              />
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default ErrorToast;
