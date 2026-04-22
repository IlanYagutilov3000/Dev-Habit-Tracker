import { useEffect, useState, type FunctionComponent } from "react";
import { useAuth } from "../context/AuthContext";
import type { Habit } from "../interfaces/Habit";
import { deleteHabit, getHabits } from "../services/habit";
import HabitCard from "../components/dashboardLayout/HabitCard";
import { logoutUSer } from "../services/authService";
import { getLogs } from "../services/log";
import type { Log } from "../interfaces/Log";
import Stats from "../components/dashboardLayout/Stats";
import Heatmap from "../components/dashboardLayout/Heatmap";

interface DashboardProps {

}

const Dashboard: FunctionComponent<DashboardProps> = () => {
    const auth = useAuth()
    const [loading, setLoading] = useState<boolean>(true);
    const [userHabits, setUserHabits] = useState<Habit[]>([]);
    const [userLog, setUserLog] = useState<Log[]>([]);
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [longestStreak, setLongestStreak] = useState<number>(0);
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

    let refresh = () => {
        setRefreshFlag(!refreshFlag)
    }

    const handleDelete = async (habitId: string) => {
        try {
            await deleteHabit(habitId);
            setUserHabits(userHabits.filter(habit => habit._id !== habitId))
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getHabits().then((res) => {
            setUserHabits(res.data.habits)
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        getLogs().then((res) => {
            setUserLog(res.data.logs);
            setCurrentStreak(res.data.currentStreak);
            setLongestStreak(res.data.longestStreak);
        }).catch((err) => {
            console.log(err);
        })
    }, [refreshFlag])

    if (loading) return <h1>Loading...</h1>

    return (
        <>
            <div className="dashboard" >
                <div className="container">
                    <h2>Welcome {auth?.user?.name}!</h2>

                    <div className="dashboard--habits">
                        <ul className="dashboard--habits-list" >
                            {userHabits.map(habit => <HabitCard key={habit._id} habit={habit} onDelete={handleDelete} refresh={refresh} />)}
                        </ul>
                    </div>

                    <div className="dashboard--stats">
                        <Stats logs={userLog} currentStreak={currentStreak} longestStreak={longestStreak} />
                    </div>

                    <div className="dashboard--heatmap" style={{ border: "1px solid #3d444d", padding: "1rem", backgroundColor: "#0104090d", width: "74rem" }} >
                        <Heatmap logs={userLog} />
                    </div>

                    <button onClick={() => auth?.logout()} >Logout</button>
                </div>
            </div>

        </>
    );
}

export default Dashboard;