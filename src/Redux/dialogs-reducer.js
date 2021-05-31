const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
  dialogs: [
    { id: 1, name: 'Hama' },
    { id: 2, name: 'Nataha' },
    { id: 3, name: 'Kolyan' },
    { id: 4, name: 'Katka' },
    { id: 5, name: 'Ded' }
  ],
  messages: [
    { id: 0, message: 'Hi ' },
    { id: 1, message: 'How are you' },
    { id: 3, message: 'Very nice' },
    { id: 4, message: 'Sex love' },
    { id: 5, message: 'Ёлки зеленые' }
  ]

};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = {
        id: 6,
        message: action.newDialog
      };
      return {
        //возвращаем копию state со всеми изменениями
        ...state,
        messages: [...state.messages, newMessage]
      };
    default:
      return state;
  }
};

export const addMessageActionCreator = (newDialog) => ({ type: ADD_MESSAGE, newDialog });

export default dialogsReducer;