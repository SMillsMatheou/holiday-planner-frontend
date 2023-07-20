import { message } from "antd";
import axios from "../axios"

export default function useApi() {
    const callBackend = async (endpoint, type, body = {}) => {
        try {
            if(type === 'post') {
                return await axios.post(endpoint, body);
            } else if (type === 'get') {
                return await axios.get(endpoint, body);
            } else if (type === 'put') {
                return await axios.put(endpoint, body);
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

    return {
        login,
        logout,
        register,
        getActivityList
    }
}