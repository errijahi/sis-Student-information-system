const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/Usermodels');
const Professor = require('../models/Professor');
const cors = require ('cors');
const app = express();
const bodyParser = require('body-parser');
const { authenticate } = require('passport');
const Assistance = require('../models/Assistance');
const Staff = require('../models/Staff');
const Student = require('../models/student');


app.use(cors());
app.use(bodyParser.json());


const signToken = userID => {
    return JWT.sign({
        iss: "NoobCoder",
        sub: userID
    }, "NoobCoder", { expiresIn: "1h" });
}

//User end nodes
userRouter.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        if (user)
            res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
        else {
            const newUser = new User({ username, password, role });
            newUser.save(err => {
                if (err)
                          res.status(500)
                    //  res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                else
                    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
            });
        }
    });
});

userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }

});

userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: "", role: "" }, success: true });
});

userRouter.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'admin') {
        res.status(200).json({ message: { msgBody: 'You are an admin', msgError: false } });
    }
    else
        res.status(403).json({ message: { msgBody: "You're not an admin,go away", msgError: true } });
});

userRouter.get('/users', passport.authenticate('jwt', { session: false }), (req, res, ) => {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
        }else{
            res.json({users, authenticate:true});
        }
    });
});

userRouter.get('/userr/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.params.id;
    Professor.findById(id, function(err, professors) {
        res.json(professors);
    });
});

userRouter.delete('/userdel/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.params.id;
    Professor.findByIdAndDelete(id, function(err, professors) {
        if(err) {
            res.status(400).send("error404");
        }else{
        res.send("deleted successufuly");
        };
    });
});

userRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
});
// Professor crud node
userRouter.post('/professor', passport.authenticate('jwt', { session: false }), (req, res) => {
    let professors = new Professor(req.body);
    professors.save()
        .then(professors => {
            res.status(200).json({'professors': ' added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding failed');
        });
});

userRouter.get('/professors', passport.authenticate('jwt', { session: false }), (req, res, ) => {
    Professor.find(function(err, professors) {
        if(err) {
            console.log(err);
        }else{
            res.json({professors, authenticate:true});
        }
    });
});

userRouter.get('/professor/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.params.id;
    Professor.findById(id, function(err, professors) {
        res.json(professors);
    });
});

userRouter.post('/professorup/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Professor.findById(req.params.id, function(err, professors) {
        if (!professors)
            res.status(404).send('data is not found ');
        else
            professors.Name = req.body.Name;
            professors.Family_name = req.body.Family_name;
            professors.Faculty = req.body.Faculty; 
            professors.Department = req.body.Department;
            professors.Subject  = req.body.Subject;
            professors.Address  = req.body.Address;
            professors.Phone_number  = req.body.Phone_number;
            professors.Email  = req.body.Email;
            professors.Jmbg  = req.body.Jmbg;

            professors.save().then(professors => {
                    res.json('updated');
            })
            .catch(err => {
                res.status(400).send("update not possibel ");
            });
            
    });
});

userRouter.delete('/professordel/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.params.id;
    Professor.findByIdAndDelete(id, function(err, professors) {
        if(err) {
            res.status(400).send("error404");
        }else{
        res.send("deleted successufuly");
        };
    });
});

// Assistance crud node
userRouter.post('/assistance', passport.authenticate('jwt', { session: false }), (req, res) => {
    let assistances = new Assistance(req.body);
    assistances.save()
        .then(assistances => {
            res.status(200).json({'assistances': ' added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding failed');
        });
});

userRouter.get('/assistances', passport.authenticate('jwt', { session: false }), (req, res, ) => {
    Assistance.find(function(err, assistances) {
        if(err) {
            console.log(err);
        }else{
            res.json({assistances, authenticate:true});
        }
    });
});

userRouter.get('/assistance/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.params.id;
    Assistance.findById(id, function(err, assistances) {
        res.json(assistances);
    });
});

