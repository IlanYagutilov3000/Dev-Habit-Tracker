import type { FunctionComponent } from "react";

interface CreateHabitCardProps {
    onClick: () => void;
}

const CreateHabitCard: FunctionComponent<CreateHabitCardProps> = ({ onClick }) => {
    return (
        <>
            <li onClick={onClick} className="create-habit--tile" style={{ cursor: "pointer" }} >
                <div>
                    <div className="create-habit--tile-icon" >
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <div className="xreate-habit--tile-content">
                        <div className="create-habit--tile-title" >
                            <span>Create New Habit</span>
                        </div>
                        <div className="create-habit--tile-subtitle" >
                            <span>Scale your productivity</span>
                        </div>
                    </div>
                </div>

            </li>
        </>
    );
}

export default CreateHabitCard;