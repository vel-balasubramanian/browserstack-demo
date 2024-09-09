import { UPDATE_SORT } from './actionTypes';

export const updateSort = sort => {
  if (sort === 'highestprice') {
  sort = '';
  }
  return {
    type: UPDATE_SORT,
    payload: sort
  };
};