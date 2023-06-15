import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Post from './Post';

// Mock the redux store
const mockStore = configureStore([]);

describe('Post', () => {
  let store;
  const post = {
    _id: '1',
    title: 'Test Post',
    message: 'This is a test post',
    creator: 'John Doe',
    tags: ['test', 'react'],
    selectedFile: 'https://example.com/image.jpg',
    likeCount: 0,
  };

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders the post correctly', () => {
    render(
      <Provider store={store}>
        <Post post={post} setCurrentId={jest.fn()} />
      </Provider>
    );

    // Check if the post title is rendered
    const titleElement = screen.getByText(post.title);
    expect(titleElement).toBeInTheDocument();

    // Check if the post message is rendered
    const messageElement = screen.getByText(post.message);
    expect(messageElement).toBeInTheDocument();

    // Check if the creator name is rendered
    const creatorElement = screen.getByText(post.creator);
    expect(creatorElement).toBeInTheDocument();

    // Check if the like button is rendered
    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).toBeInTheDocument();

    // Check if the delete button is rendered
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });
});
