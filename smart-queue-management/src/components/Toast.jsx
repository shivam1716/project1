import { useEffect } from "react";

function Toast({
  message,
  type = "success",
  onClose
}) {

  useEffect(() => {

    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);

  }, [onClose]);

  return (

    <div className={`toast ${type}`}>
      {message}
    </div>

  );

}

export default Toast;