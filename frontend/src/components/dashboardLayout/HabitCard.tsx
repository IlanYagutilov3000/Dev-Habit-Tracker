import type { FunctionComponent } from "react";
import type { Habit } from "../../interfaces/Habit";
import { createLog } from "../../services/log";

interface HabitCardProps {
    habit: Habit;
    onDelete: (id: string) => void;
    onActive: (id: string) => void;
    refresh: () => void;
}

const HabitCard: FunctionComponent<HabitCardProps> = ({ habit, onDelete, refresh, onActive }) => {

    const API_URL = import.meta.env.VITE_API_URL;

    const getImageUrl = (path: string) => {
        if (!path) return "";
        const cleanPath = path.replace(/\\/g, "/");
        const baseUrl = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
        return `${baseUrl}${cleanPath}`;
    };

    const getContrastYIQ = (hexColor) => {
        hexColor = hexColor.replace("#", "");
        const r = parseInt(hexColor.substr(0, 2), 16);
        const g = parseInt(hexColor.substr(2, 2), 16);
        const b = parseInt(hexColor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    };

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
            <li>
                <div className="dashboard--habits-tile" >
                    <div className="dropdown dashboard--habits-dropdown">
                        <i className="fa-solid fa-ellipsis-vertical"
                            id={`dropdownMenu-${habit._id}`} data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenu-${habit._id}`}>
                            <li className="dashboard--habits-dropdown-item">
                                <button className="dropdown-item" >
                                    <div><i className="fa-solid fa-pencil"></i></div>
                                    <div>Edit Habit</div>
                                </button>
                            </li>
                            <li className="dashboard--habits-dropdown-item">
                                <button className="dropdown-item"  onClick={() => onActive(habit._id!)} >
                                    <div><i className="fa-solid fa-pencil"></i></div>
                                    <div>Archive Habit</div>
                                </button>
                            </li>
                            <li className="dashboard--habits-dropdown-item" >
                                <button className="dropdown-item text-danger " onClick={() => onDelete(habit._id!)}>
                                    <div><i className="fa-solid fa-trash-can "></i></div>
                                    <div>Delete Habit</div>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="dashboard--habits-header" style={{ display: "flex", gap: "0.4rem", alignItems: "center" }} >
                        <div>
                            {habit.image && (<img src={getImageUrl(habit.image)} alt={habit.name} style={{ width: "2.4rem", height: "auto" }} />)}
                        </div>
                        <div className="dashboard--habits-content" >
                            <div><h3 style={{ color: habit.color, margin: "0" }} >{habit.name}</h3></div>
                            <div className="dashboard--habits-status" style={{display: "flex", alignItems: "center", gap: "0.6rem"}} >
                                <div><span style={{ borderRadius: "50%", width: "0.6rem", height: "0.6rem", backgroundColor: habit.isActive ? habit.color : "#ccc", display: "inline-block" }} ></span></div>
                                <div>{habit.isActive ? "ACTIVE" : "INACTIVE"}</div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard--habits-cta" >
                        <div>
                            <button onClick={handleLog} disabled={!habit.isActive} style={{ backgroundColor: habit.color, boxShadow: `0 8px 20px -4px ${habit.color}80`, color: getContrastYIQ(habit.color) }} >Mark Done</button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default HabitCard;