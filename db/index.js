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
    let userInfo = getByUser(user);
    let habits = userInfo.habits;
    habits.append(jsonHabit);
    userInfo.habits = habits;
    await collection.insertOne(habits);
}

//update habit by user

//get habits by user
async function getByUser(user) {
    const query = { username: user }
    const cursor = collection.find(query);
    const userInfo = await cursor.toArray();
    return userInfo;
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