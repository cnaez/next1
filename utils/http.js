import * as axios from "axios";

// const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function http(token = "") {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  // set headers
  instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  instance.defaults.headers.common["Accept"] = "application/json";
  instance.defaults.headers.common["Access-Control-Allow-Origin"] =
    "application/x-www-form-urlencoded";
  instance.defaults.headers.common["Content-Type"] = "application/json";
  instance.defaults.headers.common["Access-Control-Allow-Headers"] =
    "Origin, X-Requested-With, Content-Type, Accept";

  /* --------------------- axios instance ----------------------- */

  // Add a request interceptor
  instance.interceptors.request.use(
    async function (config) {
      // ****
      // set Token in Storage
      // *****
      // const _token = await localStorage.setItem("token");
      // if (_token)
      config.headers.Authorization = "Bearer " + token;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      if (response?.data?.status != true) {
        errors_handler(response);
      }
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  /* --------------------- axios instance errors ----------------------- */
  function errors_handler(error) {
    if (error?.data?.message && error?.data.success == false) {
      // error_display(error, error?.data?.message);
      return;
    }

    if (!error && !error.response && !error.response.data) {
      return;
    }
    let current_error = error?.response?.data;
    let current_error_status = error?.response?.status;
    let current_error_message = current_error?.message;

    switch (current_error_status) {
      case 200:
        //bad request
        error_display(current_error, current_error_message);
        break;
      case 400:
        //bad request
        error_display(current_error, current_error_message);
        break;
      case 401:
        //unauthenticate

        localStorage.removeItem("token");
        // RootNavigation.navigate("Start");
        error_display(current_error, current_error_message);
        break;
      case 403:
        //unauthenticate
        localStorage.removeItem("token");
        // RootNavigation.navigate("Start");
        error_display(current_error, current_error_message);
        break;
      case 410:
        //unauthenticate
        error_display(current_error, current_error_message);
        break;
      case 422:
        error_display(current_error, current_error_message);
        break;
      case 500:
        //server error
        // if (typeof window !== "undefined") AsyncStorage.removeItem("token");
        // if (typeof window !== "undefined") navigation.navigate("Start");
        error_display(current_error, current_error_message);
        break;
    }
  }

  /* --------------------- axios instance ----------------------- */

  return {
    login: (callback, data, errCallback) => {
      return instance
        .post("/Token/Login", data)
        .then(callback)
        .catch((err) => {
          if (errCallback) errCallback(err);
          errors_handler(err);
        });
    },
    // ****
    // product api
    // *****
    getAllProduct: (callback, data, errCallback) => {
      return instance
        .post("/Products​/GetAll", data)
        .then(callback)
        .catch((err) => {
          if (errCallback) errCallback(err);
          errors_handler(err);
        });
    },
    getAll: (callback, data, errCallback) => {
      return instance
        .get("/Products/GetAll", data)
        .then(callback)
        .catch((err) => {
          if (errCallback) errCallback(err);
          errors_handler(err);
        });
    },
    getLasProduct: (callback, data, errCallback) => {
      return instance
        .get("/Products/GetLasProduct", data)
        .then(callback)
        .catch((err) => {
          if (errCallback) errCallback(err);
          errors_handler(err);
        });
    },
    getMenuCategory: (callback, data, errCallback) => {
      return instance
        .get("/Categories/getMenuCategory", data)
        .then(callback)
        .catch((err) => {
          if (errCallback) errCallback(err);
          errors_handler(err);
        });
    },
    Upload: (callback, data, errCallback) => {
      return instance
        .post("UploadFile/Upload", data)
        .then(callback)
        .catch((err) => {
          if (errCallback) errCallback(err);
          errors_handler(err);
        });
    },
  };
}
