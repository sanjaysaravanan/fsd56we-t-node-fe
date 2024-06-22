// interact with the backend server to create, delete & read all the objects

const baseUrl = `${import.meta.env.VITE_BE_URL}/students`;

// 1. Read all students
async function getAllStudents() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching students:", error);
  }
}

// 2. Create a new student
async function createStudent(newStudent) {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating student:", error);
  }
}

// 3. Delete a single student
async function deleteStudent(studentId) {
  try {
    const response = await fetch(`${baseUrl}/${studentId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting student ID ${studentId}:`, error);
  }
}

export { getAllStudents, deleteStudent, createStudent };
