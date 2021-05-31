export const updateObjectInArray = (items, itemId, objPropName, newObjProps) =>{
  return items.map((user) => {
    if (user[objPropName] === itemId) {
      return { ...user, ...newObjProps }
    }
    //Если Id не совпадает, возвращаем обьект без изменения.
    return user;
  })
};
