import profileReducer from "./profile-reducer";
import dialogReducer from "./dialogs-reducer";




let storeOld = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Hama'},
                {id: 2, name: 'Nataha'},
                {id: 3, name: 'Kolyan'},
                {id: 4, name: 'Katka'},
                {id: 5, name: 'Ded'}
            ],
            messages: [
                {id: 0, message: 'Hi '},
                {id: 1, message: 'How are you'},
                {id: 3, message: 'Very nice'},
                {id: 4, message: 'Sex love'},
                {id: 5, message: 'Ёлки зеленые'}
            ],
            newDialog: '1234'
        },
        profilePages: {
            posts: [
                {id: 0, message: 'How are you?', likesCount: 10},
                {id: 1, message: 'Im fine', likesCount: 5},
                {id: 3, message: 'Good morning', likesCount: 1},
                {id: 4, message: 'Ky-ky', likesCount: 0}
            ],
            newPostText: 'it'
        },
        navbar: {
            friends: [
                {id: 1, name: 'Vasy', age: 20},
                {id: 2, name: 'Pety', age: 30},
                {id: 3, name: 'Vlad', age: 58},
                {id: 4, name: 'Lenka', age: 33}
            ]
        }
    },
    _callSubscribe() {
        console.log('state changed')
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePages = profileReducer(this._state.profilePages, action);
        this._state.dialogsPage = dialogReducer(this._state.dialogsPage, action);
        this._callSubscribe(this._state);
    },
    getState() {
        return this._state;
    }
};




export default storeOld;