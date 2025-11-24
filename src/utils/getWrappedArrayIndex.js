export const getWrappedArrayIndex = (arr = [], index = 0) => {
  const arrayLength = arr.length;
  return ((index % arrayLength) + arrayLength) % arrayLength;
};

export default getWrappedArrayIndex;
