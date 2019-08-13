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
            if(targetdev.likes.includes(loggedDev._id)) {
                const loggedSocket = req.connectedUsers[user];
                const targetSocket = req.connectedUsers[devId];
                if(loggedSocket){
                    req.socketIO.to(loggedSocket).emit("match", targetdev);
                }
                if(targetSocket){
                    req.socketIO.to(targetSocket).emit("match", loggedDev);
                }
            }
            loggedDev.likes.push(targetdev._id);
            await loggedDev.save();

            return res.json(loggedDev);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }
}