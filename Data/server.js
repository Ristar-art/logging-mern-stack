const express = require('express');
const multer = require('multer');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.models');
const path = require('path'); // Add this to work with file paths.
const fs = require('fs'); // Add this to work with the file system.
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/log-details');

// // Set up multer storage to specify where to save uploaded images.
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads'); // You can change this directory to your preferred location.
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const imageFileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
//     req.imagePath = imageFileName; // Store the image file name in the request object.
//     cb(null, imageFileName);
//   },
// }); 

// const upload = multer({ storage });

// // Route for handling image uploads.
// app.post('/api/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No image uploaded.');
//   }

//   // Return the image path to the client.
//   res.json({ imagePath: req.file.path });
// });

// Route for handling user signup.
app.post('/api/log', async (req, res) => {
    try {
      await User.create({
        name: req.body.name,
        surname: req.body.surname,
        dateOfBirth: req.body.dateOfBirth,
        biography: req.body.biography,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        jobPosition: req.body.jobPosition,
        //image: req.body.imagePath, // Use req.body.imagePath instead of req.body.image.
      });
  
      res.json({ status: 'ok' });
    } catch (err) {
      res.json({ status: 'error', error: 'Duplicated email' });
    }
  });

  app.get('/api/log', async (req, res) => {
    try {
      // Retrieve all profiles from the MongoDB collection.
      const allProfiles = await User.find();
  
      // Send the profiles as a JSON response to the client.
      res.json(allProfiles);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  // Route for handling user profile deletion by ID.
// Route for handling user profile deletion by ID using the DELETE method.
app.delete('/api/log/:id', async (req, res) => {
  try {
    const deletedProfile = await User.findByIdAndDelete(req.params.id);

    if (deletedProfile) {
      res.json({ status: 'ok', deletedProfile });
    } else {
      res.status(404).json({ status: 'error', error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... (existing code)

// Route for handling user profile update by ID using the PUT method.
app.put('/api/log/:id', async (req, res) => {
  try {
    const updatedProfile = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (updatedProfile) {
      res.json({ status: 'ok', updatedProfile });
    } else {
      res.status(404).json({ status: 'error', error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(8000, () => {
  console.log('server started');
});