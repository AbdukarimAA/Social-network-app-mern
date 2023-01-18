import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async (email: string, password: string, firstName: string, lastName: string, picturePath: string, location: string, occupation: string) => {
    const { data } = await $host.post('auth/registration', {
        email,
        password,
        firstName,
        lastName,
        picturePath,
        location,
        occupation,
    });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const login = async (email: string, password: string) => {
    const { data } = await $host.post('auth/login', {
        email,
        password,
    });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const getUserHandle = async (userId: string) => {
   const {data} = await $host.get(`user/getUser/${userId}`, {
       headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
   });
   return jwt_decode(data.token);
};

