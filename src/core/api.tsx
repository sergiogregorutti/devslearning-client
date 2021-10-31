export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategory = (categoryId: String) => {
  return fetch(`${process.env.REACT_APP_API}/category/${categoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFilteredCourses = (
  skip: Number,
  limit: Number,
  filters = {}
) => {
  const data = {
    limit,
    skip,
    filters,
  };
  return fetch(`${process.env.REACT_APP_API}/courses/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
