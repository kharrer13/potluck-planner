function canEat(user, item) {
  const labels = [
    'isVegan',
    'isVegetarian',
    'isMilkFree',
    'isEggFree',
    'isPeanutFree',
    'isTreenutFree',
    'isFishFree',
    'isShellfishFree',
    'isSoyFree',
    'isWheatFree',
    'isGlutenFree'
  ];
  const userCond = labels.map(e => user[e]);
  const itemCond = labels.map(e => item[e]);
  if (itemCond.every(e => e)) {
    return true;
  }
  if (userCond.every(e => !e)) {
    return true;
  }
// this below is terrible but works
  return labels.every(e => {
    if (!user[e]) {
      return true;
    } else {
      return item[e];
    }
  });
}
export default canEat;
