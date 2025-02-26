export class Habit {
    getHabitName() {
        return this.habit;
    }

    constructor(habit, startDate, target, score) {
        this.habit = habit;
        this.startDate = startDate;
        this.target = target;
        this.score = score;
    }
}

function getHabits() {
    const habits = localStorage.getItem("habits");
    return habits ? JSON.parse(habits).map(habit => new Habit(habit.habit, habit.startDate, habit.target, habit.score)) : [];
}

export { getHabits };