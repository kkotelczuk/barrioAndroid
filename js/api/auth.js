const auth = {
  login(username, password) {
    return fetch('https://barrio.syncano.space/user-auth/login/',{
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json()).then(res => {
      console.log(res)
      return res;
    })
  },

  // getTrendingFixedWidth(offset: ?number): Promise<Array<Response>> {
  //   const offsetParam = offset ? `&offset=${offset + 1}` : '';
  //   const url = `${baseUrl}trending?api_key=${GIPHY_API_KEY}&limit=${limit}${offsetParam}`;

  //   return fetch(url).then(res => res.json()).then(res => {
  //     if (res.meta.status !== 200) {
  //       throw res.meta.status;
  //     }
  //     const arr = _getFixedWidthGifsUrls(res);
  //     return arr;
  //   });
  // },

  // getGifsBySearchTerm(searchTerm: string, offset: ?number): Promise<Array<Response>> {
  //   const query = searchTerm.replace(/ +/g, '+');
  //   const offsetParam = offset ? `&offset=${offset + 1}` : '';
  //   const url = `${baseUrl}search?q=${query}&api_key=${GIPHY_API_KEY}&limit=${limit}${offsetParam}`;

  //   return fetch(url).then(res => res.json()).then(res => {
  //     if (res.meta.status !== 200) {
  //       throw res.meta.status;
  //     }
  //     const arr = _getFixedWidthGifsUrls(res);
  //     return arr;
  //   });
  // },
};

export default auth;
