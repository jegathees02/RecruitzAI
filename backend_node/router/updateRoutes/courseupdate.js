// Import necessary modules
const express = require('express');
const User = require('../../models/signup'); // Adjust the path based on your project structure
const router = express.Router();
// const app = express();
// app.use(express.json());

router.post('/update-course', async (req, res) => {
    try { 
      const { email, courses } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Initialize the course field if it doesn't exist
      if (!user.course) {
        user.course = {};
      }
  
      // Initialize the courses array if it doesn't exist
      if (!user.course.courses) {
        user.course.courses = [];
      }
  
      // Append the courses to the user's courses array
      user.course.courses.push(...courses);
  
      // Save the updated user
      await user.save();
  
      return res.json({ message: 'Courses added successfully' });
    } catch (error) {
      console.error('Error updating courses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/update_scores/:userEmail/scores', async (req, res) => {
    try {
      const userEmail = req.params.userEmail;
      const updatedScores = req.body.score;
  
      // Find the user by email
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if updatedScores is an array
      if (!Array.isArray(updatedScores)) {
        return res.status(400).json({ message: 'Invalid format for updatedScores. Expecting an array.' });
      }
  
      // Append the new scores to the existing array
      user.score.push(...updatedScores);
  
      // Save the updated user
      await user.save();
  
      return res.status(200).json({ message: 'Scores updated successfully', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
// Export the router
module.exports = router;
