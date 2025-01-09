import axiosInstanceMain from "../utils/axiosInstanceMain";

export const GETUSERDATE = "GETUSERDATA";
export const IS_LOADING = "IS_LOADING";
export const IS_ERROR = "IS_ERROR";
export const CREATE_DATA = "CREATE_DATA";
export const VIEW_DETAILS_DATA = "VIEW_DETAILS_DATA";
export const USER_DETAILS_EDIT_DATA = "USER_DETAILS_EDIT_DATA";

// Action Creator for fetching user data
const getUserData = (date) => {
  return {
    type: GETUSERDATE,
    payload: date,
  };
};

// Action Creator for creating user data
const createData = (formdata) => {
  return {
    type: CREATE_DATA,
    payload: formdata,
  };
};

// Action Creator for loading state
const setIsLoading = () => {
  return {
    type: IS_LOADING,
  };
};

// Action Creator for error state
const setIsError = () => {
  return {
    type: IS_ERROR,
  };
};

// Action Creator for view user data
const viewDetailsData = (data) => {
  return {
    type: VIEW_DETAILS_DATA,
    payload: data,
  };
};

// Action Creator for edit user data
const editDetailsData = (data) => {
  return {
    type: USER_DETAILS_EDIT_DATA,
    payload: data,
  };
};
// Action Creator for fetching user data
export const getUserdata = () => async (dispatch) => {
  dispatch(setIsLoading());
  try {
    await axiosInstanceMain.get("/userget").then((res) => {
      dispatch(getUserData(res.data));
      //   console.log(res.data);
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    dispatch(setIsError());
  }
};

// Action Creator for Creating user data
export const postUserData =
  (formdata, enqueueSnackbar, navigate) => async (dispatch) => {
    dispatch(setIsLoading());
    try {
      await axiosInstanceMain.post("/usercreate", formdata).then((res) => {
        dispatch(createData(res.data));
        enqueueSnackbar("User Created Successfully", { variant: "success" });
        navigate("/");
        //   console.log(res.data);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      dispatch(setIsError());
    }
  };

//  Action  for Delete user data
export const deleteUserData = (id, enqueueSnackbar) => async (dispatch) => {
  dispatch(setIsLoading());
  try {
    await axiosInstanceMain.delete(`/userdelete/${id}`).then((res) => {
      dispatch(getUserdata(res.data));
      enqueueSnackbar("User Deleted Successfully", { variant: "error" });
      // navigate("/");
      //   console.log(res.data);
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    dispatch(setIsError());
  }
};

// Action  for View user data
export const viewUserData = (id) => async (dispatch) => {
  dispatch(setIsLoading());
  try {
    await axiosInstanceMain.get(`/userget/${id}`).then((res) => {
      dispatch(viewDetailsData(res.data));
      //   console.log(res.data);
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    dispatch(setIsError());
  }
};

// Action  for Edit user data
export const editUserData =
  (id, formdata, enqueueSnackbar) => async (dispatch) => {
    dispatch(setIsLoading());
    try {
      await axiosInstanceMain.put(`/userupdate/${id}`, formdata).then((res) => {
        dispatch(createData(res.data));
        dispatch(editDetailsData(res.data));

        // editDetailsData;
        enqueueSnackbar("User Updated Successfully", { variant: "success" });
        //   console.log(res.data);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      dispatch(setIsError());
    }
  };
// \end{code}
