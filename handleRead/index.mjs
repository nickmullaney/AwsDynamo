import dynamoose from 'dynamoose';

// Define the schema for the DynamoDB table
const schema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "phone": String
});

// Create a model for the 'friends' table using the defined schema
const friends = dynamoose.model('friends', schema);

// Define the Lambda function handler
export const handler = async (event) => {
  // Initialize the response object
  const response = { statusCode: null, body: null };

  try {
    // Perform a scan operation on the 'friends' table to retrieve all records
    let results = await friends.scan().exec();

    // Log the retrieved results
    console.log('results-------', results);
    
    // Set the response body as the retrieved results and the status code to 200 (OK)
    response.body = JSON.stringify(results);
    response.statusCode = 200;
  } catch (e) {
    // If an error occurs, set the response body as the error message and the status code to 500 (Internal Server Error)
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  // Return the response
  return response;
};
