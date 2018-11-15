import { AsyncStorage } from 'react-native';

import { JWT_STORAGE_KEY } from '../constants';

const deviceStorage = {
  
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  /**
   * Retrieve JWT from local storage and return it.
   */
  getJWT() {
    try {
      const jwt = AsyncStorage.getItem(JWT_STORAGE_KEY);
      if (jwt !== null) {
        return jwt;
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  /**
   * Retrieve JWT from local storage and set it in the state.
   */
  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem(JWT_STORAGE_KEY);
      if (value !== null) {
        this.setState({
          jwt: value,
          loading: false
        });
      } else {
        this.setState({
          loading: false
        });
      }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async deleteJWT() {
    try {
      await AsyncStorage.removeItem(JWT_STORAGE_KEY)
      .then(() => {
        this.setState({
          jwt: ''
        })
      });
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
}

export default deviceStorage;
