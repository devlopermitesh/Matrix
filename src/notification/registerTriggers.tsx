import useAccount from "../state/userState"
import { createTimestampNotification } from "./notificationUnit"
import notifee from "@notifee/react-native"
class Trigger{
    TODOS_NOTIFICATION_REMINDER="TODOS_NOTIFICATION_REMINDER"
constructor(){

}

//as a new todo get set we set a notification timer for that
setnotify=async(title:string,body:string,triggerDate:Date,id:string)=>{
    const  {NotificationOn}  = useAccount.getState()
console.log("Creating new notification ",title,triggerDate,id)
    if (!NotificationOn) {
      console.log("🔕 Notifications are disabled");
      return;
    }
    console.log("Creating a new notification")
await createTimestampNotification(require('../asset/Images/Keepgoing.png'),title,body,triggerDate,`${this.TODOS_NOTIFICATION_REMINDER}-${id}`)
}
//delete notification
deletenotify=async(id:string)=>{
  const notifications=await notifee.getTriggerNotifications()
     for(const notification of notifications){
        if(notification.notification.id===`${this.TODOS_NOTIFICATION_REMINDER}-${id}`){
            await notifee.cancelNotification(notification.notification.id)
        }
    }
}
updatenotify=async(id:string,title:string,body:string,triggerDate:Date)=>{
    await this.deletenotify(id);
    await this.setnotify(title,body,triggerDate,id)
}

}
export const trigger=new Trigger();