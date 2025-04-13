const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
//const { Habit } = require('../src/habit');
//import { Habit } from '../src/habit.js';


// The scores and users are saved in memory and disappear whenever the service is restarted.
let habits = [];
let nums = [];
let username = "";
let users = [];
const authCookieName = 'token';

//Sets port to 3000 if no port is entered
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//All endpoints will use JSON, so this automatically will parse it
app.use(express.json());

// Serve up the front-end static content hosting (makes it so all paths not specified by /api will search in the public directory)
app.use(express.static('public'));

app.use(cookieParser());

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Helper function to see if user exists
async function findUser(field, value) {
    console.log("in findUser function");
    if (!value) return null;
  
    return users.find((u) => u[field] === value);
}
  
// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}
  
//helper function to create a user
async function createUser(email, password) {
    console.log("About to hash password");
    const passwordHash = await bcrypt.hash(password, 10);

    console.log("Going to create new user object");
    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    console.log("Going to push new user");
    users.push(user);
    console.log("Users: ", users);

    return user;
}
  
//helper funciton to update habit data
async function updateHabits(newHabits) {
    habits = newHabits;
    return habits;
}

//helper function to add new habit to list
function appendHabit(newHabit) {
    habits.push(newHabit);

    return habits;
}
  

//create account endpoint
apiRouter.post('/auth/create', async (req, res) => {
    console.log("In create endpoint");
    console.log("email: ", req.body.userName);
    if (await findUser('email', req.body.userName)) {
        console.log("Can't create because email taken");
        res.status(409).send({ msg: 'Email in use'});
    } else {
        console.log("Going to create user");
        const user = await createUser(req.body.userName, req.body.password);
    
        setAuthCookie(res, user.token);
        let username = req.body.userName;
        res.send({ userName: username});
    }
});

//login endpoint
apiRouter.post('/auth/login', async (req, res) => {
    let username = req.body.userName;
     const user = await findUser('email', req.body.userName);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
        res.send({ userName: username });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

//logout endpoint
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

//Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    console.log("in verification");
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized '});
    }
};

//get habits endpoint
apiRouter.get('/habits', verifyAuth, (_req, res) => {
    //console.log("Habits to be got: ", habits);
    res.send({ habits: habits });
});

//submit new habit
apiRouter.post('/habit', verifyAuth, (req, res) => {
    console.log("Req body habit: ", req.body);
    const newHabit = req.body;
    habits.push(newHabit);
    console.log("Habits push: ", habits);
    //nums.push(1);
    //console.log(nums)
    res.send({habits: habits});
});

//update habit progress
apiRouter.post('/habits', verifyAuth, (req, res) => {
    console.log("In add habits endpoint");
    habits = req.body;
    res.send(habits);
});

//default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

//return default page of web application if unknown path entered
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening super hard on port ${port}`);
});