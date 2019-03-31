import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = "Udacicards:Notification";

export const clearNotification = () => (
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
)

export const createNotification = {
  title: 'Hello',
  body: "Would you like to play quiz now?",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  },
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            console.log(status)
            if (status === 'granted') {

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate()+1)
              tomorrow.setHours(17);
              tomorrow.setMinutes(0);

              const schedulingOptions = {
                time: new Date(tomorrow).getTime(),
                repeat: 'day',
              }
            
              Notifications.cancelAllScheduledNotificationsAsync()
              
              Notifications.scheduleLocalNotificationAsync(
                createNotification, schedulingOptions
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      } 
    })
}