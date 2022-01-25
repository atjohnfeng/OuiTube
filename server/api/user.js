module.exports = async (req, res) => {
    if (req.method === "GET") {
        const users = "hello";
        res.status(200).json({ users });
    } else {
        res.status(404).json({ status: "Error route note found" });
    }
};