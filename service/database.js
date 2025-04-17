const { MongoClient } = require('mongodb');
const config = require('dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('network');
const collection = db.collection('user');

//i need a few different commands

//add habit by user
export async function addHabitByUser(username, jsonHabit) {
    //insert
    /*let userInfo = await getUserInfo(username);
    let habits = userInfo.habits;
    habits.push(jsonHabit);
    userInfo.habits = habits;*/
    await collection.updateOne(
        { username },
        { $push: { habits: jsonHabit } }
      );
    //await replace(userInfo);
}

//update habit by user
export async function updateHabitByUser(username, jsonHabit) {
    let userInfo = await getUserInfo(username);
    let habits = userInfo.habits;
    let index = habits.findIndex(h => h.habitName === jsonHabit.habitName);
    if ( index < 0 ) {
        throw new Error(`Habit "${jsonHabit.habitName}" not found for user ${username}`);
    }
    habits[index] = jsonHabit;
    userInfo.habits = habits;
    //await replace(userInfo);
    await collection.updateOne(
        { username },
        { $set: { habits: habits } }
      );
}

//get habits by user
export async function getHabitsByUser(username) {
    let userInfo = await getUserInfo(username);
    return userInfo.habits;
}

export async function getUserInfo(username) {
    const query = { username: username };
    const userInfo = await collection.findOne(query);
    return userInfo;
}

export async function createAuth(username, auth) {
    /*let userInfo = await getUserInfo(username);
    userInfo.authToken = auth;
    await replace(userInfo);*/
    await collection.updateOne(
        { username },
        { $set: { authToken: auth } }
      );
}

export async function verifyAuth(username, auth) {
    let userInfo = await getUserInfo(username);
    if (!userInfo) return 0;
    if ( auth == userInfo.authToken ) {
        return 1;
    } else {
        return 0;
    }
}

export async function createUser(user){
    let existingUser = await getUserInfo(user.username);
    if (existingUser) throw new Error(`The name "${user.username}" is already taken`);
    await collection.insertOne(user);
    return user;
}

export async function replace(userInfo) {
    await collection.replaceOne({ _id: userInfo._id }, userInfo);
}

export async function deleteAuth(username) {
    /*let userInfo = await getUserInfo(username);
    userInfo.authToken = null;*/
    await collection.updateOne(
        { username },
        { $set: { authToken: null } }
      );
    //await replace(userInfo);
}

export async function getUserByToken(token) {
    const query = { authToken: token };
    const userInfo = await collection.findOne(query);
    return userInfo;
}

/*
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

main();*/