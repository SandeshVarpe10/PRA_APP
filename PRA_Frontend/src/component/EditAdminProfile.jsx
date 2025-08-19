import React, { useEffect, useState } from "react";
import service from "../service/service";
import { useParams, useNavigate } from "react-router-dom";
import "../css/EditAdminProfile.css";

function EditAdminProfile() {
  const { uid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    type: "admin",
  });

  const [photoFile, setPhotoFile] = useState(null); // new photo file
  const [photoPreview, setPhotoPreview] = useState(""); // for preview
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch admin data
  useEffect(() => {
    service.getAdminData(uid)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setFormData({
          name: data.name,
          email: data.email,
          password: data.password,
          age: data.age,
          type: data.type,
        });
        setPhotoPreview(data.photo || ""); // show current photo if exists
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [uid]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview("");
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("age", formData.age);
    data.append("type", formData.type);
    if (photoFile) data.append("photo", photoFile); // only append if new file

    service.updateAdminData(uid, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/adminDashboard");
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="edit-profile-container">
      <h2>Edit Admin Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Photo:</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              style={{ width: "120px", height: "120px", marginTop: "10px", borderRadius: "12px", objectFit: "cover", border: "2px solid #ff6ec7" }}
            />
          )}
        </div>

        <div className="form-group">
          <label>Type:</label>
          <input type="text" name="type" value={formData.type} disabled />
        </div>

        <button type="submit" className="btn-save">Save Changes</button>
      </form>
    </div>
  );
}

export default EditAdminProfile;
