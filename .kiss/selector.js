import { createSelector } from 'reselect';

const getParam = (state, any) => any;
const getMemoizedSelect = state => state;

export const selectSomething = createSelector(
  [getMemoizedSelect, getParam],
  selected => {
    return selected;
  }
);

export default selectSomething;
