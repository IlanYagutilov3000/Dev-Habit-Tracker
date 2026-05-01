import { useEffect, useState, type FunctionComponent } from "react";
import { useAuth } from "../context/AuthContext";
import CreateHabitCard from "../components/dashboardLayout/CreateHabitCard";
import HabitCard from "../components/dashboardLayout/HabitCard";
import type { Habit } from "../interfaces/Habit";
import { deleteHabit, updateIsActive, getActiveHabits } from "../services/habit";
import CreateHabitModal from "../components/modals/createHabit/CreateHabitModal";

interface ActiveHabitsProps {

}

const ActiveHabits: FunctionComponent<ActiveHabitsProps> = () => {
    const auth = useAuth()
    const [loading, setLoading] = useState<boolean>(true);
    const [userHabits, setUserHabits] = useState<Habit[]>([]);
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

    const [openCraeteHabit, setOpenCreateHabit] = useState<boolean>(false);

    const refresh = () => {
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
            refresh()
            // toadt later
        } catch (error) {
            console.log(error);
            // toadt later
        }
    }

    useEffect(() => {
        getActiveHabits().then((res) => {
            setUserHabits(res.data.habits)
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, [refreshFlag]);

    if (loading) return <h1>Loading...</h1>

    return (
        <>
            <div className="active-habits">
                <div className="dashboard--habits">
                    <ul className="dashboard--habits-list" >
                        {userHabits.map(habit => <HabitCard key={habit._id} habit={habit} onDelete={handleDelete} refresh={refresh} onActive={handleIsActive} />)}

                        <CreateHabitCard onClick={() => setOpenCreateHabit(true)} />
                    </ul>
                </div>
            </div>

            <CreateHabitModal show={openCraeteHabit} onHide={() => setOpenCreateHabit(false)} refresh={refresh} />

        </>
    );
}

export default ActiveHabits;