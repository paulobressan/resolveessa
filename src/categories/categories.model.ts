import * as mongoose from 'mongoose'

export interface SubCategory extends mongoose.Document {
    name: string;
    description: string;
    urlImage: string;
}

export interface Category extends mongoose.Document {
    name: string;
    description: string;
    urlImage: string;
    subCategories: SubCategory[];
}

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name sub category is required'],
        maxlength: [250, 'name sub category limit exceeded 250 characters'],
        minlength: [3, 'name sub category limit min 3 characters'],
    },
    description: {
        type: String,
        maxlength: [500, 'description limit exceeded 500 characters']
    },
    urlImage: {
        type: String,
        maxlength: [500, 'urlImage limit exceeded 500 characters']
    }
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name category is required'],
        maxlength: [250, 'name category limit exceeded 250 characters'],
        minlength: [3, 'name category limit min 3 characters'],
    },
    description: {
        type: String,
        maxlength: [500, 'description limit exceeded 500 characters']
    },
    urlImage: {
        type: String,
        maxlength: [500, 'urlImage limit exceeded 500 characters']
    },
    subCategories: {
        type: [subCategorySchema],
        select: false,
        required: false,
        default: []
    }
});

export const Category = mongoose.model<Category>('Category', categorySchema);