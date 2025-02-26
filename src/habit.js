export class Habit {
    getHabitName() {
        return this.habit;
    }

    reportToday() {
        this.reportedToday = true;
        this.lastDayReported = new Date();
        return this;
    }

    updateHabitValue(updatedHabit) {
        this.habit = updatedHabit.habit;
        this.startDate = updatedHabit.startDate;
        this.target = updatedHabit.target;
        this.score = updatedHabit.score;
        this.reportedDay = updatedHabit.reportedDay;
        this.lastDayReported = updatedHabit.lastDayReported;
        return this;
    }

    constructor(habit, startDate, target, score) {
        this.habit = habit;
        this.startDate = startDate;
        this.target = target;
        this.score = score;
        this.reportedToday = false;
        this.lastDayReported = null;
    }
}

function storeHabits(habits) {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function getHabits() {
    const habits = localStorage.getItem("habits");
    return habits ? JSON.parse(habits).map(habit => 
        new Habit(habit.habit, habit.startDate, habit.target, habit.score, habit.reportedToday, habit.lastDayReported)) : [];
}

function updateHabit(myHabit) {
    const habits = getHabits();
    console.log(habits);
    const habitNameToUpdate = myHabit.getHabitName();

    const habitIndex = habits.findIndex(habit => habit.getHabitName() === habitNameToUpdate);
    console.log(habitIndex);
    habits[habitIndex] = habits[habitIndex].updateHabitValue(myHabit);
    console.log(habits);
    storeHabits(habits);

}

export { getHabits, updateHabit, storeHabits };