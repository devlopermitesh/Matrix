import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ApprenceItem from '../moleculers/ApprenceItem'
import Icontitle from '../atoms/Icontitle'
import { AppranceCollectionData, ButtonThemeType } from '../../data/constant'
import DarkLightToggle from '../atoms/DarkLightToggle'
import SmoothToggle from '../atoms/NormalToggle'
import Icon from '../atoms/Icon'
import { RFValue } from 'react-native-responsive-fontsize'


const AppranceCollection = () => {
    const [isDark,setisDark]=useState(false)
    const [isOn,setIsOn]=useState(true)
const getButton=(ButtonType:ButtonThemeType)=>{
    switch (ButtonType) {
        case "theme":
            return <DarkLightToggle testId='dark-light-toggle'  isDark={isDark} onPress={()=>setisDark((prev)=>!prev)}/>
        case "Normal":
           return <SmoothToggle testId='normal-toggle' size='small' isOn={isOn} onPress={()=>setIsOn((pre)=>!pre)}/>
        case "checkOut":
            return (
                <TouchableOpacity testID='icon-right' onPress={()=>{}}>
                <Icon  size={RFValue(16)} color='#000000' name='right' iconType='ant-design'/>
                </TouchableOpacity>
            )
        default:
            return null
            break;
    }
}
  return (
    <>
        {
            AppranceCollectionData.map((item)=>{
                return(
         <ApprenceItem testID='button-container-settings'  key={item.id} title={item.title}>
          <Icontitle name={item.name} Icontype={item.iconType}/>
          {
            getButton(item.buttonType)
          }
        </ApprenceItem>
                )
            })
        }
</>
  )
}

export default AppranceCollection

const styles = StyleSheet.create({})
