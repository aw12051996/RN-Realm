import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
const url = Config.API_URL;
const url_cloudinary = Config.API_URL_CLOUDINARY;
const _getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('userToken');
    if (value !== null) {
      // We have data!!
      return JSON.parse(value);
    }
    return false;
  } catch (error) {}
};

export const signInUser = async (body) => {
  try {
    const result = await axios.post(`${url}/login`, body);
    return await result?.data;
  } catch (error) {
    throw new Error('server error');
  }
};

export const getPolygon = async (token) => {
  try {
    const result = await axios.get(`${url}/polygon`, {
      headers: {
        Authorization: token,
      },
    });
    return await result?.data;
  } catch (error) {
    throw new Error('server error');
  }
};

export const getQuestion = async (token) => {
  try {
    // const token = await _getToken();
    const result = await axios.get(`${url}/questions`, {
      headers: {
        Authorization: token,
      },
    });
    return await result?.data;
  } catch (error) {
    throw new Error('server error');
  }
};

export const storeRespondent = async (body) => {
  try {
    const token = await _getToken();
    const result = await axios.post(`${url}/respondent`, body, {
      headers: {
        Authorization: JSON.parse(token),
      },
    });
    return await result?.data;
  } catch (error) {
    throw new Error('server error');
  }
};

export const storeSurvey = async (body) => {
  try {
    const token = await _getToken();
    const result = await axios.post(`${url}/survey`, body, {
      headers: {
        Authorization: JSON.parse(token),
      },
    });
    return await result?.data;
  } catch (error) {
    throw new Error('server error');
  }
};

export const uploadPhoto = async (body) => {
  try {
    const result = await axios.post(`${url_cloudinary}/image/upload`, body);
    return await result;
  } catch (error) {
    throw new Error('server error');
  }
};

export const storePhoto = async (body, id) => {
  try {
    // console.log(id, body);
    const token = await _getToken();
    const result = await axios.put(`${url}/respondent/${id}`, body, {
      headers: {
        Authorization: JSON.parse(token),
      },
    });
    return await result?.data;
  } catch (error) {
    throw new Error('server error');
  }
};
