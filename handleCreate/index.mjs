import dynamoose from 'dynamoose';

const schema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "phone": String
});

const friends = dynamoose.model('friends', schema);

export const handler = async (event) => {
  // TODO implement
  console.log('this is the body', event.body);
  let parsedBody = JSON.parse(event.body);
  
  // Initialize the response object
  const response = { statusCode: null, body: null };

  try {
    // Create a new record in the 'friends' table with the parsed body
    let results = await friends.create(parsedBody);
    console.log('these are our results...', results);
    
    // Set the response body as the created record
    response.body = JSON.stringify(results);
    
    // Set the response status code to 200 (OK)
    response.statusCode = 200;
  } catch (e) {
    // If an error occurs, set the response body as the error message
    // and the response status code to 500 (Internal Server Error)
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  // Return the response
  return response;
};
