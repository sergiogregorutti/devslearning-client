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

export const createCategoryEs = (token: String, category: any) => {
  return fetch(`${process.env.REACT_APP_API}/es/category/create/`, {
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

export const updateCategoryEs = (
  categoryId: String,
  token: String,
  category: any
) => {
  return fetch(`${process.env.REACT_APP_API}/es/category/${categoryId}`, {
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

export const deleteCategoryEs = (categoryId: String, token: String) => {
  return fetch(`${process.env.REACT_APP_API}/es/category/${categoryId}`, {
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

export const createCourseEs = (token: String, course: any) => {
  return fetch(`${process.env.REACT_APP_API}/es/course/create`, {
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

export const getCoursesEs = () => {
  return fetch(`${process.env.REACT_APP_API}/es/courses?limit=undefined`, {
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

export const getCourseEs = (courseId: String) => {
  return fetch(`${process.env.REACT_APP_API}/es/course/${courseId}`, {
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

export const updateCourseEs = (
  courseId: String,
  token: String,
  course: any
) => {
  return fetch(`${process.env.REACT_APP_API}/es/course/${courseId}`, {
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

export const deleteCourseEs = (courseId: String, token: String) => {
  return fetch(`${process.env.REACT_APP_API}/es/course/${courseId}/`, {
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
