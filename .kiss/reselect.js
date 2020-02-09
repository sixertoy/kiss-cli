import createCachedSelector from 're-reselect';

const getSomethingFromState = state => state;
const getIdFromProps = (state, id) => id;

function expensiveComputation(something, id) {}

const selectSomethingById = createCachedSelector(
  getSomethingFromState,
  getIdFromProps,
  (something, id) => expensiveComputation(something, id)
)((_, id) => id);

export default selectSomethingById;
