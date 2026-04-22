import type { FunctionComponent } from "react";
import type { Log } from "../../interfaces/Log";

interface StatsProps {
    logs: Log[]
    currentStreak: number
    longestStreak: number

}

const Stats: FunctionComponent<StatsProps> = ({ logs, currentStreak, longestStreak }) => {
    return (
        <>
            <h2>{currentStreak}</h2>
            <h2>{longestStreak}</h2>
            <span><strong>{logs.length}</strong></span>
        </>
    );
}

export default Stats;