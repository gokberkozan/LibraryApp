import axios from "axios";

const BASE_URL =
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/bookborrowings";

export const getBookBorrowing = async() => {
    try {
        const { data } = await axios.get(BASE_URL);
        return data;
    } catch (error) {
        console.error("Error fetching book borrowings:", error);
        throw error;
    }
};

export const deleteBookBorrowing = async(id) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/${id}`);
        return data;
    } catch (error) {
        console.error(`Error deleting book borrowing with ID: ${id}`, error);
        throw error;
    }
};

export const createBookBorrowing = async(bookBorrowing) => {
    try {
        const { data } = await axios.post(BASE_URL, bookBorrowing);
        return data;
    } catch (error) {
        console.error("Error creating book borrowing:", error);
        throw error;
    }
};

export const updateBookBorrowing = async(bookBorrowing) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/${bookBorrowing.id}`, bookBorrowing);
        return data;
    } catch (error) {
        console.error(`Error updating book borrowing with ID: ${bookBorrowing.id}`, error);
    }
};