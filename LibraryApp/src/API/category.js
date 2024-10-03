import axios from "axios";

const BASE_URL =
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories";

export const getCategory = async() => {
    try {
        const { data } = await axios.get(BASE_URL);
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const deleteCategory = async(id) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/${id}`);
        return data;
    } catch (error) {
        console.error(`Error deleting category with ID: ${id}`, error);
    }
};

export const createCategory = async(category) => {
    try {
        const { data } = await axios.post(BASE_URL, category);
        return data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

export const updateCategory = async(category) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/${category.id}`, category);
        return data;
    } catch (error) {
        console.error(`Error updating category with ID: ${category.id}`, error);
        throw error;
    }
};