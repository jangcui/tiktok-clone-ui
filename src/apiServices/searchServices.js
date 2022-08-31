import * as request from '~/utils/request';
import axios from 'axios';

export const search = async (q, type = 'less') => {
  try {
    const res = await request.get('users/search', {
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
