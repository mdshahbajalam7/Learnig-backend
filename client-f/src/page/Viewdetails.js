import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { viewUserData } from "../Redux/action";
import "./Viewdetails.css";
export default function Viewdetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, view_details_data } = useSelector(
    (state) => state.userdate
  );
//   console.log(view_details_data);
  useEffect(() => {
    dispatch(viewUserData(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <div className="loader" />;
  }

  if (isError) {
    return <div className="error">Error loading user details!</div>;
  }

  if (!view_details_data?.user) {
    return <div className="error">No user data found!</div>;
  }

  const { name, email, phone, role, language, address, message, createdAt } =
    view_details_data?.user;

  return (
    <div className="view-details">
      <h2>User Details</h2>
      <div className="details-card">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p>
          <strong>Role:</strong> {role}
        </p>
        <p>
          <strong>Language:</strong> {language}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Message:</strong> {message}
        </p>
        <p>
          <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
