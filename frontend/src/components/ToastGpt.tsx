import React, { useEffect, useState } from 'react';
import {
  FiCheckCircle,
  FiInfo,
  FiAlertCircle,
  FiXCircle,
} from 'react-icons/fi';

enum ToastType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

const toastIcons: Record<ToastType, JSX.Element> = {
  [ToastType.SUCCESS]: <FiCheckCircle />,
  [ToastType.INFO]: <FiInfo />,
  [ToastType.WARNING]: <FiAlertCircle />,
  [ToastType.ERROR]: <FiXCircle />,
};

const toastStyles: Record<ToastType, React.CSSProperties> = {
  [ToastType.SUCCESS]: { backgroundColor: '#28a745', color: 'white' },
  [ToastType.INFO]: { backgroundColor: '#17a2b8', color: 'white' },
  [ToastType.WARNING]: { backgroundColor: '#ffc107', color: 'black' },
  [ToastType.ERROR]: { backgroundColor: '#dc3545', color: 'white' },
};

interface ToastProps {
  text: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ text, type, isVisible, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onClose, 300); // Durée de la transition
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const toastStyle: React.CSSProperties = {
    ...toastStyles[type],
    padding: '10px 20px',
    position: 'fixed',
    top: '100px',
    right: '30px',
    borderRadius: '5px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'opacity 300ms, transform 300ms',
    opacity: isExiting ? 0 : 1,
    transform: isExiting ? 'translateX(100px)' : 'translateX(0)',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
  };

  if (!isVisible && !isExiting) return null;

  return (
    <div style={toastStyle}>
      <span style={{ marginRight: '10px', fontSize: '20px' }}>
        {toastIcons[type]}
      </span>
      {text}
    </div>
  );
};

export { Toast as ToastGpt, ToastType };
