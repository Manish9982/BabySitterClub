import axios from "axios";
import { Alert } from "react-native";
import { getLocalValue } from "./LocalStore";

export const LOCAL_STORE = {
    LOGIN: 'loginStatus',
    TOKEN: 'auth_token',
    USER_TYPE: 'userType',
    SELECTED_SERVICE: 'selected_service'
}

export const Constants = {
    BASE_URL: 'https://thebabysitterclubs.com/babysitter/api/v1/'
}

export const handlePostRequest = async (name, formdata) => {
    const token = await getLocalValue(LOCAL_STORE.TOKEN)
    const config = {
        method: 'post',
        url: `${Constants.BASE_URL}${name}`,
        data: formdata,
        redirect: 'follow',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    console.log(`Formdata of ${name}=======>`, formdata)

    return axios(config)
        .then(response => {
            // console.log('POST response:', response);
            return response.data;
        })
        .catch(error => {
            Alert.alert(error?.message);
        })
        .finally(() => {
            console.log('POST request completed.=========================', `${name}`);
        });
};


export const handleGetRequest = async (name) => {
    const token = await getLocalValue(LOCAL_STORE.TOKEN)
    let config = {
        method: 'get',
        url: `${Constants.BASE_URL}${name}`,
        headers: { 'Authorization': `Bearer ${token}` }
    };

    return axios.request(config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            Alert.alert(error?.message);
        }).finally(() => {
            console.log('GET request completed.=========================', `${name}`);
        });
};

export function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
}

export function formatDate_mmddyyyy(inputDate) {
    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
            return "";
        }
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "";
        }
    }
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const date = new Date(inputDate);
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    const daySuffix = getDaySuffix(day);

    return `${month} ${day}${daySuffix}, ${year}`;
}


export const Shadows =
{
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
}

export function calculateEndTime(startTime, duration) {
    const [startHour, startMinute] = startTime.split(":").map(Number);

    const totalMinutes = startHour * 60 + startMinute + duration * 60;

    const endHour = Math.floor(totalMinutes / 60) % 24; // Ensure it's within a 24-hour range
    const endMinute = totalMinutes % 60;

    const formattedStartTime = startTime.padStart(5, "0");
    const formattedEndTime = `${String(endHour).padStart(2, "0")}:${String(
        endMinute
    ).padStart(2, "0")}`;

    return `${formattedStartTime} - ${formattedEndTime}`;
}

export function convertTo24HourFormat(timestamp) {
    const date = new Date(timestamp);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

export function convertTo12HourFormat(time24) {
    // Split the input time string into hours and minutes
    const [hours, minutes] = time24.split(':');

    // Convert hours to an integer
    const hoursInt = parseInt(hours);

    // Determine whether it's AM or PM
    const period = hoursInt >= 12 ? 'PM' : 'AM';

    // Calculate the 12-hour format hours
    const hours12 = hoursInt % 12 || 12; // 0 should be converted to 12 in 12-hour format

    // Format the result as 'hh:mm AM/PM'
    const result = `${String(hours12).padStart(2, '0')}:${minutes} ${period}`;

    return result;
}

export function convertTimeRangeTo12HourFormat(timeRange) {
    const [startTime, endTime] = timeRange.split(' - ');

    // Helper function to convert a single time to 12-hour format
    function convertTo12HourFormat(time) {
        const [hours, minutes] = time.split(':');
        const hoursInt = parseInt(hours);
        const period = hoursInt >= 12 ? 'PM' : 'AM';
        const hours12 = hoursInt % 12 || 12;
        return `${String(hours12).padStart(2, '0')}:${minutes} ${period}`;
    }

    const convertedStartTime = convertTo12HourFormat(startTime);
    const convertedEndTime = convertTo12HourFormat(endTime);

    return `${convertedStartTime} - ${convertedEndTime}`;
}

export function formatDateWithTime(inputDate) {
    // Create a Date object from the input string
    const date = new Date(inputDate);

    // Define month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    // Extract date components
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Create the formatted date and time string
    const formattedDate = `${month} ${day}, ${year} at ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    return formattedDate;
}

export function formatDateProfilePageDate(inputDate) {
    // Split the input date into day, month, and year
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

