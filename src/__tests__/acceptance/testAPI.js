
const request = require('supertest');
const app = require('../../../index');

describe('CRUD operation test cases', () => {
  it('should create a new employee', async () => {
    const response = await request(app)
      .post('/createEmployee')
      .send({
        name: 'Name 1',
        empId: 1,
        city: 'Bangalore',
        age: 35
      });
    console.log('response', response.statusCode)
    expect(response.statusCode).toEqual(200)
  });

  it('should fail to create new employee - duplicate employee ID', async () => {
    const response = await request(app)
      .post('/createEmployee')
      .send({
        name: 'Name 2',
        empId: 1,
        city: 'Bangalore',
        age: 30
      });
    console.log('response', response.statusCode)
    expect(response.statusCode).toEqual(500);
  });

  it('should successfully get the all employee details', async () => {
    const response = await request(app).get('/getEmployeeDetails');
    console.log('response', response.statusCode)
    expect(response.statusCode).toEqual(200);
  });

  it('should create new employees - bulk create', async () => {
    const response = await request(app)
      .post('/createBulkEmployee')
      .send([{
        name: 'Name 3',
        empId: 2,
        city: 'Bangalore',
        age: 25
      },
      {
        name: 'Name 4',
        empId: 3,
        city: 'Bangalore',
        age: 20
      }]);
    console.log('response', response.statusCode)
    expect(response.statusCode).toEqual(200)
  });

  it('should fail to create new employees - bulk create', async () => {
    const response = await request(app)
      .post('/createBulkEmployee')
      .send([{
        name: 'Name 3',
        empId: 3,
        city: 'Bangalore',
        age: 10
      },
      {
        name: 'Name 4',
        empId: 3,
        city: 'Bangalore',
        age: 20
      }]);
    console.log('response', response.statusCode)
    expect(response.statusCode).toEqual(500)
  });

  it('should successfully update the employee details', async () => {
    const response = await request(app)
      .put('/updateEmployee')
      .send({
        name: 'Name 3',
        empId: 2,
        city: 'Bangalore',
        age: 10
      });
    console.log('response', response.statusCode)
    expect(response.statusCode).toEqual(200)
  });

  it('should fail to Update the employee - invalid emp id', async () => {
    const response = await request(app)
      .put('/updateEmployee')
      .send({
        name: 'Name 3',
        empId: 100,
        city: 'Bangalore',
        age: 10
      });
    console.log('response', response.statusCode)
    expect(response.statusCode).toEqual(404)
  });

  it('should successfully delete the employee', async () => {
    const response = await request(app)
      .delete('/deleteEmployee/1');
    console.log('response', response.statusCode)
    expect(response.statusCode).toEqual(200)
  });

  it('should fail to delete the employee', async () => {
    const response = await request(app)
      .delete('/deleteEmployee/100');
    console.log('response', response.statusCode)
    expect(response.statusCode).toEqual(404)
  });

})
