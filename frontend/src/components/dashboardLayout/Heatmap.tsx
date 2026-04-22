import type { FunctionComponent } from "react";
import type { Log } from "../../interfaces/Log";

interface HeatmapProps {
    logs: Log[]
}

const getColor = (count: number): string => {
    /* if (count === 0) return '#ebedf0'
    if (count === 1) return '#9be9a8'
    if (count <= 3) return '#40c463'
    return '#216e39' */
    switch (true) {
        case (count === 0):
            return '#151b23';
        case (count === 1):
            return '#033a16';
        case (count <= 3):
            return '#196c2e';
        default:
            return '#56d364';
    }
}

const Heatmap: FunctionComponent<HeatmapProps> = ({ logs }) => {

    const logMap = new Map<string, number>()
    logs.forEach(log => {
        const dateStr = new Date(log.date).toDateString()
        logMap.set(dateStr, (logMap.get(dateStr) || 0) + 1)
    })

    const days = [];
    for (let i = 365; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date);
    }

    console.log(logs);

    return (
        <>
            <ul className="heatmap" >
                {days.map((day, index) => (
                    <li key={index} title={day.toDateString()} style={{
                        backgroundColor: getColor(logMap.get(day.toDateString()) || 0)
                    }}></li>
                ))}
            </ul>
        </>
    );
}

export default Heatmap;