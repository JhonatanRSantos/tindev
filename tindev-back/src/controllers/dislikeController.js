import Dev from "../models/dev";

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;        
        try {

            const loggedDev = await Dev.findById(user);
            const targetdev = await Dev.findById(devId);

            if(!targetdev) {
                return res.status(400).json({ error : "Dev not exists." });
            }
            
            loggedDev.dislikes.push(targetdev._id);
            await loggedDev.save();

            return res.json(loggedDev);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}