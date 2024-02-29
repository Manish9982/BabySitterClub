import { Alert, FlatList, ImageBackground, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Divider, List, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../redux/AuthSlice'
import { clearStorage } from '../helper/LocalStore'
import { handleGetRequest } from '../helper/Utils'
import Loader from '../components/Loader'


const Account = ({ navigation }) => {


const H = useWindowDimensions().height
const W = useWindowDimensions().width
const [loader, setLoader] = useState(false)


const styles = makeStyles(H, W)


const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
const usertype = useSelector((state) => state.global.usertype);
const dispatch = useDispatch();


const handleLogin = () => {
dispatch(login());
};


const handleLogout = async () => {
setLoader(true)
const result = await handleGetRequest('logout')
if (result?.status == '200') {
dispatch(logout());
} else {
Alert.alert("Alert", result?.message)
}
setLoader(false)
};


const pressFAQs = () => {
if (usertype == '2') {
navigation.navigate('FAQs_Sitter')
}
else if (usertype == '3') {
navigation.navigate('FAQs_Parent')
}
}


const DATA = [
{
title: 'Account',
action: () => {
if (usertype == '2') {
navigation.navigate('MyProfile_Sitter')
}
else if (usertype == '3') {
navigation.navigate('MyProfile_Parent')
}
}
},
{
title: 'Notification Center',
action: () => {
if (usertype == '2') {
navigation.navigate('NotificationsScreen')
}
else if (usertype == '3') {
navigation.navigate('NotificationCenter_Parent')
}
}
},
{
title: 'Manage Address',
action: () => navigation.navigate('ManageAddress')
//action: () => navigation.navigate('AutoCompleteScreen')
},
{
title: 'Transaction History',
action: () => navigation.navigate('TransactionHistory')
},
{
title: 'Role',
action: () => navigation.navigate('SwitchUserType')
},
// {
// title: 'Tips & Articles',
// },
// {
// title: 'How we work',
// },
// {
// title: 'Pricing',
// },
// {
// title: 'Trust & Safety',
// },
{
title: 'FAQs',
action: () => pressFAQs()
},
{
title: 'Help',
action: () => navigation.navigate('Help')


},
{
title: 'Logout',
action: () => {
Alert.alert('Logout', 'Are you sure you want to logout?', [
{
text: 'Yes',
onPress: () => handleLogout()
},
{
text: 'No'
}
])
}


},
]




const renderOptions = ({ item }) => {
if ((usertype == 2 && item.title !== 'Manage Address') || (usertype == 3)) {
return (
<>
<List.Item
onPress={item?.action}
title={item?.title}
/>
<Divider />
</>
)
}


}
return (
loader
?
<Loader/>
:
<ImageBackground
style={{ flex: 1 }}
source={require('../assets/images/background.png')}
>


<FlatList
data={DATA}
renderItem={renderOptions}
keyExtractor={(item, index) => `${index}`}
/>


{/* {
!isLoggedIn
&&
<CustomButton
style={styles.button}
title='Login' />
} */}
</ImageBackground>
)
}


export default Account


const makeStyles = (H, W) => StyleSheet.create({
button: {
position: 'absolute',
top: H * 0.7
}
})
