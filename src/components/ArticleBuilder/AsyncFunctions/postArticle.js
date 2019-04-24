import axios from "axios";

export default async content => {
  return await axios.post(`/api/article/post`, content);
};
