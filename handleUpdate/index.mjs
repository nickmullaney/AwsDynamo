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
  // Extract the 'id' from the path parameters of the event
  const { id } = event.pathParameters;

  // Parse the JSON body of the event
  const parsedBody = JSON.parse(event.body);

  // Initialize the response object
  const response = { statusCode: null, body: null };

  try {
    // Update the record in the 'friends' table with the given 'id' using the parsed body as the update data
    let result = await friends.update({ id }, parsedBody);

    // Log the updated record
    console.log('updated record', result);

    // Set the response body as the updated record and the status code to 200 (OK)
    response.body = JSON.stringify(result);
    response.statusCode = 200;
  } catch (error) {
    // If an error occurs, set the response body as the error message and the status code to 500 (Internal Server Error)
    response.body = JSON.stringify(error.message);
    response.statusCode = 500;
  }

  // Return the response
  return response;
};
