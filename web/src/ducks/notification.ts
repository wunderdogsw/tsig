import uuid from "uuid";
import { Color } from "@material-ui/lab";

import DuckFactory from "./DuckFactory";

export type Notification = {
  id: string;
  severity: Color;
  text: string;
  onClose?: () => void;
};

export type NotificationState = {
  notifications: Notification[];
};

const initialState: NotificationState = {
  notifications: []
};

const prefix = "ascents/notification";
const factory = new DuckFactory<NotificationState>();

const addNotification = factory.createAction(
  `${prefix}/ADD`,
  (notification: Notification) => (state: NotificationState) => ({
    notifications: [...state.notifications, notification]
  })
);
const createNotificationProps = (
  severity: Color,
  text: string,
  onClose?: () => void
) => ({
  id: uuid(),
  severity,
  text,
  onClose
});
export const addSuccess = (text: string, onClose?: () => void) =>
  addNotification(createNotificationProps("success", text, onClose));
export const addInfo = (text: string, onClose?: () => void) =>
  addNotification(createNotificationProps("info", text, onClose));
export const addWarning = (text: string, onClose?: () => void) =>
  addNotification(createNotificationProps("warning", text, onClose));
export const addError = (text: string, onClose?: () => void) =>
  addNotification(createNotificationProps("error", text, onClose));

export const removeNotification = factory.createAction(
  `${prefix}/REMOVE`,
  (notificationId: string) => (state: NotificationState) => ({
    notifications: [...state.notifications.filter(n => n.id !== notificationId)]
  })
);

export const clearNotifications = factory.createAction(
  `${prefix}/CLEAR`,
  () => () => initialState
);

export default factory.createReducer(initialState);
