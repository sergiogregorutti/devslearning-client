export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
