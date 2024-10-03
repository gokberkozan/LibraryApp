import axios from "axios";

const BASE_URL =
    import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers";

export const getPublisher = async() => {
    try {
        const { data } = await axios.get(BASE_URL);
        return data;
    } catch (error) {
        console.error("Error fetching publishers:", error);
        throw error;
    }
};

export const deletePublisher = async(id) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/${id}`);
        return data;
    } catch (error) {
        console.error(`Error deleting publisher with ID: ${id}`, error);
        throw error;
    }
};

export const createPublisher = async(publisher) => {
    try {
        const { data } = await axios.post(BASE_URL, publisher);
        return data;
    } catch (error) {
        console.error("Error creating publisher:", error);
        throw error;
    }
};

export const updatePublisher = async(publisher) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/${publisher.id}`, publisher);
        return data;
    } catch (error) {
        console.error(`Error updating publisher with ID: ${publisher.id}`, error);
        throw error;
    }
};