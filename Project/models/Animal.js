const mongoose = require('mongoose');

// Enhanced Schema with strict validation and sanitization
const animalSchema = new mongoose.Schema({
    // animal_id is the unique primary key; required and trimmed of whitespace
    animal_id: { 
        type: String, 
        required: [true, 'Animal ID is mandatory'], 
        unique: true,
        trim: true 
    },
    animal_type: { 
        type: String, 
        required: true,
        trim: true 
    },
    breed: { 
        type: String, 
        required: true,
        trim: true 
    },
    color: { type: String },
    age_upon_outcome: { type: String },
    outcome_type: { type: String },
    // Ensures "sex_upon_outcome" only contains valid standardized strings
    sex_upon_outcome: { 
        type: String, 
        required: true,
        enum: {
            values: ['Intact Male', 'Intact Female', 'Neutered Male', 'Spayed Female', 'Unknown'],
            message: '{VALUE} is not a valid sex status'
        }
    },
    location_lat: { 
        type: Number, 
        required: [true, 'Latitude is required for mapping'] 
    },
    location_long: { 
        type: Number, 
        required: [true, 'Longitude is required for mapping'] 
    },
    // Numerical validation prevents logical errors in search algorithms
    age_upon_outcome_in_weeks: { 
        type: Number, 
        required: true,
        min: [0, 'Age in weeks cannot be negative']
    }
}, { 
    collection: 'animals',
    timestamps: true // Adds createdAt and updatedAt automatically
}); 

//Adds an index to the fields used in your Aggregation Pipeline which improves search performance 
animalSchema.index({ breed: 1, age_upon_outcome_in_weeks: 1 });

module.exports = mongoose.model('Animal', animalSchema);