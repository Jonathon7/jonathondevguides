import axios from "axios";

export default async wordsToSearch => {
  /**
   * @type {Array} holds array of search results
   */
  let response = await axios.get(
    `/api/articles/search/results/${wordsToSearch}`
  );

  return response.data;
};
