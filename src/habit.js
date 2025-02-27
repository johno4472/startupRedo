export class Habit {
    getHabitName() {
        return this.habit;
    }

    reportToday() {
        this.reportedToday = true;
        this.lastDayReported = new Date();
        console.log("Look over here", this);
        return this;
    }

    updateHabitValue(updatedHabit) {
        this.habit = updatedHabit.habit;
        this.startDate = updatedHabit.startDate;
        this.target = updatedHabit.target;
        this.score = updatedHabit.score;
        this.reportedToday = updatedHabit.reportedToday;
        this.lastDayReported = updatedHabit.lastDayReported;
        return this;
    }

    updateScoreBy(num) {
        const tempScore = parseInt(this.score);
        const newScore = tempScore + num;
        if (newScore < 0) {
            this.score = 0;
        } else {
            this.score = newScore;
        }
        return this;
    }

    constructor(habit, startDate, target, score, reportedToday = false, lastDayReported = null) {
        this.habit = habit;
        this.startDate = startDate;
        this.target = target;
        this.score = score;
        this.reportedToday = reportedToday;
        if (lastDayReported === null) {
            const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)
        this.lastDayReported = yesterday;
        } else {
            this.lastDayReported = lastDayReported;
        }
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
    habits[habitIndex] = habits[habitIndex].updateHabitValue(myHabit);
    console.log("Habittt", myHabit);
    console.log("Heeeere: ", habits[habitIndex].updateHabitValue(myHabit));
    console.log("final countdown", habits);
    storeHabits(habits);

}

export { getHabits, updateHabit, storeHabits };