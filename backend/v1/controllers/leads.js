import Leads from "../models/Leads.js";
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../config/index.js";
import Trip from "../models/Trip.js";
import logger from "../logger.js";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

export async function CreateLead(req, res, next) {
  try {
    const leads = new Leads(req.body);
    const trip = await Trip.findOne({ trip_slug: req.body.slug });
    const savedLeads = await leads.save();
    let text = "New Lead \n\n";
    const email = req.body.leads[0].email;
    const name = req.body.leads[0].name;
    for (let i of req.body.leads) {
      text += `
      Name: ${i.name},
      Email: ${i.email},
      Phone: ${i.phone},
      Instagram Handle: ${i.instagram_handle}
      trip: ${req.body.trip_slug}
      `;
    }
    const mailOptions = {
      from: EMAIL,
      to: "anushrut@gosupersquad.com, akash@gosupersquad.com, utkarshkoushik007@gmail.com",
      subject: "New booking request",
      text: text,
    };
    const mailOptions2 = {
      from: EMAIL,
      to: email,
      subject: "Booking request received",
      text: `Hi ${name}, we have successfully recevied your booking request for trip ${trip.title}.\n\nWe will get back to you within 24 hours.\n\nSupersquad Team\nPhone:+91-8769322028\nWhatsApp: https://www.wa.link/y16qwu`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      } else {
        res.status(200).json({
          status: "success",
        });
      }
    });
    transporter.sendMail(mailOptions2, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      } else {
        res.status(200).json({
          status: "success",
        });
      }
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
}
export async function CreateLeadTemp(req, res, next) {
  try {
    logger.info(JSON.stringify(req.body, null, 2));
    const leads = new Leads(req.body);
    let whatsapp_number = 8769322028;
    const trip_name = encodeURIComponent(req.body.trip_slug);
    let whatsapp_link = `https://wa.me/918769322028?text=Hey,%20I%20have%20some%20queries%20regarding%20${trip_name}`;
    console.log(leads);
    const savedLeads = await leads.save();
    console.log(savedLeads);
    console.log(req.body);
    let text = "New Lead \n\n";
    const email = req.body.leads[0].email;
    const name = req.body.leads[0].name;
    for (let i of req.body.leads) {
      text += `
      Name: ${i.name},
      Email: ${i.email},
      Phone: ${i.phone},
      Instagram Handle: ${i.instagram_handle}
      Trip: ${req.body.trip_slug}
      `;
    }
    const mailOptions = {
      from: EMAIL,
      to: "anushrut@gosupersquad.com, akash@gosupersquad.com, utkarshkoushik007@gmail.com",
      subject: "New booking request",
      text: text,
    };
    const mailOptions2 = {
      from: EMAIL,
      to: email,
      subject: "Booking request received",
      html: `<p>Hi ${name}, we have successfully recevied your booking request for trip ${req.body.trip_slug}.</p><p>We will get back to you within 24 hours.</p>Supersquad Team<br>Phone: +91-${whatsapp_number}<br>WhatsApp: <a href="${whatsapp_link}">Chat with us</a>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      } else {
        res.status(200).json({
          status: "success",
        });
      }
    });
    transporter.sendMail(mailOptions2, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      } else {
        res.status(200).json({
          status: "success",
        });
      }
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
}

export async function GetLeads(req, res, next) {
  try {
    const leads = await Leads.find();
    res.status(200).json({
      leads,
    });
  } catch (err) {
    next(err);
  }
}
