import deviceStorage from './deviceStorage';

import axios from 'axios';

export async function post(url, data, options = {}) {
  try {
    const response = await axios.post(url, data, options);
    console.log("\nRESPONSE");
    console.log(response);
    const createdItem = response.data;
    let dataErrorMessage = '';
    if (!createdItem.title) {
      const errorsByField = response.data;
      for (fieldName in errorsByField) {
        dataErrorMessage += errorsByField[fieldName].join(' ') + '\n';
      }
      // strip last '\n'
      dataErrorMessage = dataErrorMessage.slice(0, -1);
      // this.setState({ error: dataErrorMessage, loading: false });
      return Promise.resolve({ error: dataErrorMessage, loading: false });
    }
    return Promise.resolve(createdItem);
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
  console.log("\n==== postAuthenticated =====");
  deviceStorage.getJWT()
    .then(token => {
      console.log("GOT TOKEN", token);
      post(url, data, { headers: { Authorization: "Bearer " + token }})
      .then((item) => {
        callback(item);
      })
    })
    .catch(error => {
      console.log("\n postAuthenticataed E R R O R!")
      console.log(error);
    });
}