userRouter.post('/assistanceup/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Assistance.findById(req.params.id, function(err, assistances) {
        if (!assistances)
            res.status(404).send('data is not found ');
        else
            assistances.Name = req.body.Name;
            assistances.Family_name = req.body.Family_name;
            assistances.Faculty = req.body.Faculty; 
            assistances.Department = req.body.Department;
            assistances.Subject  = req.body.Subject;
            assistances.Address  = req.body.Address;
            assistances.Phone_number  = req.body.Phone_number;
            assistances.Email  = req.body.Email;
            assistances.Jmbg  = req.body.Jmbg;

            assistances.save().then(assistances => {
                    res.json('updated');
            })
            .catch(err => {
                res.status(400).send("update not possibel ");
            });
            
    });
});

userRouter.delete('/assistancedel/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.params.id;
    Assistance.findByIdAndDelete(id, function(err, assistances) {
        if(err) {
            res.status(400).send("error404");
        }else{
        res.send("deleted successufuly");
        };
    });
});

// Staff crud node
userRouter.post('/staff', passport.authenticate('jwt', { session: false }), (req, res) => {
    let staffs = new Staff(req.body);
    staffs.save()
        .then(staffs => {
            res.status(200).json({'staffs': ' added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding failed');
        });
});

userRouter.get('/staffs', passport.authenticate('jwt', { session: false }), (req, res, ) => {
    Staff.find(function(err, staffs) {
        if(err) {
            console.log(err);
        }else{
            res.json({staffs, authenticate:true});
        }
    });
});

userRouter.get('/staff/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.params.id;
    Staff.findById(id, function(err, staffs) {
        res.json(staffs);
    });
});

userRouter.post('/staffup/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Staff.findById(req.params.id, function(err, staffs) {
        if (!staffs)
            res.status(404).send('data is not found ');
        else
            staffs.Name = req.body.Name;
            staffs.Family_name = req.body.Family_name;
            staffs.Position = req.body.Position;
            staffs.Address  = req.body.Address;
            staffs.Phone_number  = req.body.Phone_number;
            staffs.Email  = req.body.Email;
            staffs.Jmbg  = req.body.Jmbg;

            staffs.save().then(staffs => {
                    res.json('updated');
            })
            .catch(err => {
                res.status(400).send("update not possibel ");
            });
            
    });
});

userRouter.delete('/staffdel/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.params.id;
    Staff.findByIdAndDelete(id, function(err, staffs) {
        if(err) {
            res.status(400).send("error404");
        }else{
        res.send("deleted successufuly");
        };
    });
});

// Student crud node
userRouter.post('/student', passport.authenticate('jwt', { session: false }), (req, res) => {
    let student = new Student(req.body);
    student.save()
        .then(student => {
            res.status(200).json({'student': ' added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding failed');
        });
});

userRouter.get('/students', passport.authenticate('jwt', { session: false }), (req, res, ) => {
    Student.find(function(err, students) {
        if(err) {
            console.log(err);
        }else{
            res.json({students, authenticate:true});
        }
    });
});

userRouter.get('/student/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.params.id;
    Student.findById(id, function(err, students) {
        res.json(students);
    });
});

userRouter.post('/studentup/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Student.findById(req.params.id, function(err, students) {
        if (!students)
            res.status(404).send('data is not found ');
        else
            students.Name = req.body.Name;
            students.Family_name = req.body.Family_name;
            students.Faculty = req.body.Faculty; 
            students.Department = req.body.Department;
            students.Subject  = req.body.Subject;
            students.Study_program  = req.body.Study_program;
            students.Address  = req.body.Address;
            students.Phone_number  = req.body.Phone_number;
            students.Email  = req.body.Email;
            students.Jmbg  = req.body.Jmbg;

            students.save().then(students => {
                    res.json('updated');
            })
            .catch(err => {
                res.status(400).send("update not possibel ");
            });
            
    });
});

userRouter.delete('/studentdel/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let id = req.params.id;
    Student.findByIdAndDelete(id, function(err, students) {
        if(err) {
            res.status(400).send("error404");
        }else{
        res.send("deleted successufuly");
        };
    });
});


module.exports = userRouter;