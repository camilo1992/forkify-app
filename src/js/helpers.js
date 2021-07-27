import { async } from 'regenerator-runtime';
import { TIME0UT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIME0UT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}, ${data.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJson = async function (url, upLoadData) {
  try {
    //  inorder to send data we need to send a POST request and passa some data as a n option into the fetch request
    const res = await Promise.race([
      fetch(url, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(upLoadData),
      }),
      timeout(TIME0UT_SEC),
    ]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}, ${data.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};
