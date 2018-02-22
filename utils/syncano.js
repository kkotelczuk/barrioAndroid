const SYNCANO_API_URL = 'https://barrio.syncano.space/'
import {AsyncStorage} from 'react-native'

export const syncano = token => async (url, data) => {
  console.log('syncano',token)

  const syncanoUrl = SYNCANO_API_URL + url;

  myHeaders = new Headers({
    "X-USER-KEY": token,
  });

  return fetch(syncanoUrl, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data)
  }).then(res => res.json()).then(res => {
    console.log(res)
    return res;
  })
}

