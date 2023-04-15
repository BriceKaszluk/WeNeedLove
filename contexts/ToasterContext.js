import React, { useState, useContext } from 'react';

const ToasterContext = React.createContext();

export const ToastProvider = ({ children }) => {

  const [toasts, setToasts] = useState([]);
  const [toastId, setToastId] = useState(0);

  const addToast = (toast) => {
    setToasts((prevToasts) => [...prevToasts, { ...toast, id: toastId }]);
    setToastId(toastId + 1);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToasterContext.Provider value={{toasts, setToasts, addToast, removeToast}}>
      {children}
    </ToasterContext.Provider>
  );
};

export const useToasterContext = () => useContext(ToasterContext);
