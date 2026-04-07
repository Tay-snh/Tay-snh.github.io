require('dotenv').config(); // Load the variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Animal = require('./models/Animal');

const app = express();
app.use(cors()); // Allows HTML page to talk to this API
app.use(express.json());
app.use(express.static('public'));


// Use the variable from .env or a fallback
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/AAC';

mongoose.connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {console.error("Database connection error:", err);
  process.exit(1); // Exit gracefully if device access fail
  });
// Optimized Filtering Logic
app.get('/api/animals/filter', async (req, res) => {
    const { type } = req.query;
    let pipeline = []; // This replaces the empty query object

    // Using $match in the filtering logic
    let matchStage = { };

    if (type === 'Water Rescue') {
        matchStage.animal_type="Dog";
        matchStage.breed = { $in: ["Labrador Retriever Mix", "Chesapeake Bay Retriever", "Newfoundland"] };
        matchStage.sex_upon_outcome = "Intact Female";
        matchStage.age_upon_outcome_in_weeks = { $gte: 26, $lte: 156 };
    } else if (type === 'Mountain or Wilderness') {
        matchStage.animal_type="Dog";
        matchStage.breed = { $in: ["German Shepherd", "Alaskan Malamute", "Old English Sheepdog", "Siberian Husky", "Rottweiler"] };
        matchStage.sex_upon_outcome = "Intact Male";
        matchStage.age_upon_outcome_in_weeks = { $gte: 26, $lte: 156 };
    } else if (type === 'Disaster or Individual Tracking') {
        matchStage.animal_type="Dog";
        matchStage.breed = { $in: ["Doberman Pinscher", "German Shepherd", "Golden Retriever", "Bloodhound", "Rottweiler"] };
        matchStage.sex_upon_outcome = "Intact Male";
        matchStage.age_upon_outcome_in_weeks = { $gte: 20, $lte: 300 };
    }

    // Adding matchStage to the pipeline
    pipeline.push({ $match: matchStage });

    //Using $sort to show from youngest to oldest
    pipeline.push({ $sort: { age_upon_outcome_in_weeks: 1 } });

    // $limit used to 50 results directly on the database server to reduce network traffic
    pipeline.push({ $limit: 50 });

    try {
        // Execute the aggregate pipeline 
        const results = await Animal.aggregate(pipeline);
        res.status(200).json(results);
    } catch (err) {
        console.error("Aggregation Failure:", err);
        res.status(500).json({ error: "Failed to process aggregation: " + err.message });
    }
});

//Graceful shutdown that ensures files and device is left in the correct state
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed. Server shutting down.');
    process.exit(0);
});

//Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
