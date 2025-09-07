import notifee, { EventType } from "@notifee/react-native"

notifee.onForegroundEvent(({ type, detail }) => {
  if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'drink-water') {
    console.log('User confirmed they drank water 💧');
  }
  if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'water-intake') {
    console.log(' water in take 💧');
  }
  
});

notifee.onBackgroundEvent(async({type,detail})=>{
    console.log(type)
    console.log(detail)
    if(type===EventType.ACTION_PRESS && detail.pressAction?.id==="drink-water-background"){
console.log("drink water inbackground")
    }
})