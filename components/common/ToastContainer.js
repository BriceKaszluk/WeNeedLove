import React, { useEffect } from "react";
import { useToasterContext } from "../../contexts/ToasterContext";

export const ToastContainer = () => {
  const { toasts, removeToast } = useToasterContext();

  useEffect(() => {
    // Supprimer chaque toast après 2 secondes
    const timeouts = toasts.map((toast, index) =>
      setTimeout(() => {
        removeToast(toast.id);
      }, 3000 * (index + 1))
    );

    // Annuler les timeouts si le composant est démonté avant
    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-0 right-0 m-4 z-30 cursor-pointer">
      {toasts &&
        toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`flex items-center p-2 rounded-lg text-white font-medium mb-2 ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </div>
        ))}
    </div>
  );
};
