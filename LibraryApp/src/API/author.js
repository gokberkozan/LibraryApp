import axios from "axios";

const BASE_URL =
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors";

export const getAuthor = async() => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching authors:", error);
        throw error;
    }
};

export const deleteAuthor = async(id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting author with ID: ${id}`, error);
        throw error;
    }
};

export const createAuthor = async(author) => {
    try {
        const response = await axios.post(BASE_URL, author);
        return response.data;
    } catch (error) {
        console.error("Error creating author:", error);
    }
};

export const updateAuthor = async(author) => {
    try {
        const response = await axios.put(`${BASE_URL}/${author.id}`, author);
        return response.data;
    } catch (error) {
        console.error(`Error updating author with ID: ${author.id}`, error);
        throw error;
    }
};

export const searchAuthorByName = async(name) => {
    try {
        const response = await axios.get(`${BASE_URL}/searchByName`, {
            params: { name }
        });
        return response.data;
    } catch (error) {
        console.error(`Error searching author by name: ${name}`, error);
        throw error;
    }
};