const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

async function connectToDataBase(collectionName) {
  try {
    await client.connect();
    const database = client.db("expressDB");
    console.log('connecting to the collection.. ', collectionName)
    const db = database.collection(collectionName);
    return db;
  } catch (error) {
    console.error("ERROR: error in connecting to database" + error);
    throw new Error('Error in connecting to Database ', error)
  }
}

const disconnectFromDataBase = async function () {
  try {
    if (client) return await client.close();
  } catch (error) {
    console.error("ERROR: " + error);
    throw new Error('Error in disconnection from Database ', error)
  }
};

async function createEmployee(data) {
  try {
    const collection = await connectToDataBase('empData');
    console.log('Connection established');
    console.log('Creating the employee', data);
    await collection.insertOne(data);
    return { message: 'Successfully created', data: data };
  } catch (error) {
    console.log("ERROR: error in creating a employee " + error);
    return { error: `Error in creating a employee - ${error}` };
  } finally {
    await disconnectFromDataBase();
    console.log('disconnected');
  }
}

async function createBulkEmployee(data) {
  try {
    const collection = await connectToDataBase('empData');
    console.log('Connection established');
    console.log('Creating the employee', data);
    await collection.insertMany(data);
    return { message: 'Successfully created', data: data };
  } catch (error) {
    console.log("ERROR: error in creating a employee " + error);
    return { error: `Error in creating a employee - ${error}` };
  } finally {
    await disconnectFromDataBase();
    console.log('disconnected');
  }
}

async function deleteEmployee(id) {
  try {
    const collection = await connectToDataBase('empData');
    console.log('Deleting the employee ', id, typeof id);
    const result = await collection.deleteOne({
      empId: Number(id)
    });
    console.log('result ', result);
    if (result.deletedCount > 0) {
      return { message: `successfully deleted ${id}` }
    }
    else {
      return { message: `Given id not found -  ${id}`, code: 404 }
    }
  } catch (error) {
    console.log("ERROR: error in deleting a employee " + error);
    return { error: `Error in deleting a employee - ${error}` };
  } finally {
    await disconnectFromDataBase();
    console.log('disconnected');
  }
}

async function updateEmployee(data) {
  try {
    console.log('updating the employee',data);
    const collection = await connectToDataBase('empData');
    const result = await collection.updateOne({
      empId: data.empId
    }, 
    {
      $set: {
        name: data.name,
        age: data.age,
        city: data.city
      }
    });

    console.log('Result', result);
    if (result.modifiedCount > 0) {
      console.log('111')
      const cursor = collection.find({ empId: data.empId });
      let items = [];
      await cursor.forEach(function (doc) {
        items.push(doc);
      });
      return { message: 'successfully updated the employee details', data: items };
    }
    else {
      console.log('2222')
      return { message: `Given emp id not found -  ${data.empId}`, code: 404 }
    }
  } catch (error) {
    console.log("ERROR: error in updating employee details " + error);
    return { error: `Error in updating employee details - ${error}` };
  } finally {
    await disconnectFromDataBase();
    console.log('disconnected');
  }
}

async function getAllEmployeeDetails() {
  try {
    const collection = await connectToDataBase('empData');
    const cursor = collection.find();
    let items = [];
    await cursor.forEach(function (doc) {
      items.push(doc);
    });
    return items;
  } catch (error) {
    console.log("ERROR: error in getting employee details " + error);
    return { error: `Error in getting employee details - ${error}` };
  } finally {
    await disconnectFromDataBase();
    console.log('disconnected');
  }
}

module.exports = {
  createEmployee,
  getAllEmployeeDetails,
  updateEmployee,
  deleteEmployee,
  createBulkEmployee
}

