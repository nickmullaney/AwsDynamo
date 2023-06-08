import dynamoose from 'dynamoose';

const schema = new dynamoose.Schema({
    "id": String,
    "name": Object,
    "phone": Object
});

const friends = dynamoose.model('friends', schema);

export const handler = async(event) => {
  // TODO implement
  const response = {
      statusCode: null,
      body: null,
  };
  
  try{
    let results = await friends;
    console.log('results----------', results);
    response.body = JSON.stringify(results);
    response.statusCode = 200;
  } catch( e ){
    response.body = null;
    response.statusCode = null;
  }
  
  return response;
};


// Original response
// const response = {
//       statusCode: 200,
//       body: JSON.stringify('Hello from Lambda!'),
//   };
//   return response;