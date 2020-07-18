const User = require('../models').User
const File = require('../models').File
const Dump = require('../models').Dump
const bcrypt = require('bcryptjs')
const { uuid } = require('uuidv4')
const csv = require('csv')
const fs = require('fs')
// const multer  = require('multer')
// const upload = multer({ dest: './public/uploads/' })

exports.login = async function login(req, res) {
    try {
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            req.session.loggedin = true;
            req.session.username = req.body.username;
            req.session.userId = user.uuid;
            res.user.lastLogin = new Date();
            res.user.save();
            const users = await User.findAll({
                attributes: {
                    exclude: ['password', 'uuid']
                }
            }) 
            // console.log(await User.findAll({
            //     raw: true,
            //     nest: true,
            //     attributes: {
            //         exclude: ['salt', 'password']
            //     }
            // }));
            res.render('users/home', {title: "Member's List", uuid: user.uuid, users: users});
        } else {
            res.render('index', {error: 'Wrong username or password!'});
        }			
        res.end();
    } catch (error) {
        res.render('users/error', {error: {message: 'User not found'}})
    }
}

exports.logout = function logout(req, res) {
    try {
        req.session.destroy();
        res.render('index', {error: 'You have logged out!'})
        res.end();
    } catch (error) {
        res.render('users/error', {error: error})
    }
}

exports.upload = function upload(req, res) {
    try {
        res.render('users/upload', {title: 'Upload CSV File'})
        res.end();
    } catch (error) {
        res.render('users/error', {error: error})
    }
}

exports.add = async function (req, res, next) {
    const file = new File({
        uuid: uuid(),
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        size: req.file.size,
        status: 0,
        uploadedBy: req.session.userId,
    })
    try {
    const newFile = await file.save()
    // console.log(newFile)
    
    const stream = fs.createReadStream('./public/uploads/'+req.file.filename)
    // console.log(uploaded.path)
    // let stream = fs.createReadStream("bezkoder.csv");
    const parser = csv.parse({
        delimiter: ',',
        columns: true
    })
    
    var transform = csv.transform(function(row) {
        if (row['FULL_NAME'].split(/\s+/).length === 3 || row['FULL_NAME'].split(/\s+/).length === 3) { 
            firstName = row['FULL_NAME'].split(/\s+/)[1]
            middleName = row['FULL_NAME'].split(/\s+/)[2]
            lastName = row['FULL_NAME'].split(/\s+/)[0]
        } else if (row['FULL_NAME'].split(/\s+/).length === 2 || row['FULL_NAME'].split(/\s+/).length === 2) {
            firstName = row['FULL_NAME'].split(/\s+/)[0]
            middleName = null
            lastName = row['FULL_NAME'].split(/\s+/)[1]
        } else if (row['FULL_NAME'].split(/\s+/).length === 1 || row['FULL_NAME'].split(/\s+/).length === 1) {
            firstName = row['FULL_NAME'].split(/\s+/)[0]
            middleName = null
            lastName = null
        } else {
            firstName = row['FULL_NAME']
            middleName = null
            lastName = null
        }
        var resultObj = {
            uuid: uuid(),
            memberNumber: row['MEMBER_NUMBER'],
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            transaction: row['ACTIVITY_DESCRIPTION'],
            amount: row['CURRENT_BALANCE'],
            fileName: req.file.filename,
            status: 0,
            createdBy: 1,
        }
        Dump.create(resultObj)
        .then(function() {
            console.log('Record created in the database')
        })
        .catch(function(err) {
            console.log('Error encountered: ' + err)
        })
    })
    
    stream.pipe(parser).pipe(transform)
    // const dumps = await Dump.findAll()
    // res.render('users/dump', {title: 'Uploaded Records', batch: req.file.filename, dumps: dumps})

    const page = req.query.page || 2;
    const limit = 10;
    const offset = 10;
    const dumps = await Dump.findAndCountAll({
        limit: limit,
        offset: (page - 1) * offset,
        order: [['id', 'ASC']],
        // where: { status: 0 },
    })
    // res.render('users/dump', {
    //     "dumps": dumps.rows,
    //     "pagesCount": Math.ceil(dumps.count/limit),
    //     "currentPage": page,
    // });
    res.redirect(302, '/users/dump')
    
} catch (error) {
        res.render('users/error', {error: error})
    }
}

exports.dump = async function (req, res, error) {
    const page = req.query.page || 1;
    const limit = 10;
    const offset = 10;

    try {
        const dumps = await Dump.findAndCountAll({
            limit: limit,
            offset: (page - 1) * offset,
            order: [['id', 'ASC']],
            // where: { status: 0 },
        })

        res.render('users/dump', {
            "dumps": dumps.rows,
            "pagesCount": Math.ceil(dumps.count/limit),
            "currentPage": page,
        })

    } catch (error) {
        res.render('users/error', {error: error})
    }
    
}