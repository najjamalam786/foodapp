
import Week from "../models/weekModel.js";


// add weeks .post('/week', getWeek)
export const getWeek = async (req, res, next) => {
    
    const weekData = req.body;

    try {
        
        
        const response = await Week.find();
        res.status(201).json(response);
    } catch (error) {
        next(error)
        
    }
    
}


// // add weeks .post('/week', getWeek)
// export const addWeek = async (req, res, next) => {
    
//     const weekData = req.body;

//     try {
        
        
//         const response = await Week.findOneAndUpdate({index: weekData.index},{$push: {week: weekData.week}},{new: true} );
//         res.status(201).json(response);
//     } catch (error) {
//         next(error)
        
//     }
    
// }