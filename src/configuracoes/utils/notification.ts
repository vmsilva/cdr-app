////"@notifee/react-native": "^7.8.0",
import * as Notifications from "expo-notifications";

export async function ExibePushNotificationLocal(dados: any) {
  try{
    await Notifications.scheduleNotificationAsync({
      content: {
        title: dados.title,
        body: dados.body,
        data: { data: 'goes here' },
      },
      trigger: null,//{ seconds: 2 },
    });
  }catch(error){
    console.log(error)
  }
}

export async function ExibePushNotificationLocalOLD(dados: any) {
  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    //badge: true,
    //sound: 
  });

  // Display a notification
  await notifee.displayNotification({
    title: dados.title,
    body: dados.body,
    android: {
      channelId,
      smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}