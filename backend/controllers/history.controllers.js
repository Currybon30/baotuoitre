import History from "../models/history.model";
import dbErrorHandler from "../helpers/dbErrorHandler";

const create = async (req, res) => {
    try {
        const history = await History.create(req.body);
        return res.status(200).json(history);
    }
    catch (err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        });
    }
}

export default { create };