import axios from "axios";

export const create = ({ title, body, userId }) => {
  // return Promise.reject('The API is not available');
  return axios
    .post("https://jsonplaceholder.typicode.com/posts", { title, body, userId })
    .then((response) => {
      const { data } = response;
      return data;
    });
};

export const getAll = () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      const { data } = response;
      return data;
    });
};
