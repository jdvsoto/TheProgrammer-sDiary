import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { createPublication } from "./publications.controller.js";
import upload from "../middlewares/multerConfig.js";

const router = Router();

router.post('/newPublication', [
    validateJWT,
    // upload.single('img'),
    validateFields
], createPublication);

export default router;