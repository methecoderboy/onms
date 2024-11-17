const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const { format } = require("date-fns");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Admin = require("../models/admin");

const correctPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const createStudents = async (num) => {
  for (let i = 1; i <= num; i++) {
    const dob = faker.date.birthdate({ min: 19, max: 25, mode: "age" });
    const student = new Student({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      dob,
      rollnumber: faker.number.int({ min: 100000, max: 109999 }),
      department: faker.helpers.arrayElement([
        "CSE",
        "ECE",
        "EEE",
        "MECH",
        "CIVIL",
        "IT",
      ]),
      sememster: faker.number.int({ min: 1, max: 8 }),
      section: faker.helpers.arrayElement(["A", "B", "C", "D"]),
      password: format(dob, "dd/MM/yyyy").split("/").join(""),
      role: "student",
    });
    await student.save();
  }
};

const createTeachers = async (num) => {
  for (let i = 1; i <= num; i++) {
    const teacher = new Teacher({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      subject: faker.helpers.arrayElement([
        "Maths",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
      ]),
      password: "teacher",
      role: "teacher",
      position: faker.helpers.arrayElement([
        "HOD",
        "Lecturer",
        "Assistant",
        "Professor",
        "Principal",
      ]),
    });
    await teacher.save();
    console.log(`Teacher ${num} created`);
  }
};

const createAdmins = async (num) => {
  for (let i = 1; i <= num; i++) {
    const admin = new Admin({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "admin",
      role: "admin",
    });
    await admin.save();
    console.log(`Admin ${num} created`);
  }
};

module.exports = {
  correctPassword,
  createStudents,
  createTeachers,
  createAdmins,
};
