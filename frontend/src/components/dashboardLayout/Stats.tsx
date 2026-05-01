import type { FunctionComponent } from "react";
import type { Log } from "../../interfaces/Log";

interface StatsProps {
    logs: Log[];
    longestStreak: number

}

const Stats: FunctionComponent<StatsProps> = ({ logs, longestStreak }) => {
    return (
        <>
            <h2>{longestStreak}</h2>
            <span><strong>{logs.length}</strong></span>{/* total habits completed */}
        </>
    );
}

export default Stats;