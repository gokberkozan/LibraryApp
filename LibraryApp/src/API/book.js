import axios from "axios";

const BASE_URL =
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/books";

export const getBook = async() => {
    try {
        const { data } = await axios.get(BASE_URL);
        return data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

export const deleteBook = async(id) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/${id}`);
        return data;
    } catch (error) {
        console.error(`Error deleting book with ID: ${id}`, error);
        throw error;
    }
};

export const createBook = async(book) => {
    try {
        const { data } = await axios.post(BASE_URL, book);
        return data;
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
};

export const updateBook = async(book) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/${book.id}`, book);
        return data;
    } catch (error) {
        console.error(`Error updating book with ID: ${book.id}`, error);
        throw error;
    }
};