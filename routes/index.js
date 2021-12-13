var fs = require("fs");
var path = require("path");
var express = require('express');
var router = express.Router();

// data file
const PROFILE_PATH = path.join(__dirname, "../data/profile.json");
const SKILL_FILE_PATH = path.join(__dirname, "../data/skill.json");
const EDUCATION_FILE_PATH = path.join(__dirname, "../data/education.json");
const CAREER_FILE_PATH = path.join(__dirname, "../data/career.json");

router.get('/', function (req, res, next) {
    res.render("index", { title: `My Resume` });
});

router.get('/api/thumbnail/:name', function (req, res) {
    let filePath = path.join(__dirname, `../thumbnail/${req.params.name}.jpg`);

    res.sendFile(filePath);
})

router.get('/api/profile', function (req, res, next) {
    fs.readFile(PROFILE_PATH, "utf-8", function (err, result) {
        if (err) {
            res.status(500).json({
                success: false, 
                message: "Failed to get the profile.", 
                errcode: "GET_PROFILE_FAIL" 
            })
            return;
        }
        res.json(result);
    })
});

router.get('/api/skill', function (req, res, next) {
    fs.readFile(SKILL_FILE_PATH, "utf-8", function (err, result) {
        if (err) {
            res.status(500).json({
                success: false, 
                message: "Failed to get the skill file.", 
                errcode: "GET_SKILL_FILE_FAIL" 
            })
            return;
        }
        res.json(result);
    })
});

router.get('/api/education', function (req, res, next) {
    fs.readFile(EDUCATION_FILE_PATH, "utf-8", function (err, result) {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Failed to get the education file.",
                errcode: "GET_EDUCATION_FILE_FAIL"
            })
            return;
        }
        res.json(result);
    });
});

router.get('/api/career', function (req, res, next) {
    fs.readFile(CAREER_FILE_PATH, "utf-8", function (err, result) {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Failed to get the career file.",
                errcode: "GET_CAREER_FILE_FAIL"
            });
            return;
        }
        res.json(result);
    });
});

module.exports = router;