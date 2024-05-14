import Press from '../models/qc.model.js';

const exportToExcelByMonth = async (req, res) => {
    try {
        // get the month from the request
        const month = parseInt(req.params.month);
        // get all presses
        const presses = await Press.aggregate([
            {
                $unwind: '$publishDates'
            },
            {
                $project: {
                    orderId: 1,
                    customerName: 1,
                    address: 1,
                    content: 1,
                    productType: 1,
                    size: 1,
                    publishMonth: { $toInt: { $dateToString: { format: "%m", date: "$publishDates" } } },
                    publishDates: 1,
                    quantity: 1,
                    pricePerUnit: 1,
                    total: 1
                }
            },
            {
                $match: {
                    publishMonth: month
                }
            },
            {
                $group: {
                    _id: '$_id', // Group by _id if it's a unique identifier, otherwise remove this line
                    orderId: { $first: '$orderId' },
                    customerName: { $first: '$customerName' },
                    address: { $first: '$address' },
                    content: { $first: '$content' },
                    productType: { $first: '$productType' },
                    size: { $first: '$size' },
                    publishDates: { $push: '$publishDates' },
                    quantity: { $sum: 1 }, // Calculate quantity by counting publishDates
                    totalPrice: { $sum: { $multiply: ['$pricePerUnit', 1] } } // Calculate total price
                }
            },
            {
                $sort: { orderId: 1 }
            }
        ]);        
        return res.json(presses);
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    } 
}

const exportToExcelByPage = async (req, res) => {
    try {
        const month = parseInt(req.params.month);
        const presses = await Press.aggregate([
            {
                $unwind: '$publishDates'
            },
            {
                $match: {
                    productType: 'MT',
                    $expr: {
                        $eq: [{ $month: "$publishDates" }, month] 
                    }
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$publishDates" },
                    date: { $first: "$publishDates" },
                    sumOfSize: { $sum: "$size" },
                    sumOfTotal: {$sum: "$pricePerUnit"}
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);  
        return res.json(presses);      
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const exportToExcelByDay = async (req, res) => {
    try {
        const day = parseInt(req.params.day);
        const month = parseInt(req.params.month);
        const presses = await Press.aggregate([
            {
                $unwind: '$publishDates'
            },
            {
                $match: {
                    productType: 'MT',
                    $expr: {
                        $and: [
                            { $eq: [{ $dayOfMonth: "$publishDates" }, day] },
                            { $eq: [{ $month: "$publishDates" }, month] }
                        ]
                    }
                }
            },
            {
                $project: {
                    orderId: 1,
                    customerName: 1,
                    size: 1,
                    pricePerUnit: 1
                }
            }
        ]);
        return res.json(presses);
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

export default { exportToExcelByMonth, exportToExcelByPage, exportToExcelByDay };