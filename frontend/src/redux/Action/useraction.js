// Action Types
import {
  SET_MAIN_STREAM,
  ADD_PARTICIPANT,
  SET_USER,
  REMOVE_PARTICIPANT,
  UPDATE_USER,
  UPDATE_PARTICIPANT,
} from "../Types/useractionTypes"

// Action Creators
export const setMainStream = (stream) => ({
  type: SET_MAIN_STREAM,
  payload: stream,
});

export const addParticipant = (user) => ({
  type: ADD_PARTICIPANT,
  payload: user,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const removeParticipant = (userId) => ({
  type: REMOVE_PARTICIPANT,
  payload: userId,
});

export const updateParticipant = (user) => ({
  type: UPDATE_PARTICIPANT,
  payload: user,
});
