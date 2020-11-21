const router = require('express').Router();
const Student = require('../db/models/student')

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.sendStatus(404)
    } else {
      res.send(student);
    }
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
    res.status(201).json(newStudent)
  } catch (error) {
    next(error)
  }
})

// router.put("/:id", async (req, res, next) => {
//   try {
//     let currentStudent = await Student.findByPk(req.params.id);
//     currentStudent.firstName = req.body.firstName;
//     currentStudent.lastName = req.body.lastName;
//     currentStudent.email = req.body.email;
//     currentStudent.save();
//     res.status(200).json(currentStudent)
//   } catch (error) {
//     next(error)
//   }
// })

// a better way to do the above using returning + destructing of code
// router.put("/:id", async (req, res, next) => {
//   try {
//     const [num, student] = await Student.update(req.body, {
//       returning: true,
//       where: {
//         id: req.params.id
//       }
//     })
//     restart.status(200).json(student)
//   } catch (error) {

//   }
// })

router.delete("/:id", async (req, res, next) => {
  try {
    let currentStudent = await Student.findByPk(req.params.id);
    currentStudent.destroy();
    res.status(204).json("Deleted")
  } catch (error) {
    next(error)
  }
})

module.exports = router;

