import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/logs`,
    withCredentials: true  // ⚠️ important for cookies!
})
// create a log
export const createLog = (habitId: string, note?: string) => api.post('/', { habitId, note });
//get logs
export const getLogs = (startDate?: string, endDate?: string) => api.get('/', { params: { startDate, endDate } })
// delete a log
export const deleteLog = (logId: string) => api.delete(`/${logId}`);