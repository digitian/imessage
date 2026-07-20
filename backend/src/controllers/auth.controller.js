export async function checkAuth(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    res.status(200).json({ message: "User is authenticated", user: req.user });
}