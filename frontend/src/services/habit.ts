import axios from "axios";
import type { Habit } from "../interfaces/Habit";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/habits`,
    withCredentials: true  // ⚠️ important for cookies!
})
// gte the users habits
export const getHabits = () => api.get('/');
// create new habits
export const createHabit = (newHabit: Habit) => api.post('/', newHabit);
// pdate isActive check
export const updateIsActive = (id: string) => api.patch(`${id}/toggle`);
// update habit
export const updateHabit = (habit: Habit) => api.put(`/${habit._id}`, habit);
//delete habit
export const deleteHabit = (habitId: string) => api.delete(`/${habitId}`);