import { Alert } from "react-native";
import RNCalendarEvents from "react-native-calendar-events";

export const addEvent = async () => {
    try {
        const result = await RNCalendarEvents.requestPermissions((readOnly = false));
        console.log('Calendar', result)
    } catch (error) {
       // Alert.alert(error)
    }

}