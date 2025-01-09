import React, { useState } from "react";
import "./FormStyles.css";
import { useDispatch } from "react-redux";
import { postUserData } from "../Redux/action";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

export default function CreateUserList() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    language: "",
    address: "",
    message: "",
  });

  const roles = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "gs",
      label: "GS",
    },
    {
      value: "explorer",
      label: "Explorer",
    },
  ];

  const languages = [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Urdu", value: "urdu" },
    { label: "Gujarati", value: "gujarati" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postUserData(formData, enqueueSnackbar, navigate));
    // console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>User Form</h2>
        <div className="form-group">
          {/* <label htmlFor="name">Name:</label> */}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="email">Email:</label> */}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="phone">Phone:</label> */}
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="role">Role:</label> */}
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            {roles.map((role, index) => (
              <option key={index} value={role?.value}>
                {role?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          {/* <label htmlFor="language">Language:</label> */}
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Language
            </option>
            {languages.map((lang, index) => (
              <option key={index} value={lang.value}>
                {lang?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          {/* <label htmlFor="address">Address:</label> */}
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            rows="3"
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="message">Message:</label> */}
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="3"
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
