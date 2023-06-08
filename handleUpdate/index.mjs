import dynamoose from 'dynamoose';

const schema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "phone": String
});

const friends = dynamoose.model('friends', schema);

export const handler = async(event) => {
  const { id } = event.pathParameters;
  const parsedBody = JSON.parse(event.body);
  const response = { statusCode: null, body: null };

  try {
    let result = await friends.update({ id }, parsedBody);
    console.log('updated record', result);
    response.body = JSON.stringify(result);
    response.statusCode = 200;
  } catch (error) {
    response.body = JSON.stringify(error.message);
    response.statusCode = 500;
  }

  return response;
};
