import cookieCutter from 'cookie-cutter'

const CustomFetch = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const getCookies = (ctx = { req: { cookies: {} } }) => {
    let cookies = {};
    if (typeof window != 'undefined') { // Solo funciona para peticiones del lado de client 
      cookies["User-ID"] = cookieCutter.get('User-ID'),
        cookies["X-Auth-Token"] = cookieCutter.get('X-Auth-Token')
    }

    if (!cookies["User-ID"] && !cookies["X-Auth-Token"] && ctx) { // Obteniendo cookies del lado del server. Generalmente vienen en el ctx.req.cookies
      cookies["User-ID"] = ctx?.req.cookies["User-ID"]
      cookies["X-Auth-Token"] = ctx.req.cookies["X-Auth-Token"]
    }
    return cookies
  }

  const get = async (path, props = {}) => {
    try {
      const response = await fetch(apiUrl + path, {
        // credentials: "same-origin", // TODO averiguar para que sirve
        headers: {
          "Content-Type": "application/json",
          ...getCookies()
        },
      });
      // if (!response.ok) {
      //   throw new Error(`Algo paso :(`);
      // }
      // debugger;
      const data = await response.json();
      if (data.statusCode == 500) {
        // debugger;
        return {
          data: [],
          message: "Error al obtener datos desde el servicio",
          status: 500
        }
      }
      return data;
    } catch (error) {
      // debugger;
      console.error(`Error al obtener datos desde el servicio para la ruta ${path} method GET}`);
      throw error;
    }
  }

  const post = async (ctx, path, params, headers = {}) => {
    const url = apiUrl + path
    console.log("la url es:", url);
    console.log(process.env);
    return fetch(url, {
      method: 'POST',
      headers: {
        credentials: 'include',
        "Content-type": "application/json; charset=UTF-8",
        ...getCookies(ctx),
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(json => {
        return json
      })
      .catch(error => {
        console.error(`Error al obtener datos desde el servicio para la ruta ${path} method GET}`);
        throw error;
      })
  }

  return {
    get,
    post
  }
}

export default CustomFetch
