const express = require('express');
const shortId = require('shortid');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db_conn = require('../db/db_conn');
const studentModel = require('../models/student');
const greivanceModel = require('../models/Greivance');
const router = express.Router();
const app = express();

const JWT_SECRET = ":) :( :D xD";


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Student registration route.
router.route('/student')
    .post(async (req, res) => {

        // Hashing password
        const hashPassword = await bcrypt.hash(req.body.Password, 10)
        req.body.Password = hashPassword;
        console.log(req.body);

        //Checking wheather email exist or not in DB.
        const emailExist = await studentModel.findOne({ "emailId": req.body.emailId });
        console.log(emailExist);
        if (emailExist) return res.status(400).send('Email already exist');

        // If not exist then create user.
        const student = new studentModel(req.body);
        let result = await student.save();

        console.log(result);
        return res.status(200).json({ 'message': 'user Registerd' });
        // res.send(result); 
    })

    .get(async (req, res) => {
        userId = req.query.id.replace("\"", "").replace("\"", "");

        let result = await studentModel.findOne({ _id: userId })
        if (result) return res.status(200).json(result)

        return res.status(400).json({ 'message': 'something went wrong!' });
    })

    .put(async (req, res) => {
        // console.log(req.body);

        let result = await studentModel.updateOne(
            {
                "_id": ObjectId(req.body._id)
            },
            {
                $set: {
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "Batch": req.body.Batch,
                    "rollNo": req.body.rollNo,
                    "emailId": req.body.emailId,
                    "contactNo": req.body.contactNo
                }
            }
        );

        return res.status(200).json({ 'message': 'profile has been updated.' });
    })


// Login route
router.route('/login')
    .post(async (req, res) => {
        const { emailId, Password } = req.body

        try {
            //Checking wheather email exist or not in DB.
            const user = await studentModel.findOne({ "emailId": emailId });
            // console.log(user.Password);
            if (!user) return res.status(400).send('invalid email Id');


            //Checking password.
            if (await bcrypt.compare(Password, user.Password)) {
                // Emial and pass is correct.

                let token = jwt.sign({
                    id: user._id,
                    email: user.emailId
                }, JWT_SECRET);

                // console.log(token);

                return res.status(200).json(token);

            }

        } catch (err) {
            console.log(err);
        }



        res.status(400).send('invalid Username/password')
    })

// Checking Authentication of user by using token
router.route('/auth')
    .post((req, res) => {
        token = req.body.token
        // console.log(req.body);

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ 'message': 'Invalid Token' });

            return res.status(200).json(decoded.id);
        });
    })


// Greivances.
router.route('/greivance')
    .get(async (req, res) => {
        try {
            userId = req.query.id.replace("\"", "").replace("\"", "");
            console.log(userId);
            const greivances = await greivanceModel.find({ _id: ObjectId(userId) });
            console.log(greivances);
            if (greivances.length == 0) {
                return res.status(400).send('no complaints yet');
            }

            return res.status(200).json(greivances);

        } catch (err) {
            console.log(err);
            return res.status(400).send({ 'message': 'something went wrong!' });
        }
        // console.log(greivances);
    })
    // Post Greivance.
    .post(async (req, res) => {

        try {

            // Checking wheather user have posted previous complaint or not.
            const complaintExist = await greivanceModel.findOne({ _id: req.body._id });
            console.log(complaintExist);
            if (!complaintExist) {
                console.log("inside complaint exist.");
                const greivanceData = {
                    _id: req.body._id,
                    complaint: [{
                        greivanceType: req.body.greivanceType,
                        Subject: req.body.Subject,
                        Description: req.body.Description
                    }]
                }
                const greivance = new greivanceModel(greivanceData);
                let result = await greivance.save();

                return res.status(200).json({ 'message': ' complaint registered successfully' });
            }
            else {

                const greivanceData = {
                    greivanceType: req.body.greivanceType,
                    Subject: req.body.Subject,
                    Description: req.body.Description
                }
                let result = await greivanceModel.updateOne({ _id: req.body._id }, { $push: { complaint: greivanceData } });
                return res.status(200).json({ 'message': ' complaint registered successfully' });

            }

        } catch (err) {
            console.log(err);
            return res.status(400).json({ 'message': 'something went wrong!' })
        }
    })

router.route('/greivance/changeStatus')
    .post(async (req, res) => {
        userId = req.body.userId.replace("\"", "").replace("\"", "");
        // console.log(userId);
        // console.log(req.body);

        if (req.body.Status == "Open") {

            let result = await greivanceModel.updateOne(
                {
                    _id: ObjectId(userId),
                    "complaint._id": req.body.complaintId
                },
                {
                    $set: {
                        "complaint.$.Status": "Closed"
                    }
                }
            )

            res.status(200).json({ 'message': 'status changed to Closed' });
        }
        else {
            let result = await greivanceModel.updateOne({
                _id: ObjectId(userId),
                "complaint._id": req.body.complaintId
            },
                {
                    $set: {
                        "complaint.$.Status": "Open"
                    }
                }
            )

            res.status(200).json({ 'message': 'status changed to Open' });

        }
    })

router.route('/changePassword')
    .put(async (req, res) => {
        console.log(req.body);
        const { id, newPassword, oldPassword } = req.body

        const user = await studentModel.findOne({ "_id": ObjectId(id) });

        if (await bcrypt.compare(oldPassword, user.Password)) {

            // Hashing updated password,
            const newhashPassword = await bcrypt.hash(newPassword, 10)

            // updating it to database.
            let result = await studentModel.updateOne(
                {
                    "_id": ObjectId(id)
                },
                {
                    $set: {
                        Password: newhashPassword
                    }
                }
            );

            console.log(result);
            return res.status(200).json({ 'message': 'Password Updated Successfully' });
        }
        else {
            return res.status(400).json({ 'message': 'Old password is wrong.' });
        }
    })

app.use(router);


app.listen(3000);