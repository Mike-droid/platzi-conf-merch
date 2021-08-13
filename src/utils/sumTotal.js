const handleSumTotal = (cart) => {
  const reducer = (accumulator, current) => accumulator + current.price;
  const sum = cart.reduce(reducer, 0);
  return sum;
}

export default handleSumTotal;