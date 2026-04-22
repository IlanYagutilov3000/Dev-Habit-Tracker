import { useEffect, useState, type FunctionComponent } from "react";
import { useAuth } from "../context/AuthContext";
import type { Habit } from "../interfaces/Habit";
import { deleteHabit, getHabits, updateIsActive } from "../services/habit";
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
            // toadt later
        } catch (error) {
            console.log(error);
            // toadt later
        }
    };

    const handleIsActive = async (habitId: string) => {
        try {
            await updateIsActive(habitId)
            setUserHabits((prevHabits) =>
                prevHabits.map((habit) => habit._id === habitId ? { ...habit, isActive: !habit.isActive } : habit)
            );
            // toadt later
        } catch (error) {
            console.log(error);
            // toadt later
        }
    }

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
                    <div className="dashboard--header">
                        <div className="dashboard--header-content">
                            <div><h2>Dashboard</h2></div>
                            <div>Welcome back <span>{auth?.user?.name}</span>, Architect. ready for your daily goals.</div>
                        </div>
                    </div>

                    <div className="dashboard--news">
                        <div className="dashboard--news-left">
                            <div className="dashboard--news-left-subtitle">
                                WEEKLY MOMENTOM
                            </div>
                            <div className="dashboard--news-left-title">
                                <h2>Current Streak: 14 Days</h2>
                            </div>
                            <div className="dashboard--news-left-description">
                                You've reached a flow state. Your consistency in 'Daily LeetCode'<br /> is driving your architectural mastery forward.
                            </div>
                        </div>
                        <div className="dashboard--news-right">
                            <div className="dashboard--news-right-header" >
                                <div className="dashboard--news-right-subtitle" >
                                    REWARD STATUS
                                </div>
                                <div className="dashboard--news-right-title" >
                                    <h3>Level 43 Awaits</h3>
                                </div>
                            </div>

                            <div className="dashboard--news-right-footer" >
                                <div className="progress dashboard--news-right-progress-bar " role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ height: "0.5rem" }} >
                                    <div className="progress-bar" style={{ width: "75%", backgroundColor: "#8321a1" }}></div>
                                </div>
                                <div className="dashboard--news-right-description" >
                                    1,240 XP until next mastery badge
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard--habits">
                        <ul className="dashboard--habits-list" >
                            {userHabits.map(habit => <HabitCard key={habit._id} habit={habit} onDelete={handleDelete} refresh={refresh} onActive={handleIsActive} />)}
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