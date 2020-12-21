import { RECEIVE_MESSAGES, RECEIVE_NEW_MESSAGE } from '../actions/message_actions';
import { RECEIVE_ROOMS } from '../actions/room_actions';

const MessagesReducer = (state = { }, action) => {
  Object.freeze(state);
   ;
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_MESSAGES:
      newState = action.messages;
      return newState;
    case RECEIVE_NEW_MESSAGE:
      Object.assign(newState, action.message);
      return newState;
    case RECEIVE_ROOMS:
      let messages = {};
      //create messages object
      action.rooms.data.forEach(room => {
        room.messages.forEach(msg => {
          messages[msg._id] = {
            id: msg._id,
            message: msg.message,
            createdAt: msg.createdAt,
            updatedAt: msg.updatedAt,
            room: msg.room,
            sender: msg.sender._id,
            username: msg.sender.username,
          }
        })
      });
      Object.assign(newState, messages);
      return newState;

    default:
      return state;
  }
};

export default MessagesReducer;