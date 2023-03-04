import { ALERT_ERROR, CLEAR_ERROR } from "../Types/errorTypes";

const initialState = [];

const errorreducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALERT_ERROR:
      return [...state, payload];
    case CLEAR_ERROR:
      return state.filter((el) => el.id !== payload);
    default:
      return state;
  }
};

export default errorreducer;
