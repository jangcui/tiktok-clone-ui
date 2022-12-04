import * as httpRequest from '~/utils/httpRequest';

export const getVideoList = async ({ type = 'for-you', page }) => {
    try {
        const res = await httpRequest.get('videos', {
            params: {
                type,
                page: page,
            },
        });
        return res.data;
    } catch (error) {
        console.log('lỡi');
    }
};
export const getSuggested = async ({ page, perPage }) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log('lỡi');
    }
};
export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log('lỡi');
    }
};
export const register = async ({ type = 'email', email, password }) => {
    try {
        const res = await httpRequest.post('auth/register', {
            type,
            email: `${email}@gmail.com`,
            password: password,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const login = async ({ email, password }) => {
    try {
        const res = await httpRequest.post('auth/login', {
            email: `${email}@gmail.com`,
            password: password,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getAnUser = async (pathName) => {
    try {
        const res = await httpRequest.get(`users${pathName}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const followUser = async (id) => {
    try {
        const res = await httpRequest.post(`users/${id}/follow`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const unFollowUser = async (id) => {
    try {
        const res = await httpRequest.post(`users/${id}/unfollow`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
