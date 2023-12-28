require('dotenv').config({ path: './config/.env' });
const express = require('express')
const mongoose = require('mongoose')
// const dotenv = require('dotenv')
const User = require('./models/User')

// dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

//middleware to parse JSON
app.use(express.json());

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Routes

//GET: Return all users
app.get('/users', async (req, res) => {
    try {
        await User.find().then((user) => {
            console.log(user)
            res.status(201).json(user)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

//POST: Add a new user to the database
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = new User({ name, email });
        await newUser.save().then((user) => {
            console.log(user)
            res.status(201).json(newUser)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        ).then((updatedUser) => {
            console.log(updatedUser)
            res.status(201).json(updatedUser);
        }).catch((error) => {
            res.status(400).json({ error: error.message })
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id).then((deletedUser) => {
            console.log(deletedUser)
            res.status(201).json({ message: 'User deleted successfully' });
        })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});