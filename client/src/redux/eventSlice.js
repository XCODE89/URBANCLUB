import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from "sweetalert";

const initialState = {
  creaEvents: [],
  allEvents: [],
  detailEvent: []
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    postEventSuccess(state, action) {
      return {
        ...state,
        creaEvents: action.payload,
      };
    },
    getAllEventsSuccess(state, action) {
      return {
        ...state,
        allEvents: action.payload
      };
    },
    gellDetailEvent(state, action) {
      return {
        ...state,
        detailEvent: action.payload
      }
    }
  },
  updateEventSuccess(state, action) {
    return {
      ...state,
      creaEvents: action.payload,
    };
  },
  getEvents(state) {
    return {
      ...state
    }
  }
});

export const upEvent = (input, id ) => {
  return async (dispatch) => {
    try {
      const eventDB = await axios.put(`/events/update/${id}`, input);
      console.log(eventDB)
      const response = eventDB.data;
      dispatch(updateEventSuccess(response));
    } catch (error) {
      // swal({
      //   title: "ERROR",
      //   text: error,
      //   icon: "warning",
      //   buttons: "Aceptar",
      // });
    }
  };
};

export const postEvent = (payload) => {
  return async (dispatch) => {
    try {
      const eventData = (await axios.post("/events", payload)).data;
      await dispatch(postEventSuccess(eventData));

    } catch (error) {
      console.log(error);
      swal({
        title: "EVENTOS",
        text: `No se pudo crear el evento`,
        icon: "error",
        buttons: "Aceptar",
      });
    }
  };
};

export const getAllEvents = () => {
  return async (dispatch) => {
    const apiData = await axios.get(`/events`);
    const events = apiData.data;
    return dispatch(getAllEventsSuccess(events));
  };
};

export const getDetailEvents = (id) => {

  return async (dispatch) => {
    try {
      const result = (await axios.get(`/events/detailEvent/${id}`)).data;
      return dispatch(gellDetailEvent(result))
    } catch (error) {
      swal({
        title: "EVENTOS",
        text: `No hay eventos para este usuario`,
        icon: "error",
        buttons: "Aceptar"
      })
    }
  }
}

export const deleteEvent = async (id) => {
  try {
    console.log("el id es",id)
     axios.delete(`/events/${id}`);

    return async (dispatch) => {
      dispatch(getEvents());
    }
  } catch (error) {
    swal({
      title: "EVENTOS",
      text: `No se pudo eliminar el evento ${error}`,
      icon: "error",
      buttons: "Aceptar"
    })
  }
}


export const { postEventSuccess, getAllEventsSuccess, gellDetailEvent, updateEventSuccess, getEvents } = eventSlice.actions;

export default eventSlice.reducer;
