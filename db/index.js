const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('userHabits');
const collection = db.collection('habits');

//i need a few different commands

//add habit by user
async function addHabitByUser(user, jsonHabit) {
    //insert
    let userInfo = await getUserInfo(user);
    let habits = userInfo.habits;
    habits.push(jsonHabit);
    userInfo.habits = habits;
    await replace(userInfo);
}

//update habit by user
async function updateHabitByUser(user, jsonHabit) {
    let userInfo = await getUserInfo(user);
    let habits = userInfo.habits;
    let index = habits.findIndex(h => h.habitName === jsonHabit.habitName);
    if ( index < 0 ) {
        throw new Error(`Habit "${jsonHabit.habitName}" not found for user ${user}`);
    }
    habits[index] = jsonHabit;
    userInfo.habits = habits;
    await replace(userInfo);
}

//get habits by user
async function getHabitsByUser(username) {
    let userInfo = await getUserInfo(username);
    return userInfo.habits;
}

async function getUserInfo(username) {
    const query = { username: username };
    const userInfo = await collection.findOne(query);
    return userInfo;
}

async function createAuth(username, password, auth) {
    let userInfo = await getUserInfo(username);
    userInfo.authToken = auth;
    await replace(userInfo);
}

async function verifyAuth(username, auth) {
    let userInfo = await getUserInfo(username);
    if (!userInfo) return 0;
    if ( auth == userInfo.authToken ) {
        return 1;
    } else {
        return 0;
    }
}

async function createUser(username, password, auth){
    let existingUser = await getUserInfo(username);
    if (existingUser) throw new Error(`The name "${user}" is already taken`);
    const user = {
        username: username,
        password: password,
        authToken: auth,
        habits: [],
    }
    await collection.insertOne(user);
}

async function replace(userInfo) {
    await collection.replaceOne({ _id: userInfo._id }, userInfo);
}

async function deleteAuth(username) {
    let userInfo = await getUserInfo(username);
    userInfo.authToken = null;
    await replace(userInfo);
}

async function main() {
    try {
        await db.command({ ping: 1 });
        console.log(`DB connected to ${config.hostname}`);
    } catch (ex) {
        console.log(`Error with ${url} because ${ex.message}`);
        process.exit(1);
    }

    try {
        //insert
        const house = {
            name: 'Beachfront views',
            summary: 'From your bedroom to the beach, no shoes required',
            property_type: 'Condo',
            beds: 1,
        };
        await collection.insertOne(house);

        //query
        //const cursor = collection.find();
        //const rentals = await cursor.toArray();
        //rentals.forEach((i) => console.log(i));

        //more specific query
        const query = { property_type: 'Condo', beds: { $lt: 2 } };
        const options = {
        sort: { name: -1 },
        limit: 10,
        };

        const cursor = collection.find(query, options);
        const rentals = await cursor.toArray();
        rentals.forEach((i) => console.log(i));

        //delete
        //const query = { property_type: 'Condo', beds: { $lt: 2 } };
        await collection.deleteMany(query);

        //Specific deletion by ID
        //const insertResult = await collection.insertOne(house);

        //const deleteQuery = { _id: insertResult.insertedId };
        //await collection.deleteOne(deleteQuery);

    }
    catch (ex) {
        console.log('Database (${url}) error: ${ex.message}`);')
    }
    finally {
        await client.close();
    }
}

main();