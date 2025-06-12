import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Function to register a car
export const registerCar = async (carData) => {
    return await api.post('/cars', carData);
};

// Function to register a driver
export const registerDriver = async (driverData) => {
    return await api.post('/drivers', driverData);
};

// Function to register a user
export const registerUser = async (userData) => {
    return await api.post('/users', userData);
};

export default api;