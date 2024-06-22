import { useState } from "react";

const initialTeachers = [
  {
    id: 1,
    name: "John Doe",
    class: "Math",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    class: "Science",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Michael Brown",
    class: "History",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Emily Johnson",
    class: "English",
    image: "https://via.placeholder.com/150",
  },
];

const Teachers = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [formData, setFormData] = useState({ name: "", class: "", image: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: teachers.length + 1,
      name: formData.name,
      class: formData.class,
      image: formData.image || "https://via.placeholder.com/150",
    };
    setTeachers([...teachers, newTeacher]);
    setFormData({ name: "", class: "", image: "" });
  };

  return (
    <div className="container mt-4">
      <h2>Add a New Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="class">Class</label>
          <input
            type="text"
            className="form-control"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Teacher
        </button>
      </form>

      <div className="row mt-4">
        {teachers.map((teacher) => (
          <div className="col-md-4 mb-4" key={teacher.id}>
            <div className="card">
              <img
                src={teacher.image}
                className="card-img-top"
                alt={teacher.name}
              />
              <div className="card-body">
                <h5 className="card-title">{teacher.name}</h5>
                <p className="card-text">Class: {teacher.class}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
