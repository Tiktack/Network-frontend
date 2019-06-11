export const dialogSelector = (state, id) => {
  if (state.dialogs[id]) return state.dialogs[id];
  return [];
};
