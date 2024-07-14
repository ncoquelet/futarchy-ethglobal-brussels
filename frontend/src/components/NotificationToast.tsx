import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Notification Toast using framer-motion
interface NotificationToastProps {
  show: boolean;
  message: string;
  description?: string;
  type?: string;
  onClose: () => void;
}

export default function NotificationToast({
  show,
  message,
  description,
  type = 'success',
  onClose,
}: NotificationToastProps) {
  useEffect(() => {
    if (show) {
      // Set up the auto-closing timer
      const timer = setTimeout(() => {
        onClose();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  // Determine the icon and colors based on the type
  //const icon = type === 'success' ? faCheckCircle : faExclamationCircle;
  const textColor = type === 'success' ? 'text-green-400' : 'text-red-400';

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none absolute top-10 right-4 flex px-4 py-6 z-50 w-full"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <AnimatePresence mode="wait">
          {show && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                      className={`h-6 w-6 ${textColor}`}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className={`text-sm font-medium ${textColor}`}>
                      {message}
                    </p>
                    {description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
