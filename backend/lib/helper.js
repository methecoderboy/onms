const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const { format } = require("date-fns");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Admin = require("../models/admin");

const correctPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const students = [
  {
    name: "Aftab Alam",
    email: "aftabalam@gmail.com",
    dob: "2003-03-13",
    rollnumber: 13000122089,
    department: "CSE",
    semester: 5,
    section: "B",
    password: "13032003",
    role: "student",
  },
  {
    name: "Arman Munshi",
    email: "armanmunshi@gmail.com",
    dob: "2003-05-11",
    rollnumber: 13000122066,
    department: "CSE",
    semester: 5,
    section: "B",
    password: "11052003",
    role: "student",
  },
  {
    name: "Amarjeet Anand",
    email: "amarjeetanand123@gmail.com",
    dob: "2003-06-15",
    rollnumber: 13000122063,
    department: "CSE",
    semester: 5,
    section: "B",
    password: "15062003",
    role: "student",
  },
];

const createStudents = async () => {
  students.forEach(async (student) => {
    const newStudent = new Student({
      name: student.name,
      email: student.email,
      dob: new Date(student.dob),
      rollnumber: student.rollnumber,
      department: student.department,
      semester: student.semester,
      section: student.section,
      password: student.password,
      role: student.role,
    });
    await newStudent.save();
  });
  console.log(`Students created`);
};

const teachers = [
  {
    name: "Rohit Sharma",
    email: "rohitsharma45@gmail.com",
    subject: "Maths",
    password: "teacher",
    role: "teacher",
    position: "HOD",
  },
  {
    name: "Manish Singh",
    email: "manishsingh09@gmail.com",
    subject: "Physics",
    password: "teacher",
    role: "teacher",
    position: "Lecturer",
  },
  {
    name: "Amit Kumar",
    email: "amitkumar12@gmail.com",
    subject: "Chemistry",
    password: "teacher",
    role: "teacher",
    position: "Professor",
  },
];

const createTeachers = async () => {
  teachers.forEach(async (teacher) => {
    const newTeacher = new Teacher({
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
      password: teacher.password,
      role: teacher.role,
      position: teacher.position,
    });
    await newTeacher.save();
  });
};

const createAdmins = async (num) => {
  const admin = new Admin({
    name: "Aftab Alam",
    email: "aftabalamdlm@gmail.com",
    password: "admin",
    role: "admin",
  });
  await admin.save();
  console.log(`Admin ${num} created`);
};

module.exports = {
  correctPassword,
  createStudents,
  createTeachers,
  createAdmins,
};
