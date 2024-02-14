import axios from "axios";

import {
  TRIP_LIST_FAIL,
  TRIP_LIST_REQUEST,
  TRIP_LIST_SUCCESS,
  TRIP_DETAILS_REQUEST,
  TRIP_DETAILS_SUCCESS,
  TRIP_DETAILS_FAIL,
  TRIP_DELETE_REQUEST,
  TRIP_DELETE_SUCCESS,
  TRIP_DELETE_FAIL,
  TRIP_CREATE_REQUEST,
  TRIP_CREATE_SUCCESS,
  TRIP_CREATE_FAIL,
  TRIP_UPDATE_FAIL,
  TRIP_UPDATE_SUCCESS,
  TRIP_UPDATE_REQUEST,
  TRIP_CREATE_QUESTION_FAIL,
  TRIP_CREATE_QUESTION_SUCCESS,
  TRIP_CREATE_QUESTION_REQUEST,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAIL,
} from "../reducer-const/tripConst";

export const listTrips =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: TRIP_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/trips?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: TRIP_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRIP_LIST_FAIL,
        payload:
          error.response && error.response.data.message // da bi dobili response error message od backend servera (custom)
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTripDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TRIP_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/trips/${id}`);

    dispatch({
      type: TRIP_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRIP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message // da bi dobili response error message od backend servera (custom)
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTripById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRIP_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/trips/${id}`, config);
    dispatch({
      type: TRIP_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TRIP_DELETE_FAIL,
      payload:
        error.response && error.response.data.message // da bi dobili response error message od backend servera (custom)
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTrip = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TRIP_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/trips`, {}, config);
    dispatch({
      type: TRIP_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRIP_CREATE_FAIL,
      payload:
        error.response && error.response.data.message // da bi dobili response error message od backend servera (custom)
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTrip = (trip) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRIP_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/trips/${trip._id}`, trip, config);
    dispatch({
      type: TRIP_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRIP_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message // da bi dobili response error message od backend servera (custom)
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTripQuestion =
  (tripId, question) => async (dispatch, getState) => {
    try {
      dispatch({ type: TRIP_CREATE_QUESTION_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`/api/trips/${tripId}/questions`, question, config);
      dispatch({
        type: TRIP_CREATE_QUESTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TRIP_CREATE_QUESTION_FAIL,
        payload:
          error.response && error.response.data.message // da bi dobili response error message od backend servera (custom)
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteQuestionById =
  (id, questionId) => async (dispatch, getState) => {
    try {
      dispatch({ type: QUESTION_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`/api/trips/${id}/questions/${questionId}`, config);
      dispatch({
        type: QUESTION_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
