import notifee,{ AndroidAction, AndroidImportance, AndroidStyle, IntervalTrigger, RepeatFrequency, TimestampTrigger, TimeUnit, TriggerType } from "@notifee/react-native";

export const createTimestampNotification=async(imageUrl:string,title:string,body:string,triggerDate:Date,notificationId:string)=>{
    const now=new Date();
    const trigger:TimestampTrigger={
        type:TriggerType.TIMESTAMP,
       timestamp: Date.now() + 60 * 3000,
        repeatFrequency:RepeatFrequency.NONE,
        alarmManager:true
    }
    const action:AndroidAction={
        title:"View Details",
        pressAction:{
            id:"view details",
            launchActivity:"default"
        }
    }
    await notifee.createTriggerNotification({
        id:notificationId,
            title,
             body,
             android:{
                 channelId:'default',
                 sound:"notification",
                 onlyAlertOnce:true,
                 smallIcon:'icon',
                 style:{
                     type:AndroidStyle.BIGPICTURE,
                     picture:imageUrl || require('../asset/Images/logo.png')
                 },
                 actions:[action]
             }   
    },trigger)
    
        const checklog=async()=> await notifee.getTriggerNotifications();
    console.log("🔍 Scheduled Triggers:", await checklog());
}


