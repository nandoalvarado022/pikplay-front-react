import cookieCutter from 'cookie-cutter'

const CustomFetch = () => {
  const apiUrl = 'http://localhost:3000';

  const get = async (path) => {
    try {
      const response = await fetch(apiUrl + path, {
        // credentials: "same-origin", // TODO averiguar para que sirve
        headers: {
          "Content-Type": "application/json",
          "User-ID": cookieCutter.get('User-ID'),
          "X-Auth-Token": cookieCutter.get('X-Auth-Token'),
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener datos desde el servicio');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }

  const post = async (path, params, headers = {}) => {
    return fetch(apiUrl + path, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "User-ID": cookieCutter.get('User-ID'),
        "X-Auth-Token": cookieCutter.get('X-Auth-Token'),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(json => {
        return json
      })
      .catch(err => console.log(err))
  }

  return {
    get,
    post
  }
}

export default CustomFetch
