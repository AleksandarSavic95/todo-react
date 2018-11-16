import deviceStorage from './deviceStorage';

import axios from 'axios';

export async function post(url, data, options = {}) {
  try {
    const response = await axios.post(url, data, options);
    const responseData = response.data;
    let dataErrorMessage = '';
    if (!responseData.title && !responseData.access_token) {
      const errorsByField = response.data;
      for (fieldName in errorsByField) {
        dataErrorMessage += errorsByField[fieldName].join(' ') + '\n';
      }
      // strip last '\n'
      dataErrorMessage = dataErrorMessage.slice(0, -1);
      // this.setState({ error: dataErrorMessage, loading: false });
      return Promise.resolve({ error: dataErrorMessage, loading: false });
    }
    return Promise.resolve(responseData);
  }
  catch (error) {
    console.log(error);
    // deep destructuring - error.response.status  and  error.response.data.exception
    const { response: { status }, response: { data: { exception } } } = error;
    let requestErrorMessage = `Error ${status} - ${exception}`;
    // if it's not an exception, then it is "Unauthorized" or a similar message
    if (!exception) {
      requestErrorMessage = `Error ${status} - ${error.response.data.error}`;
    }
    // this.setState({ error: requestErrorMessage, loading: false });
    return Promise.resolve({ error: requestErrorMessage, loading: false });
  }
}

export function postAuthenticated(url, data, callback) {
  deviceStorage.getJWT()
    .then(token => {
      post(url, data, { headers: { Authorization: "Bearer " + token }})
      .then((item) => {
        callback(item);
      })
    })
    .catch(error => {
      console.log(error);
    });
}

/** AUTH **/
export function register(user) {
  console.log("\n REGISTER USER", user);
  return post("http://app-backend.test/api/auth/register", {
      ...user
    });
}

export function login(user) {
  console.log("\n LOGIN USER", user);
  return post("http://app-backend.test/api/auth/login", {
      ...user
    });
}