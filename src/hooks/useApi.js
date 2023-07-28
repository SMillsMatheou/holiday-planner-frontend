import { message } from "antd";
import axios from "../axios"

export default function useApi() {
    const callBackend = async (endpoint, type, body = {}) => {
        try {
            if(type === 'post') {
                return await axios.post(endpoint, body);
            } else if (type === 'get') {
                return await axios.get(endpoint, {params: body});
            } else if (type === 'put') {
                return await axios.put(endpoint, body);
            } else if (type === 'delete') {
                return await axios.delete(endpoint, {data: body});
            }
        } catch (error) {
            console.log(error);
            if(error.response) {
                message.error(error?.response?.data?.message);
            } else {
                message.error('There was a problem handling your request');
            }
        }
    }

    const login = async (values) => {
        const resp = await callBackend('/login', 'post', values);

        return resp?.data ?? {};
    }

    const logout = async () => {
        await callBackend('/logout', 'post');
    }

    const register = async (values) => {
        const resp = await callBackend('/register', 'post', values);

        return resp?.data ?? {};
    }

    const getActivityList = async () => {
        const resp = await callBackend('/activity', 'get');

        return resp?.data ?? {};
    }

    const joinActivity = async (roomCode) => {
        const resp = await callBackend(`/activity/join/${roomCode}`, 'post');

        return resp?.data ?? {};
    }

    const addActivityDates = async (id, values) => {
        const resp = await callBackend(`/activity/${id}/add-date`, 'post', values);

        return resp?.data ?? {};
    }

    const getActivityDates = async (id, values) => {
        const resp = await callBackend(`/activity/${id}/dates`, 'get', values);

        return resp?.data ?? [];
    }

    const getActivityParticipants = async (id) => {
        const resp = await callBackend(`/activity/${id}/participants`, 'get');

        return resp?.data ?? [];
    }

    const getUsersActivityDates = async (id) => {
        const resp = await callBackend(`/activity/${id}/user-dates`, 'get');

        return resp?.data ?? [];
    }

    const deleteDate = async (id) => {
        const resp = await callBackend(`/activity-date/${id}`, 'delete');

        return resp?.data ?? [];
    }

    return {
        login,
        logout,
        register,
        getActivityList,
        joinActivity,
        addActivityDates,
        getActivityDates,
        getActivityParticipants,
        getUsersActivityDates,
        deleteDate
    }
}