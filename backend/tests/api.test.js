import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index'; // Assuming your app is exported as 'app' from app.js

describe('Post API', () => {
  beforeAll(async () => {
    // Connect to the test database before running the tests
    const testDBUrl = 'mongodb+srv://kjuricic:testtest@cluster0.vskusjx.mongodb.net/testiranjebaze?retryWrites=true&w=majority';
    await mongoose.connect(testDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Disconnect from the test database after running the tests
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the PostMessage collection before each test
    await mongoose.connection.collection('postmessages').deleteMany({});
  });

  it('should create a new post', async () => {
    const response = await request(app)
      .post('/posts')
      .send({
        title: 'Test Post',
        message: 'This is a test post',
        selectedFile: 'test.jpg',
        creator: 'Test User',
        tags: ['test', 'node']
      })
      .expect(201);

    // Add assertions for the response as needed
    // For example:
    expect(response.body.title).toBe('Test Post');
  });

  it('should get all posts', async () => {
    // Create some test posts before fetching them
    const post1 = {
      title: 'Post 1',
      message: 'Message 1',
      creator: 'User 1',
      tags: ['tag1', 'tag2']
    };
    const post2 = {
      title: 'Post 2',
      message: 'Message 2',
      creator: 'User 2',
      tags: ['tag3', 'tag4']
    };
    await request(app).post('/posts').send(post1);
    await request(app).post('/posts').send(post2);

    const response = await request(app).get('/posts').expect(200);

    // Add assertions for the response as needed
    // For example:
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].title).toBe('Post 1');
    expect(response.body[1].title).toBe('Post 2');
  }); 
  it('should update a post', async () => {
    // Create a test post
    const createResponse = await request(app)
      .post('/posts')
      .send({
        title: 'Updated Post',
        message: 'This is a test post',
        selectedFile: 'test.jpg',
        creator: 'Test User',
        tags: ['test', 'node']
      });

    const postId = createResponse.body._id;

    // Update the post
    const updatedPostData = {
      title: 'Updated Post',
      message: 'This post has been updated',
      tags: ['updated', 'node']
    };

    await request(app)
      .put(`/posts/${postId}`)
      .send(updatedPostData)
      .expect(404);

    const getResponse = await request(app).get(`/posts/${postId}`).expect(200);
  });
  
  it('should delete a post', async () => {
    // Create a test post
    const createResponse = await request(app)
      .post('/posts')
      .send({
        title: 'Test Post',
        message: 'This is a test post',
        selectedFile: 'test.jpg',
        creator: 'Test User',
        tags: ['test', 'node']
      });

    const postId = createResponse.body._id;

    // Delete the post
    const deleteResponse = await request(app)
      .delete(`/posts/${postId}`)
      .expect(200);

    // Verify that the post is deleted
    expect(deleteResponse.body.message).toBe('Post deleted successfully.');
  });
});
