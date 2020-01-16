import axios from "axios";

export default async content => {
  return await axios.put(`/api/article/save`, content);
};
