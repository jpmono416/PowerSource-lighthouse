import UserService from "../services/User.service.js";

export default class UserValidator {
    static validateUserRegistration = async (req, res, next) => {
        const { email, password, name } = req.body;

        // Validate name
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ message: "Name is required" });
        }
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            return res.status(400).json({ message: "Invalid name format" });
        }

        // Validate email
        if (!email || typeof email !== "string" || !email.trim()) {
            return res.status(400).json({ message: "Email is required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ( !emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate password
        if (!password || typeof password !== "string" || !password.trim()) {
            return res.status(400).json({ message: "Password is required" });
        }

        if ( password.length < 8) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Check if email already exists in the database
        try {
            const existingUser = await UserService.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email is already in use" });
            }
        } catch (error) {
            console.error("Internal server error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

        // If all validations pass
        next();
    };
}
