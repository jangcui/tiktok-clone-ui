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
