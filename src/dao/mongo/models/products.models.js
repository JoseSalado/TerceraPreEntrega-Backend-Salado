import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products';

const productSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: String,
    code: {
        type: String,
        unique: true
    },
    price: Number,
    status: {
        type: Boolean,
        default: true
    },
    stock: Number,
    category: String,
    thumbnails: [String]
})

productSchema.plugin(mongoosePaginate)

const Products = mongoose.model(productsCollection, productSchema)

export default Products