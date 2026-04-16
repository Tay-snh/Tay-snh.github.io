# CS-499-Capstone

## Professional Assessment

The coursework at SNHU and developing my ePortfolio has helped showcase my strengths, shaped my professional goals and values, and prepared me to become more employable in the computer science field. I have gained experience with implementing security in Software Security, connecting a database to an application in Client Server Development, creating 3D images in Computational Graphics and Visualization, and more. Additionally, during my internship I worked in a team to develop and optimize the organization’s website, effectively demonstrating good teamwork, and communicating with stakeholders. 

All enhancements were done to the same artifact, from the course CS-340 Client/Server Development. It consisted of an Animal Shelter CRUD Python Module and its associated DASH dashboard for the client “Grazioso Salvare.” They served as a bridge between a MongoDB database, displaying a visual interface so users could easily see and filter to find eligible animals for rescue operations. The project was developed utilizing PyMongo and DASH/Plotly. Enhancements were made in software engineering, data structures and algorithms, database, and security. For the software design/engineering enhancements I migrated languages and shifted the architecture of the project from Python script to a Node.js/Express Full Stack application. I developed RESTful API using Node.js and Express to replace the Python CRUD Module, implemented schema validation to ensure data integrity during the transition, replaced the DASH components with custom HTML5 and JavaScript to improve the responsiveness and UI control, and connected this to the database instance via Mongoose. The next enhancement for algorithms and data structure focused on optimizing search efficiency by implementing a parameterized search algorithm. This was done by moving the filter logic from Python (client-side) to MongoDB Aggregation Pipeline (server side) within the Node.js environment. By implementing this, all the records wouldn’t be pulled and filtered in memory, but instead the database handles algorithmic processing, such as utilizing the Aggregation Pipeline to sort and limit results before coming to the middleware. This improved time complexity for large datasets. 
Lastly, the database and security enhancement included implementing a Full Stack Node.js/Mongoose architecture to create a professional database interface. The system ensures data integrity through Mongoose schema validation and utilizes a RESTful JavaScript interface for standardized HTTP access. By implementing sanitized queries to prevent NoSQL injection and establishing role-based access control, the architecture maintains a secure and highly structured database environment.

## Code Review
Code review can be viewed [here](https://youtu.be/eT7jEd3oMa8)

## Enhancements

### Enhancement One: Software Design and Engineering

The improved version of the project demonstrates skills as a full stack developer, to make enhancements in algorithms and data structure. It shows optimizing search efficiency by implementing a parameterized search algorithm. This was done by moving the filter logic from client-side find() queries in Python to MongoDB Aggregation Pipeline (server side) within the Node.js environment. By implementing this, all the records are not pulled and filtered in memory, but instead in the database. That handles algorithmic processing before coming to the middleware, improving time complexity and computational load for large datasets. This showcases an effective evaluation of trade-offs between client-side processing and server-side aggregation to achieve superior performance and scalability. 

**Here is a snippet of the index.js file:**

```HTML5
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Grazioso Salvare Dashboard</title>
    <style>
        body { font-family:Arial; margin: 20px; background-color: #f0f0f0; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
        th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
        th { background-color: #cf2b4f; color: white; }
        .controls { margin-bottom: 20px; }
        button { padding: 10px 20px; cursor: pointer; background: #28a745; color: white; border: none; border-radius: 4px; }
        .container {
        text-align: center;
        }
    </style>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
</head>
<body>
    <div class="container">
    <img src="Grazioso Salvare Logo.png" alt="Grazioso Salvare Logo" />
    </div>
    <h1>Rescue Dog Finder</h1>
    <div class="controls">
    <label for="rescueType">Rescue Type:</label>
    <select id="rescueType">
        <option value="all" selected>Reset</option>
        <option value="Water Rescue">Water Rescue</option>
        <option value="Mountain or Wilderness">Mountain or Wilderness </option>
        <option value="Disaster or Individual Tracking">Disaster or Tracking</option>
    </select> 
    <button id="fetchDogs">Filter Results</button>
</div>
    <table id="resultsTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Breed</th>
                <th>Color</th>
                <th>Age</th>
                <th>Outcome Type</th>
                <th>Sex</th>
                <th>Age (Weeks)</th>
            </tr>
        </thead>
        <tbody>
            </tbody>
    </table>
<div style="display: flex; gap: 20px; margin-top: 20px;">
    <div id="pie-chart" style="width: 50%; height: 400px;"></div>
    <div id="map" style="width: 50%; height: 400px; border: 1px solid #ccc;"></div>
</div>
    <script src="app.js"></script>
</body>
</html>
```
### Enhancement Two: Algorithms and Data Structure

The improved version demonstrates skills as a full stack developer, to make enhancements in algorithms and data structure. It shows optimizing search efficiency by implementing a parameterized search algorithm. This was done by moving the filter logic from client-side find() queries in Python to MongoDB Aggregation Pipeline (server side) within the Node.js environment. By implementing this, all the records are not pulled and filtered in memory, but instead in the database. That handles algorithmic processing before coming to the middleware, improving time complexity and computational load for large datasets. This showcases an effective evaluation of trade-offs between client-side processing and server-side aggregation to achieve superior performance and scalability. 

**Here is a snippet of the enhanced filtering logic in server.js:**

```JavaScript
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
```
### Enhancement Three: Databases

The improved version demonstrates skills as a full stack developer, to make enhancements in the database. It demonstrates the creation of a professional database interface, which includes schema validation using Mongoose to ensure data integrity, a RESTful API built with JavaScript to allow database access via standard HTTP protocols, sanitized queries to prevent NoSQL injection, and role-based access control for the database.

**Here is a snippet of the enhanced Animal.js file:**

```JavaScript
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
```
