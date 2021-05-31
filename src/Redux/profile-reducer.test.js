import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

//1. test data
let state = {
  posts: [
    { id: 0, message: 'How are you?', likesCount: 10 },
    { id: 1, message: 'Im fine', likesCount: 5 },
    { id: 3, message: 'Good morning', likesCount: 1 },
    { id: 4, message: 'Ky-ky', likesCount: 0 }
  ]
};

test('length of posts should be incremented', () => {
  //2. action
  let action = addPostActionCreator('oh my bad inglish');

  let newState = profileReducer(state, action)
  //3.expectation
  expect(newState.posts.length).toBe(5);

});

test('message of new posts should be correct', () => {
  //2. action
  let action = addPostActionCreator('oh my bad inglish');

  let newState = profileReducer(state, action)
  //3.expectation
  expect(newState.posts[4].message).toBe('oh my bad inglish');
});

test('after deleting length of message should be decrement', () => {
  //2. action
  let action = deletePost(4);

  let newState = profileReducer(state, action)
  //3.expectation
  expect(newState.posts.length).toBe(3);
});
test('after deleting length of message should not if id is incorrect', () => {
  //2. action
  let action = deletePost(1000);

  let newState = profileReducer(state, action)
  //3.expectation
  expect(newState.posts.length).toBe(4);
});