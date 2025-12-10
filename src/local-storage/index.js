export * from "./constants";

export const createLocalStorageInstance = (key = "") => {
  const get = () => localStorage.getItem(key);

  const set = (value = "") => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.log(
        `Something went wront while trying to save to localstorage for ${key}: ${err}`
      );
    }
  };

  return { get, set };
};

export default createLocalStorageInstance;
