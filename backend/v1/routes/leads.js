import express from "express";
import { CreateLead, GetLeads, CreateLeadTemp } from "../controllers/leads.js";
import { Verify, VerifyAdminRole } from "../middleware/verify.js";

const router = express.Router();

router.post("/create_lead", CreateLead);
router.post("/create_lead_temp", CreateLeadTemp);
router.get("/get_leads", Verify, VerifyAdminRole, GetLeads);
export default router;
