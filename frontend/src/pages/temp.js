const students = [
  {
    id: 1,
    name: "John Doe",
    department: "Computer Science",
    level: "200",
    matric: "2017/123456",
  },
  {
    id: 2,
    name: "Jane skljf Doe",
    department: "Data Science",
  },
];

console.log(JSON.stringify(students[1]).includes("Science"));

const res = students.filter((student) => {
  return JSON.stringify(student).includes("Science");
});
console.log(res);
