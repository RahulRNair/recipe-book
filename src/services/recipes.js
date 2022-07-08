import axios from "axios";
const api_host = "https://www.themealdb.com/api/json/v1/1/"; // API HOST NAME

/**
 *
 * @returns The api result for all the categories
 */
export function get_categories() {
  return axios
    .get(`${api_host}categories.php`)
    .then((res) => {
      return res;
    });
}
/**
 *
 * @returns The api result for list of all receipe of a category
 */
 export function get_receipe_by_category(category) {
  return axios
    .get(`${api_host}filter.php?c=${category}`)
    .then((res) => {
      return res;
    });
}
/**
 *
 * @returns The api results receipe details of a particular receipe
 */
 export function get_receipe_details(recipe_id) {
  return axios
    .get(`${api_host}lookup.php?i=${recipe_id}`)
    .then((res) => {
      return res;
    });
}

