import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE } from "../config/api";
import { API_BASE } from '@env';

/* GET UNREAD COUNT */
export const getUnreadCount = async () => {
    const token = await AsyncStorage.getItem("token");

    const res = await axios.get(
        `${API_BASE}/notifications/unread-count`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return res.data.count || 0;
};

/* GET NOTIFICATIONS LIST */
export const getNotifications = async () => {
    const token = await AsyncStorage.getItem("token");

    const res = await axios.get(
        `${API_BASE}/notifications`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return res.data;
};

/* MARK ONE AS READ */
export const markAsRead = async (id) => {
    const token = await AsyncStorage.getItem("token");

    await axios.put(
        `${API_BASE}/notifications/${id}/read`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
};


export const getNotificationHistory = async (page = 2) => {
    const token = await AsyncStorage.getItem("token");

    const res = await axios.get(
        `${API_BASE}/notifications/history?page=${page}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return res.data;
}