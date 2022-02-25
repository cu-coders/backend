"use strict";
const sanitizer = require("mongo-sanitize");
const Project = require("../models/message");
const mailer = require("./mailer");
//--------------------------------END OF
//IMPORTS---------------------------------------//
exports.insertProject = async (req, res) => {
    const name = sanitizer(req.body.name);
    const email = sanitizer(req.body.email);
    const description = sanitizer(req.body.description);
    try {
        const project = new Project({
            name,
            email,
            description,
        });
        await mailer.sendAck(project.email, project.name, project.description);
        await project.save();
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
};

