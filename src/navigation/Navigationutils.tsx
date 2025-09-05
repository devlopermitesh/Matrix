import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";
import { StackScreen } from "../navigation/router";

export const navigationRef=createNavigationContainerRef()
export async function navigate(route:(keyof StackScreen),params?:object){
    navigationRef.isReady();
    if(navigationRef.isReady()){
        navigationRef.dispatch(CommonActions.navigate(route,params));
    }
}

export async function resetAndnavigate(route: keyof StackScreen) {
  // Wait a tick if not ready immediately
  if (!navigationRef.isReady()) {
    await new Promise(resolve => setTimeout(resolve, 100)); // delay 100ms
  }

  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: route }],
      })
    );
  } else {
    console.warn("Navigation not ready when trying to reset and navigate");
  }
}
export async function reset(route:keyof StackScreen){
if(navigationRef.isReady()){
    navigationRef.dispatch(CommonActions.reset({
        index:0,
        routes:[{name:route}]
    }));
}
}
export async function goBack() {
    navigationRef.isReady();
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.goBack());
    }
}