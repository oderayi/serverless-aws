const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient
            .get(params)
            .promise()

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`)
        }

        console.log(data);

        return data.Item;
    },
    async write(data, TableName) {
        if(!data.ID) {
            throw Error('No ID on the data');
        }

        const params = {
            TableName,
            Item: data
        }

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.ID} into table ${TableName}`);
        }

        return data;
    },

    update: async ({ tableName, primaryKey,  primeraKeyValue, updateKey, updateValue}) => {
        const params = {
            TableName: tableName,
            Key: {[primaryKey]: primeraKeyValue },
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ExpressionAttributeValues: {
                ':updateValue': updateValue,
            },
        };
        
        return documentClient.update(params).promise();
    }
}

module.exports = Dynamo;