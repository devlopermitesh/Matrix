import { PropsWithChildren, ReactNode, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack, { AuthStackParamList } from "./AuthStack";
import AppStack, { AppStackParamList } from "./AppStack";
export type StackScreen=AuthStackParamList & AppStackParamList
const Routes = ():React.JSX.Element => {

 return (
   <NavigationContainer>
    {(false)?(<AuthStack/>):(<AppStack/>)}
    </NavigationContainer>
 )
}

export default Routes