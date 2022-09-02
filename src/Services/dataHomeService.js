import * as httpRequest from '~/utils/httpRequest';

export const getSuggested = async ({ type = 'for-you', page }) => {
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
