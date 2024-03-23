import Item from "../models/itemModel.js";




export const createItems = async (req, res, next) => {
    const item = req.body;
    const newItem = new Item(item);
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

export const getItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};

export const getItem = async (req, res, next) => {
    const id = req.params.id;
    try {
        const item = await Item.findById(id);
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};



export const deleteItem = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Item.findByIdAndDelete(id);
        res.status(200).json("Successfully deleted");
    } catch (error) {
        next(error);
    }
};

export const updateItem = async (req, res, next) => {
    const id = req.params.id;
    const item = req.body;
    try {
        await Item.findByIdAndUpdate(id, item, { new: true });
        res.status(200).json("Successfully updated");
    } catch (error) {
        next(error)
    }
}

// export const addItemToCart = async (req, res, next) => {
//     const item = req.body;
//     const cart = new Cart(item);
//     try {
//         await cart.save();
//         res.status(201).json(cart);
//     } catch (error) {
//         next(error);
//     }

// }