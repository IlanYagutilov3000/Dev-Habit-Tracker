import type { FunctionComponent } from "react";
import type { Habit } from "../../interfaces/Habit";
import { createLog } from "../../services/log";

interface HabitCardProps {
    habit: Habit
    onDelete: (id: string) => void
    refresh: () => void
}

const HabitCard: FunctionComponent<HabitCardProps> = ({ habit, onDelete, refresh }) => {

    const handleLog = async () => {
        try {
            await createLog(habit._id!);
            refresh()
            // toast here 
        } catch (error) {
            console.log(error);
            //toast here as wekk
        }
    }

    return (
        <>
            <li style={{ backgroundColor: habit.color }}>
                <div>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                    <div><h3>{habit.name}</h3></div>
                    <div className="dashboard--habits-cta" >
                        <div>
                            <button onClick={() => onDelete(habit._id!)
                            }>Delete</button>
                        </div>
                        <div>
                            <button onClick={handleLog} >✅ Done today</button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default HabitCard;