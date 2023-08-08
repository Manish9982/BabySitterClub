import { View, Text ,ToastAndroid} from 'react-native'
import React from 'react'
import { getDataFromLocalStorage } from '../localstorage/LocalStorage'
import NetInfo, { useNetInfo } from "@react-native-community/netinfo"


export const URL = 'https://livenutrifit.com/panel/'


export const GetApiData = async (ApiName) => {
    //  const URL = "https://lnf.bizhawkztest.com/public/"
    const URL = "https://livenutrifit.com/panel/"
    const token = await getDataFromLocalStorage('Token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
 
    var requestOptions = {
       method: 'GET',
       headers: myHeaders,
       redirect: 'follow'
    };
    try {
       const response = await fetch(`${URL}${ApiName}`, requestOptions)
       const result = await response.json()
       return result
    } catch (error) {
       ToastAndroid.show(`${error}`, ToastAndroid.SHORT)
       ToastAndroid.show(`${ApiName}`, ToastAndroid.SHORT)
 
    }
 
 }
 
 export const PostApiData = async (ApiName, formdata) => {
    const netinfo = await NetInfo.fetch()
    // console.log(netinfo)
 
    if (netinfo.isConnected) {
       //const URL = "https://lnf.bizhawkztest.com/public/"
       const URL = "https://livenutrifit.com/panel/"
       const token = await getDataFromLocalStorage('Token')
       console.log("TOKEN == ", token)
       var myHeaders = new Headers();
       myHeaders.append("Authorization", `Bearer ${token}`);
       var requestOptions = {
          method: 'POST',
          redirect: 'follow',
          body: formdata,
          headers: myHeaders,
       };
       try {
          console.log(`formdata of ${ApiName} ====> `, formdata)
          const response = await fetch(`${URL}${ApiName}`, requestOptions)
          const result = await response.json()
          if (result.status == '403') {
             try {
                ShortToast("Your session has expired. Logging you out now..", "error", "")
                await AsyncStorage.clear()
                RNRestart.Restart()
             } catch (e) {
                ShortToast(`${e}`, "error", "")
             }
          }
          else {
             // console.log(`result of ${ApiName} ====> `, result)
             return result
          }
 
 
       } catch (error) {
          const temp = await getDataFromLocalStorage('user_id')
          ToastAndroid.show(`${error}`, ToastAndroid.SHORT)
          ShortToast(`Message for Developer: Api That Failed: ${ApiName} for User ID:${temp}`, "error", "")
       }
    }
    else {
       ShortToast("Internet Connection Required.\n\n Make sure you are connected to internet and try again", "error", "")
    }
 
 }