import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import useNotifications from "../../hooks/useNotifications";
import { removeNotification, Notification } from "../../ducks/notification";

const AUTO_HIDE_DURATION = 5000;

const Notifications: React.FC = () => {
  const { notifications } = useNotifications();

  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications.length === 0) {
      return;
    }

    const notification = notifications[0];
    setTimeout(
      () => dispatch(removeNotification(notification.id)),
      AUTO_HIDE_DURATION
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  const handleClose = (notification: Notification) => {
    dispatch(removeNotification(notification.id));
    notification.onClose && notification.onClose();
  };

  if (notifications.length === 0) {
    return null;
  }
  const notification = notifications[0];
  return (
    <Snackbar
      key={notification.id}
      open={true}
      autoHideDuration={AUTO_HIDE_DURATION}
      onClose={() => handleClose(notification)}
    >
      <Alert
        severity={notification.severity}
        onClose={() => handleClose(notification)}
      >
        {notification.text}
      </Alert>
    </Snackbar>
  );
};

export default Notifications;
