import axios from "axios";

export default async status => {
  /**
   * @type {Array} holds array of articles
   */
  const response = await axios.get(`/api/articles/${status}`);

  return response.data;
};
