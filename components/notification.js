import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import Texts from '../utils/Texts';

const NOTIFICATION_KEY = 'Memorize:notifications'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(11)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}


function createNotification() {
    return {
        title: Texts.YOU_DONT_STUDIED_TODAY,
        body: Texts.HEY_LETS_STUDY_NOW,
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}