import {
  CREATE_DATA,
  GETUSERDATE,
  IS_ERROR,
  IS_LOADING,
  USER_DETAILS_EDIT_DATA,
  VIEW_DETAILS_DATA,
} from "./action";

const initialState = {
  isLoading: false,
  isError: false,
  UserData: [],
  userformdata: {},
  view_details_data: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false, // Reset error state while loading
      };
    case GETUSERDATE:
      return {
        ...state,
        isLoading: false, // Loading is complete
        isError: false, // Reset error state on success
        UserData: action.payload,
      };
    case CREATE_DATA:
      return {
        ...state,
        isLoading: false, // Loading is complete
        isError: false, // Reset error state on success
        userformdata: action.payload,
      };
    case VIEW_DETAILS_DATA: {
      return {
        ...state,
        isLoading: false, // Loading is complete
        isError: false, // Reset error state on success
        view_details_data: action.payload,
      };
    }
    case USER_DETAILS_EDIT_DATA: {
      return {
        ...state,
        isLoading: false, // Loading is complete
        isError: false, // Reset error state on success
        UserData: action.payload,
      };
    }
    case IS_ERROR:
      return {
        ...state,
        isLoading: true,
        isError: false, // Reset error state while loading
      };
    default:
      return state;
  }
};
