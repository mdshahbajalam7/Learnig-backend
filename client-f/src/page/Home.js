import React, { useEffect } from "react";
import "./CommonCss.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserData, getUserdata } from "../Redux/action";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, UserData } = useSelector(
    (state) => state.userdate
  );
  const { enqueueSnackbar } = useSnackbar();
  // const

  useEffect(() => {
    dispatch(getUserdata());
  }, [dispatch]);

  // Delete User Data
  const handleDelete = (id) => {
    dispatch(deleteUserData(id, enqueueSnackbar));
  };
  // Edit User
  const handleEdit = (id) => {
    navigate(`/user-edit-paege/${id}`);
  };
  // View User
  const handleView = (id) => {
    navigate(`/view-details/${id}`);
  };

  if (UserData?.user) {
    return <div className="error">No user data found!</div>;
  }
  return (
    <div className="home">
      {isLoading ? (
        <div className="loader" />
      ) : isError ? (
        <div className="error">Error</div>
      ) : (
        <div className="user-grid">
          {UserData?.users?.map((item) => (
            <div key={item.id} className="user-card">
              <h3>{item.name}</h3>
              <div className="button-group">
                <button onClick={() => handleView(item?._id)}>View</button>
                <button onClick={() => handleEdit(item._id)}>Edit</button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="delete"
                >
                  Delete
                </button>
              </div>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Phone:</strong> {item.phone}
              </p>
              <p>
                <strong>Role:</strong> {item.role}
              </p>
              <p>
                <strong>Language:</strong> {item.language}
              </p>
              <p>
                <strong>Address:</strong> {item.address}
              </p>
              <p>
                <strong>Message:</strong> {item.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
