import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { viewUserData, editUserData } from "../Redux/action";
import "./Edit.css";
import { useSnackbar } from "notistack";
export default function Usereditbyid() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, view_details_data } = useSelector(
    (state) => state.userdate
  );
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    language: "",
    address: "",
    message: "",
  });

  useEffect(() => {
    dispatch(viewUserData(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (view_details_data?.user) {
      setFormData({
        name: view_details_data.user.name || "",
        email: view_details_data.user.email || "",
        phone: view_details_data.user.phone || "",
        role: view_details_data.user.role || "",
        language: view_details_data.user.language || "",
        address: view_details_data.user.address || "",
        message: view_details_data.user.message || "",
      });
    }
  }, [view_details_data?.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUserData(id, formData, enqueueSnackbar));
    navigate("/"); // Navigate back to the list or another page after updating
  };

  if (isLoading) {
    return <div className="loader" />;
  }

  if (isError) {
    return <div className="error">Error loading user data!</div>;
  }

  return (
    <div className="edit-form-container">
      <h2>Edit User Details</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="explorer">Explorer</option>
            <option value="gs">GS</option>
          </select>
        </label>
        <label>
          Language:
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
            <option value="urdu">Urdu</option>
            <option value="gujarati">Gujarati</option>
          </select>
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
