export const dialogSelector = (state, id) => {
  if (state.dialogs[id]) {
    const array = [...state.dialogs[id]];
    return array.map((x) => {
      const user = state.dialogList.find(y => y.id === x.senderId);
      return {
        ...x,
        pictureUrl: user.pictureUrl,
        name: user.name
      };
    });
  }
  return [];
};
