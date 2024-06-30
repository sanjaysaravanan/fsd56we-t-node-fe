import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent, deleteStudent, getAllStudents } from "../apis";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    image: "",
    teacherId: "",
  });

  const navigate = useNavigate();

  const loadStudents = async () => {
    try {
      const { students } = await getAllStudents();

      setStudents(students);
    } catch (e) {
      console.log("################################", e);
      if (e.message === "Unauthorized") {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const removeStudent = async (stuId) => {
    await deleteStudent(stuId);
    setStudents(students.filter((stu) => stu.id !== stuId));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      name: formData.name,
      class: formData.class,
      image: formData.image || "https://via.placeholder.com/150",
      teacherId: formData.teacherId,
    };

    await createStudent(newStudent);

    setStudents([...students, newStudent]);
    setFormData({ name: "", class: "", image: "", teacherId: "" });
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Add a New Student</h2>
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
        <div className="form-group">
          <label htmlFor="teacherId">Teacher ID</label>
          <input
            type="number"
            className="form-control"
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Student
        </button>
      </form>

      <div className="row mt-4">
        {students.map((student) => (
          <div className="col-md-4 mb-4" key={student.id}>
            <div className="card">
              <img
                src={student.image}
                className="card-img-top"
                alt={student.name}
              />
              <div className="card-body">
                <h5 className="card-title">{student.name}</h5>
                <p className="card-text">Class: {student.class}</p>
                <p className="card-text">Teacher ID: {student.teacherId}</p>
                <i
                  role="button"
                  onClick={() => removeStudent(student.id)}
                  className="fa-solid fa-trash fa-2x"
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
