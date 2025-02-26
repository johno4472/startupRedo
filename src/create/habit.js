export class Habit {
    getHabitName() {
        return this.habit;
    }

    constructor(habit, startDate) {
        this.habit = habit;
        this.startDate = startDate;
    }
}

function getHabits() {
    const habits = localStorage.getItem("habits");
    return habits ? JSON.parse(habits).map(habit => new Habit(habit.habit, habit.startDate)) : [];
}

export { getHabits };