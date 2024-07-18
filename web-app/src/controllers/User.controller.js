import UserService from "../services/User.service.js";

export default class UserController {
    // Details
    static createUser = async (req, res) => {
        try {
            if (!req.body) return res.status(400).json({ error: "Invalid user" });

            const { user, token } = await UserService.createUser(req.body);

            res.status(201).json({ user, token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static getUserByEmail = async (req, res) => {
        try {
            if (!req.params) return res.status(400).json({ error: "Invalid email" });
            const user = await UserService.getUserByEmail(req.params.email);
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static getUserById = async (req, res) => {
        try {
            if (!req.params) return res.status(400).json({ error: "Invalid user ID" });
            const user = await UserService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Credentials
    static loginUser = async (req, res) => {
        try {
            if (!req.body.email || !req.body.password)
                return res.status(400).json({ error: "Invalid email or password" });

            const user = await UserService.loginUser(req.body.email, req.body.password);
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static changePassword = async (req, res) => {
        try {
            if (!req.body || !req.body.email || !req.body.password || !req.body.newPassword)
                return res
                    .status(400)
                    .json({ error: "Invalid email, old password or new password" });

            const user = await UserService.changePassword(
                req.body.email,
                req.body.password,
                req.body.newPassword
            );
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Roles
    static getRoles = async (req, res) => {
        try {
            const roles = await UserService.getRoles();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static addRole = async (req, res) => {
        try {
            if (!req.body.email || !req.body.role)
                return res.status(400).json({ error: "Invalid email or role" });

            const user = await UserService.addRole(req.body.email, req.body.role);
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static removeRole = async (req, res) => {
        try {
            if (!req.body.email || !req.body.role)
                return res.status(400).json({ error: "Invalid email or role" });

            const user = await UserService.removeRole(req.body.email, req.body.role);
            if (!user) return res.status(404).json({ error: "User not found" });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
