import dynamoose from 'dynamoose';

const schema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "phone": String
});

const friends = dynamoose.model('friends', schema);

export const handler = async(event) => {
  const { id } = event.pathParameters;
  const response = { statusCode: null, body: null };

  try {
    await friends.delete({ id });
    response.statusCode = 200;
    response.body = JSON.stringify({});
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(error.message);
  }

  return response;
};
