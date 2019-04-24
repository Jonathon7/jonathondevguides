import axios from "axios";

export default async articleTitle => {
  /**
   * @type {Array} - holds one article in the array
   */
  let response = await axios.get(`/api/article/${articleTitle}`);

  return response.data;
};
