const calculateStreak = (logs) => {
    if (logs.length === 0 || !Array.isArray(logs)) return { currentStreak: 0, longestStreak: 0 };

    const sorted = logs.map(log => new Date(log.date)).sort((a, b) => (a - b));

    let currentStreak = 1
    let longestStreak = 1
    let tempStreak = 1

    for (let i = 1; i < sorted.length; i++) {
        const diffInMs = sorted[i].getTime() - sorted[i - 1].getTime()
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

        if (diffInDays === 1) {
            tempStreak++
            if (tempStreak > longestStreak) longestStreak = tempStreak;
        } else if (diffInDays > 1) {
            tempStreak = 1
        }
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const lastLog = sorted[sorted.length - 1].setHours(0, 0, 0, 0);

    const diffToToday = (today - lastLog) / (1000 * 60 * 60 * 24);

    currentStreak = diffToToday <= 1 ? tempStreak : 0;

    return { currentStreak, longestStreak };
};

module.exports = calculateStreak;