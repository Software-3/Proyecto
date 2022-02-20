const User = require('../models/User');

exports.register = async (req, res, next) => { 
    const {username, password} = req.body;

    try {
      const user = await User.create({
          username, 
          password,
      });
      
      res.status(201).json({
          success: true,
          user,
      });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.login = async (req, res, next) => { 
    const { username, password } = req.body;

    if(!username || !password){
        res.status(400).json({ success:false, error: "Please provide user and password"})
    }

    try {
      const user = await User.findOne({ username }).select("+password");

      if(!user){
          res.status(404).json({ success:false, error:"Invalid credentials"})
      }

      const isMatch = await user.matchPasswords(password);
     
      if(!isMatch){
          res.status(404).json({ success: false, error: "Invalid credentials"})
      }
      
      res.status(201).json({
        success: true,
        token: "fdkjdhfd",
      });

    } catch (error) {
        res.status(500).json({ success:false, error: error.message});
    }
};

