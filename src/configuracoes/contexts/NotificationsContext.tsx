/*
  MUITA CALMA NESSA HORA API DE CONTEXTO ALTO RISCO DE MEMORY LEAK 
  CUIDADO COM LOOP INFINITO
  REMEMBER THAT
*/
import React, { createContext, useEffect, useRef, useState } from "react";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

interface NotificationsProps {
  children: any;
}

type NotificationsData = {
 
};

export const NotificationContext = createContext({} as NotificationsData);

function NotificationsProvider({ children }: NotificationsProps): JSX.Element {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef() as any;
  const responseListener = useRef() as any;

  async function registerForPushNotificationsAsync() {

    try{
      let token;
  
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          console.log('Failed to get push token for push notification!');
          return;
        }
        // Learn more about projectId:
        // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
        token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig?.extra?.eas?.projectId })).data;
        console.log(token);
      } else {
        console.log('Must use physical device for Push Notifications');
      }
    
      return token;
    }catch(error){
      console.log(error)
    }
   
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  return (
    <NotificationContext.Provider
      value={{
       
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationsProvider;
