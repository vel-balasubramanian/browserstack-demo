import { UPDATE_FILTER } from './actionTypes';

export const updateFilters = filters => ({
  type: UPDATE_FILTER,
  // Bug: Filter does not work for OnePlus
  payload: filters.filter(filter => filter !== 'OnePlus')
});
