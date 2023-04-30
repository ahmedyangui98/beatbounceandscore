import {
  SET_MAIN_STREAM,
  ADD_PARTICIPANT,
  SET_USER,
  REMOVE_PARTICIPANT,
  UPDATE_USER,
  UPDATE_PARTICIPANT,
} from "../Types/actiontypes";

import {
  createOffer,
  initializeListensers,
  updatePreference,
} from "../../server/peerConnection";

let initialState = {
  mainStream: null,
  participants: {},
  currentUser: null,
};

const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
        "stun:stun.services.mozilla.com",
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

const generateColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_MAIN_STREAM:
        return { ...state, mainStream: action.payload };
      case ADD_PARTICIPANT:
        const { newUser } = action.payload;
        const currentUserId = state.currentUser ? Object.keys(state.currentUser)[0] : null;
        const newUserId = newUser ? Object.keys(newUser)[0] : null;
        if (state.mainStream && currentUserId && newUserId && currentUserId !== newUserId) {
          newUser[newUserId] = addConnection(
            newUser[newUserId],
            state.currentUser,
            state.mainStream
          );
        }
        if (newUser?.[newUserId]) {
          newUser[newUserId].currentUser = true;
          newUser[newUserId].avatarColor = generateColor();
          const participants = { ...state.participants, ...newUser };
          return { ...state, participants };
        }
        return state;
      case SET_USER:
        const { currentUser } = action.payload;
        const userId = currentUser ? Object.keys(currentUser)[0] : null;
        if (currentUser?.[userId]) {
          currentUser[userId] = {
            ...currentUser[userId],
            avatarColor: generateColor(),
          };
        }
        if (userId) { // make sure userId exists before calling initializeListensers
          initializeListensers(userId);
        }
        return {
          ...state,
          currentUser,
          participants: { ...state.participants },
        };
      case REMOVE_PARTICIPANT:
        const { id } = action.payload;
        const participants = { ...state.participants };
        delete participants[id];
        return { ...state, participants };
      case UPDATE_USER:
        const { currentUser: updatedUser } = action.payload;
        const uid = state.currentUser ? Object.keys(state.currentUser)[0] : null;
        updatePreference(uid, updatedUser);
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            [uid]: { ...state.currentUser[uid], ...updatedUser },
          },
        };
      case UPDATE_PARTICIPANT:
        const { newUser: updatedParticipant } = action.payload;
        const newParticipantId = updatedParticipant ? Object.keys(updatedParticipant)[0] : null;
        const updatedParticipants = {
          ...state.participants,
          [newParticipantId]: {
            ...state.participants[newParticipantId],
            ...updatedParticipant[newParticipantId],
          },
        };
        return { ...state, participants: updatedParticipants };
      default:
        return state;
    }
  };
  
  const addConnection = (newUser, currentUser, stream) => {
    const peerConnection = new RTCPeerConnection(servers);
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });
    const newUserId = newUser ? Object.keys(newUser)[0] : null;
    const currentUserId = currentUser ? Object.keys(currentUser)[0] : null;
  
    const offerIds = [newUserId, currentUserId].sort((a, b) =>
      a.localeCompare(b)
    );
  
    newUser[newUserId].peerConnection = peerConnection;
    if (offerIds[0] !== currentUserId) {
      createOffer(peerConnection, offerIds[0], offerIds[1]);}
  return newUser;
};
export default userReducer;