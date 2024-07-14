import NotificationToast from '@/components/NotificationToast';
import { ToastGpt, ToastType } from '@/components/ToastGpt';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

type Notification = {
  message: string;
  type: ToastType;
  show: boolean;
};

type NotificationContextProps = {
  showNotification(message: string, type: ToastType): void;
};

const NotificationContext = createContext<NotificationContextProps>({
  showNotification: () => {},
});

export function useNotification() {
  return useContext(NotificationContext);
}

export default function NotificationProvider({ children }: PropsWithChildren) {
  const [notification, setNotification] = useState<Notification>({
    show: false,
    message: '',
    type: ToastType.SUCCESS,
  });

  const showNotification = (message: string, type: ToastType) => {
    setNotification({
      message: message,
      type: type,
      show: true,
    });
  };

  return (
    <>
      <NotificationContext.Provider value={{ showNotification }}>
        {children}
      </NotificationContext.Provider>
      {/* Notification component */}
      {notification.show && (
        <ToastGpt
          text={notification.message}
          type={notification.type}
          isVisible={notification.show}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}
    </>
  );
}