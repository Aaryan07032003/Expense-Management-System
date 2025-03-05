const userModel = require('../models/userModel')

//login callback
const loginController = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email,password})
        if(!user){
            return res.status(404).send("User not found");
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
        
    }
};

//register callback
const registerController = async (req, res) => {
    try {
        // Extract name, email, password from request body
        const { name, email, password } = req.body;

        // Create a new user document using userModel
        const newUser = new userModel({
            name,
            email,
            password,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message and status 201 (Created)
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            newUser, // Optionally, you can send back the newly created user object
        });
    } catch (error) {
        // Handle any errors that occur during registration
        console.error('Registration error:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to register user',
            error: error.message, // Optionally, send back the error message for debugging
        });
    }
};
module.exports = {loginController, registerController};