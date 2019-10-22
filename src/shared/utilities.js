// updateObject
// used to update an object immutably (e.g. redux store)

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};
