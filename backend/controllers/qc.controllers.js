import Press from '../models/qc.model.js';
import errorHandler from '../helpers/dbErrorHandler.js';

const create = async (req, res) => {
    try {
        const press = await Press.create(req.body);
        return res.status(200).json(press);
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const listAll = async (req, res) => {
    try {
        let presses = await Press.find();
        return res.json(presses);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const findById = async (req, res, next, id) => {
    try {
        let press = await Press.findById(id);
        if (!press)
            return res.status('400').json({
                error: "Press not found"
            });
        req.press = press;
        next();
    }
    catch (err) {
        return res.status('400').json({
            error: "Could not retrieve press"
        });
    }   
}

const findByName = async (req, res) => {
    try {
        let presses = await Press.find({customerName: req.params.customerName});
        return res.json(presses);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const read = (req, res) => {
    return res.json(req.press);
}

const update = async (req, res) => {
    try {
        let press = req.press;
        press = Object.assign(press, req.body);
        await press.save();
        return res.json(press);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const remove = async (req, res) => {
    try {
        let press = req.press;
        let deletedPress = await press.deleteOne();
        return res.json(deletedPress);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}


export default {
    create,
    listAll,
    findById,
    read,
    findByName,
    update,
    remove
}



