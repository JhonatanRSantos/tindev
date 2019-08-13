import axios from "axios";
import Dev from "../models/dev";

module.exports = {
    async index(req, res) {
        const { user } = req.headers;
        const loggedDev = await Dev.findById(user);
        const users = await Dev.find({
            $and: [
                {_id : { $ne : user} },
                {_id : { $nin : loggedDev.likes}},
                {_id : { $nin : loggedDev.dislikes}}
            ]
        });
        return res.json(users);
    },
    async store(req, res) {
        const { username : user } = req.body;
        try {
            const userExists = await Dev.findOne({ user });
            if (userExists) return res.json(userExists);
            
            const response = await axios.get(`${process.env.GIT_USER_API}${user}`);
            const { name, bio, avatar_url: avatar } = response.data;
            const newDev = await Dev.create({
                name, user, bio, avatar
            });
            return res.json(newDev);
        } catch (error) {
            return res.json(error.message);
        }
    }
};