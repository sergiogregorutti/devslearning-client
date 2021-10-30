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

export const createCategory = (token: String, category: any) => {
  return fetch(`${process.env.REACT_APP_API}/category/create/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: category,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateCategory = (
  categoryId: String,
  token: String,
  category: any
) => {
  return fetch(`${process.env.REACT_APP_API}/category/${categoryId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: category,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteCategory = (categoryId: String, token: String) => {
  return fetch(`${process.env.REACT_APP_API}/category/${categoryId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createCourse = (token: String, course: any) => {
  return fetch(`${process.env.REACT_APP_API}/course/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: course,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCourses = () => {
  return fetch(`${process.env.REACT_APP_API}/courses?limit=undefined`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCourse = (courseId: String) => {
  return fetch(`${process.env.REACT_APP_API}/course/${courseId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateCourse = (courseId: String, token: String, course: any) => {
  return fetch(`${process.env.REACT_APP_API}/course/${courseId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: course,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteCourse = (courseId: String, token: String) => {
  return fetch(`${process.env.REACT_APP_API}/course/${courseId}/`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
