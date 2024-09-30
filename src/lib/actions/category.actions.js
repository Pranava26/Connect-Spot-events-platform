"use server";

import { connectToDatabase } from "../../../lib/database";
import Category from "../../../lib/database/models/category.model";

export const createCategory = async ({categoryName}) => {
    try {
        await connectToDatabase();

        const newCategory = await Category.create({name: categoryName});
        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllCategories = async () => {
    try {
        await connectToDatabase();

        const categories = await Category.find();
        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        throw new Error(error);
    }
}