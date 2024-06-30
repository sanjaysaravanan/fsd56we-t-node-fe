// interact with the backend server to create, delete & read all the objects

const baseUrl = `${import.meta.env.VITE_BE_URL}`;

// 1. Read all students
async function getAllStudents() {
  try {
    const response = await fetch(`${baseUrl}/students`, {
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    });
    if (response.status === 401) {
      throw new Error("401");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching students:", error);

    if (error.message === "401") {
      throw new Error("Unauthorized");
    }
  }
}

// 2. Create a new student
async function createStudent(newStudent) {
  try {
    const response = await fetch(`${baseUrl}/students`, {
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
    const response = await fetch(`${baseUrl}/students/${studentId}`, {
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

// authentication related APIs
const registerUser = async (userDetails) => {
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`Error While Registering the User`, err);
  }
  return undefined; // return undefined
};

const loginUser = async (userCreds) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCreds),
  });
  if (response.status === 401 || response.status === 400) {
    const { msg } = await response.json();
    throw new Error(msg);
  }
  return await response.json();
};

async function getAllTeachers() {
  try {
    const response = await fetch(`${baseUrl}/teachers`, {
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    });
    if (response.status === 401) {
      throw new Error("401");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching teachers:", error);
    if (error.message === "401") {
      throw new Error("Unauthorized");
    }
  }
}

export {
  getAllStudents,
  deleteStudent,
  createStudent,
  registerUser,
  loginUser,
  getAllTeachers,
};
