# Serverless API with AWS DynamoDB

This project implements a single resource REST API using AWS Cloud Services, specifically AWS DynamoDB as the database and API Gateway for routing. The API allows CRUD (Create, Read, Update, Delete) operations on a domain model called "friends". Each friend object has properties like `id`, `name`, and `phone`.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/AwsDynamo
   ```

2. Navigate to the project directory:

   ```bash
   cd AwsDynamo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure AWS credentials:

   - **Environment variables**: Set the following environment variables with your AWS credentials:

     - `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
     - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
     - `AWS_REGION`: The AWS region where your DynamoDB table will be located.

   - **AWS CLI**: Configure AWS CLI using the following command and provide your AWS credentials when prompted:

     ```bash
     aws configure
     ```

5. Create a DynamoDB table:

   - Use the AWS Management Console or AWS CLI to create a DynamoDB table with the desired configuration. The table should have a primary key attribute named `id` of type `String`.

6. Update the code:

   - Open the `handler.js` file in each handler directory (`handleCreate`, `handleRead`, `handleUpdate`, `handleDelete`) and update the `tableName` variable with your DynamoDB table name.

7. Deploy the Lambda functions:

   - Zip the code and dependencies for each handler:

     ```bash
     cd handleCreate
     zip -r create.zip .
     cd ../handleRead
     zip -r read.zip .
     cd ../handleUpdate
     zip -r update.zip .
     cd ../handleDelete
     zip -r delete.zip .
     ```

   - Create the Lambda functions using the AWS Management Console or AWS CLI, and upload the respective zip files for each handler.

8. Configure API Gateway:

   - Create a new REST API in API Gateway.
   - Create the following routes:
     - **POST** `/people` -> Integrates with the `handleCreate` Lambda function.
     - **GET** `/people` -> Integrates with the `handleRead` Lambda function.
     - **GET** `/people/{id}` -> Integrates with the `handleRead` Lambda function.
     - **PUT** `/people/{id}` -> Integrates with the `handleUpdate` Lambda function.
     - **DELETE** `/people/{id}` -> Integrates with the `handleDelete` Lambda function.

## Usage

The API endpoints can be accessed using the following base URL:

```
https://api.example.com/
```

### POST /people

Inserts a record into the database.

- Request body: JSON object representing a friend.
- Response: JSON object representing the created friend with its generated `id` field.

Example request:

```http
POST /people HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "1234567890"
}
```

Example response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "abc123",
  "name": "John Doe",
  "phone": "1234567890"
}
```

### GET /people

Returns an array of objects representing all the friends in the database.

Example request:

```http
GET /people HTTP/1.1


Host: api.example.com
```

Example response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": "abc123",
    "name": "John Doe",
    "phone": "1234567890"
  },
  {
    "id": "def456",
    "name": "Jane Smith",
    "phone": "9876543210"
  }
]
```

### GET /people/{id}

Returns an object representing a friend by their `id`.

- Path parameter: `id` - The unique identifier of the friend.

Example request:

```http
GET /people/abc123 HTTP/1.1
Host: api.example.com
```

Example response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "abc123",
  "name": "John Doe",
  "phone": "1234567890"
}
```

### PUT /people/{id}

Updates a record in the database with the provided `id`.

- Path parameter: `id` - The unique identifier of the friend to update.
- Request body: JSON object representing the updated friend.
- Response: JSON object representing the updated friend.

Example request:

```http
PUT /people/abc123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "John Smith",
  "phone": "9999999999"
}
```

Example response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "abc123",
  "name": "John Smith",
  "phone": "9999999999"
}
```

### DELETE /people/{id}

Removes the matching record from the database with the provided `id`.

- Path parameter: `id` - The unique identifier of the friend to delete.
- Response: Empty object.

Example request:

```http
DELETE /people/abc123 HTTP/1.1
Host: api.example.com
```

Example response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{}
```

## Testing

No Current tests at the moment

## Deployment

For deployment, the Lambda functions can be manually deployed by uploading the respective zip files for each handler.


## Documentation/UML

![Alt text](lab%2018%20UML.png)
Thank you to Ryan Gallaway for the example of what this UML would look like

### Data and Program Flow

The API routes are mapped to the corresponding Lambda functions as follows:

- **POST** `/people` -> `handleCreate` Lambda function
- **GET** `/people` -> `handleRead` Lambda function
- **GET** `/people/{id}` -> `handleRead` Lambda function
- **PUT** `/people/{id}` -> `handleUpdate` Lambda function
- **DELETE** `/people/{id}` -> `handleDelete` Lambda function

The data flow follows these steps:

1. A request is sent to the API Gateway with the appropriate route and method.
2. API Gateway invokes the corresponding Lambda function.
3. The Lambda function performs the CRUD operation on the DynamoDB table based on the request.
4. The Lambda function returns the response to the API Gateway.
5. API Gateway sends the response back to the client.

### API Root URL

The root URL of the API is:

```
https://api.example.com/
```

Please note that `api.example.com` is a placeholder. Replace it with your actual API domain or hostname.

## License

This project is licensed under the [MIT License](LICENSE).

## Collaborators
Thanks to Ryan Gallaway for the UML assist and code assist with the starter code
Thanks to ChatGPT for assisting with double checking code and helping format the README