import type { FunctionComponent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {

}

const Sidebar: FunctionComponent<SidebarProps> = () => {
    const navigate = useNavigate()
    const auth = useAuth();
    return (
        <>
            <div className="sidebar">

                <div className="sidebar--head">
                    <h1 className="sidebar--title" >Dev-Habit-Tracker</h1>
                </div>

                <div className="sidebar--body">
                    <ul>
                        <li className="nav-item sidebar--nav-tile">
                            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} end>
                                <div><i className="fa-solid fa-border-all"></i></div>
                                <div>Dashboard</div>
                            </NavLink>
                        </li>
                        <li className="nav-item sidebar--nav-tile">
                            <NavLink to="/habits" className={({ isActive }) => isActive ? "active" : ""}>
                                <div><i className="fa-solid fa-clipboard-list"></i></div>
                                <div>Habits</div>
                            </NavLink>
                        </li>
                        <li className="nav-item sidebar--nav-tile">
                            <NavLink to="/goals" className={({ isActive }) => isActive ? "active" : ""}>
                                <div><i className="fa-solid fa-trophy"></i></div>
                                <div>Goals</div>
                            </NavLink>
                        </li>
                        <li className="nav-item sidebar--nav-tile">
                            <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
                                <div><i className="fa-solid fa-gear"></i></div>
                                <div>Settings</div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="sidebar--footer">
                    <div className="sidebar--devider" ></div>
                    <div className="sidebar--create-habit">
                        <div><i className="fa-solid fa-plus"></i></div>
                        <div>New Habit</div>
                    </div>
                    <div className="sidebar--user">
                        <div className="sidebar--user-image">
                            HERE
                        </div>
                        <div className="sidebar--user-name">{auth?.user?.name}</div>
                    </div>
                    <div className="sidebar--logout">
                        <button onClick={() => auth?.logout()} >
                            <div><i className="fa-solid fa-arrow-right-from-bracket"></i></div>
                            <div>Logout</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;