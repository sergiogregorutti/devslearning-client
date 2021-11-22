export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategoriesEs = () => {
  return fetch(`${process.env.REACT_APP_API}/es/categories`, {
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

export const getCategoryEs = (categoryId: String) => {
  return fetch(`${process.env.REACT_APP_API}/es/category/${categoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFilteredCourses = (
  page: Number,
  size: Number,
  filters = {},
  sortBy: String = "price",
  order: String = "desc"
) => {
  const data = {
    page,
    size,
    filters,
    sortBy,
    order,
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

export const getFilteredCoursesEs = (
  page: Number,
  size: Number,
  filters = {},
  sortBy: String = "price",
  order: String = "desc"
) => {
  const data = {
    page,
    size,
    filters,
    sortBy,
    order,
  };
  return fetch(`${process.env.REACT_APP_API}/es/courses/by/search`, {
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
