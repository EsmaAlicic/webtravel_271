import {
  TRIP_CREATE_FAIL,
  TRIP_CREATE_REQUEST,
  TRIP_CREATE_RESET,
  TRIP_CREATE_SUCCESS,
  TRIP_DELETE_FAIL,
  TRIP_DELETE_REQUEST,
  TRIP_DELETE_SUCCESS,
  TRIP_DETAILS_FAIL,
  TRIP_DETAILS_REQUEST,
  TRIP_DETAILS_SUCCESS,
  TRIP_LIST_FAIL,
  TRIP_LIST_REQUEST,
  TRIP_LIST_SUCCESS,
  TRIP_UPDATE_FAIL,
  TRIP_UPDATE_REQUEST,
  TRIP_UPDATE_RESET,
  TRIP_UPDATE_SUCCESS,
  TRIP_CREATE_QUESTION_FAIL,
  TRIP_CREATE_QUESTION_REQUEST,
  TRIP_CREATE_QUESTION_RESET,
  TRIP_CREATE_QUESTION_SUCCESS,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_DELETE_RESET,
} from "../reducer-const/tripConst";

export const tripReducer = (state = { trips: [] }, action) => {
  switch (action.type) {
    case TRIP_LIST_REQUEST:
      return { loading: true, trips: [] };
    case TRIP_LIST_SUCCESS:
      return {
        loading: false,
        trips: action.payload.trips,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case TRIP_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tripDetailsReducer = (
  state = { trip: { questions: [] } },
  action
) => {
  switch (action.type) {
    case TRIP_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TRIP_DETAILS_SUCCESS:
      return { loading: false, trip: action.payload };
    case TRIP_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tripDeleteReducer = (state = { trip: {} }, action) => {
  switch (action.type) {
    case TRIP_DELETE_REQUEST:
      return { loading: true, ...state };
    case TRIP_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRIP_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tripCreateReducer = (state = { trip: {} }, action) => {
  switch (action.type) {
    case TRIP_CREATE_REQUEST:
      return { loading: true, ...state };
    case TRIP_CREATE_SUCCESS:
      return { loading: false, success: true, trip: action.payload };
    case TRIP_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRIP_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const tripUpdateReducer = (state = { trip: {} }, action) => {
  switch (action.type) {
    case TRIP_UPDATE_REQUEST:
      return { loading: true, ...state };
    case TRIP_UPDATE_SUCCESS:
      return { loading: false, success: true, trip: action.payload };
    case TRIP_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TRIP_UPDATE_RESET:
      return { trip: {} };
    default:
      return state;
  }
};

export const tripQuestionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRIP_CREATE_QUESTION_REQUEST:
      return { loading: true, ...state };
    case TRIP_CREATE_QUESTION_SUCCESS:
      return { loading: false, success: true };
    case TRIP_CREATE_QUESTION_FAIL:
      return { loading: false, error: action.payload };
    case TRIP_CREATE_QUESTION_RESET:
      return {};
    default:
      return state;
  }
};

export const tripQuestionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_DELETE_REQUEST:
      return { loading: true, ...state };
    case QUESTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUESTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
