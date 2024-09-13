/* eslint-disable */
import 'date-and-time/locale/es'
import VARS, { API_URL } from './variables'
import date from 'date-and-time'
import fetch from 'node-fetch'
import rn from 'random-number'
import { connect, useDispatch } from 'react-redux'
// import { gql } from '@apollo/client'
import { storage } from './storage'
import { datadogRum } from '@datadog/browser-rum'
import CustomFetch from '../components/fetch/CustomFetch.ts'
import toastr from 'toastr'
import confetti from 'canvas-confetti'

const { post } = CustomFetch()
date.locale('es')

// export default connect(null, useDispatch)(Functions)
//  DATADOG: https://app.datadoghq.com/rum/list?from_ts=1707527408580&to_ts=1707613808580&live=true
const env = process.env.NODE_ENV
datadogRum.init({
  applicationId: 'e070617f-1352-46e4-9c21-4cb715efd297',
  clientToken: 'pubffdccfc89da2b7156acfb7c7e44e317f',
  site: 'datadoghq.com',
  service: 'Pikplay',
  env,
  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 50,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'allow'
})

datadogRum.startSessionReplayRecording()

export const getNotifications = async props => {
  const { closed, user } = props
  const query = `query {
    getNotifications(user: ${user}, closed: ${closed}){
      closed
      coins
      created
      detail
      id
      type
      user
    }
  }`

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Operation-Name': 'getNotifications',
      },
      body: JSON.stringify({ query }),
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log('Ha ocurrido un error en getNotifications', err)
  }
}

export const getHome = async props => {
  const { attempt = 1, seller = null, user_request = null } = props

  const getCache = () => {
    const withoutCache = !!slug || !!category || !!subcategory || !!title
    console.log('Sin cache: ', withoutCache)
    if (withoutCache) return 'no-cache'
    else return 'max-age=300000'
  }

  const query = `query {
      home (seller: ${seller}, user_request: ${user_request}){
        accept_changes
        apply_cashback
        banner_bottom
        banner_top
        category
        certificate
        city
        description
        following
        id
        image_1
        image_2
        image_3
        image_4
        image_5
        image_link
        is_new
        price
        quantity
        sale_price
        slug
        tags
        title
        user {
          apply_cashback
          certificate
          id
          name
          phone
          picture
        }
        views
        warranty
      }
    }`
  let data = []
  try {
    console.log('No entro por SSR')
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': getCache(),
        fetchPolicy: 'cache-first',
        'Operation-Name': 'home',
      },
      body: JSON.stringify({ query }),
    })
    const _data = await res.json()
    data = _data?.data?.home
  } catch (err) {
    console.log('Error in fetch. Operation name: home, try number: #', attempt)
    console.log(err)
    props = { ...props, attempt: 2 }
    if (attempt === 1) getFeed(props)
  }
  return data
}

export const getFeed = async props => {
  const {
    attempt = 1,
    category = null,
    city = '',
    isSSR = false,
    is_verified = true,
    limit = 12,
    origin,
    seller = null,
    slug = '',
    status = true,
    subcategory = null,
    title = '',
    user_request = 0,
  } = props
  const getCache = () => {
    const withoutCache = !!slug || !!category || !!subcategory || !!title
    console.log('Sin cache: ', withoutCache)
    if (withoutCache) return 'no-cache'
    else return 'max-age=300000'
  }

  const query = `query {
      publications(
        category: ${category}, 
        city: "${city}",
        is_verified: ${is_verified},
        limit: ${limit}, 
        seller: ${seller},
        slug: "${slug}",
        status: ${status},
        subcategory: ${subcategory},
        title: "${title}",
        user_request: ${user_request}
      ) {
        accept_changes
        apply_cashback
        banner_bottom
        banner_top
        category
        certificate
        city
        description
        id
        image_1
        image_2
        image_3
        image_4
        image_5
        image_link
        is_new
        price
        quantity
        sale_price
        slug
        tags
        title
        user {
          apply_cashback
          certificate
          id
          name
          phone
          picture
        }
        views
        warranty
      }
    }`
  let data = []
  try {
    if (isSSR && false) {
      console.log('Entro por SSR')
      // Haciendo fetch al JSON cacheado de productos
      const url = API_URL + '/products'
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      data = await res.json()
    } else {
      console.log('No entro por SSR')
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': getCache(),
          fetchPolicy: 'cache-first',
          'Operation-Name': 'publications',
        },
        body: JSON.stringify({ query }),
      })
      const _data = await res.json()
      data = _data?.data?.publications
    }
  } catch (err) {
    console.log('Ha ocurrido un error, intento #', attempt)
    console.log(err)
    props = { ...props, attempt: 2 }
    if (attempt == 1) getFeed(props)
  }
  return data
}

export const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const subirImagen = ({ callback = () => null, folder, idImageElement }) =>
  new Promise(async (resolve, reject) => {
    const arrayURLS = []
    // const $imagenes = document.getElementById("subir_imagen");
    const element = document.getElementById(idImageElement)
    const file = element.files[0]
    // Array.from($imagenes.files).forEach(file => {
    // const d = new Date()
    // const datestring =
    //   d.getDate() +
    //   '_' +
    //   (d.getMonth() + 1) +
    //   '_' +
    //   d.getFullYear() +
    //   '_' +
    //   d.getHours() +
    //   '_' +
    //   d.getMinutes() +
    //   '_' +
    //   d.getSeconds()

    // const random = rn({ min: 0, max: 100, integer: true })
    // const fileName = `${datestring}_${random}`
    const formData = new FormData();
    formData.set('file', file);
    formData.set('folder', folder);
    post(null, "/v1/do/spaces", null, formData)
      .then(data => {
        callback && callback()
        resolve(data)
      })
      .catch(err => {
        toastr("Error al subir el archivo")
        reject(null)
      })
  })

export const loadAudio = function (fuente) {
  // const fuente = "/audios/noti.mp3"
  // const sonido = document.querySelector("audio")
  // sonido.src = fuente
  // sonido.volume = 0.2
  // sonido.play()
}

export function getPaises() {
  return [
    { id: 'colombia', nombre: 'Colombia' },
    { id: 'mexico', nombre: 'México' },
    { id: 'argentina', nombre: 'Argentina' },
    { id: 'españa', nombre: 'España' },
    { id: 'salvador', nombre: 'Salvador' },
  ]
}

export function getCiudades() {
  // Los paises que se coloquen en el campo ID deben ser separados por -
  return [
    { id: 1, pais: '', label: 'Cualquier lugar' },
    { id: 2, pais: 'colombia', label: 'Bogotá' },
    { id: 3, pais: 'colombia', label: 'Medellín' },
    { id: 4, pais: 'colombia', label: 'Pereira' },
    { id: 5, pais: 'colombia', label: 'Cartagena' },
    { id: 6, pais: 'colombia', label: 'Barranquilla' },
    { id: 7, pais: 'colombia', label: 'Cali' },
    { id: 8, pais: 'mexico', label: 'Ciudad de México' },
    { id: 9, pais: 'mexico', label: 'Guadalajara' },
    { id: 10, pais: 'mexico', label: 'Puebla de Zaragoza' },
    { id: 11, pais: 'mexico', label: 'Ecatepec' },
    { id: 12, pais: 'mexico', label: 'Tijuana' },
    { id: 13, pais: 'argentina', label: 'Buenos Aires' },
    { id: 14, pais: 'españa', label: 'Madrid' },
    { id: 15, pais: 'salvador', label: 'San Salvador' },
    { id: 16, pais: 'chile', label: 'Santiago de Chile' },
  ]
}

export function shuffle(array) {
  // Ordenar aleatoriamente un array
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export function getScreenOrientation(setOrientation) {
  function handleOrientationChange(event) {
    const { matches, media } = event;
    if (matches) {
      setOrientation(media);
    }
  }

  const mediaQueryPortrait = window.matchMedia('(orientation: portrait)');
  const mediaQueryLandscape = window.matchMedia('(orientation: landscape)');

  if (mediaQueryPortrait.matches) {
    setOrientation('portrait');
  } else if (mediaQueryLandscape.matches) {
    setOrientation('landscape');
  }

  mediaQueryPortrait.addListener(handleOrientationChange);
  mediaQueryLandscape.addListener(handleOrientationChange);

  return () => {
    mediaQueryPortrait.removeListener(handleOrientationChange);
    mediaQueryLandscape.removeListener(handleOrientationChange);
  };

}

export function formatNumber(input) {
  input = String(input)
  let num = input.replace(/\./g, '')
  if (!isNaN(num)) {
    num = num
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/(?=\d*\.?)(\d{3})/g, '$1.')
    num = num.split('').reverse().join('').replace(/^[\.]/, '')
    input = num
  } else {
    input = input.replace(/[^\d\.]*/g, '')
  }
  return input
}

export function slugify(string, lenght) {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  const cadena = string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
  return lenght ? cadena.substring(0, lenght) : cadena
}

export function checkIsMobile(userAgent) {
  var ua = userAgent.toLowerCase()
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      ua,
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      ua.substr(0, 4),
    )
  )
}

export const GET_CHALLENGES = () => { }
// gql`
//   query getChallenges {
//     getChallenges {
//       currentPoints
//       deadLine
//       description
//       finished
//       id
//       image
//       prizeCoins
//       targetPoints
//       title
//     }
//   }
// `

export const GET_ARTICLES = () => { }
// gql`
//   query getArticles($id: Int, $limit: Int, $slug: String) {
//     getArticles(id: $id, limit: $limit, slug: $slug) {
//       content
//       mobile_content
//       id
//       image_card
//       slug
//       summary
//       title
//     }
//   }
// `*/

export function getCategories(id) {
  const categories = [
    { id: 1, name: 'Accesorios', image: '/images/icons/accesorios.svg' },
    { id: 2, name: 'Nintendo Switch', image: '/images/icons/nintendo.svg' },
    { id: 3, name: 'Playstation', image: '/images/icons/play.svg' },
    { id: 4, name: 'Xbox', image: '/images/icons/xbox.svg' },
    { id: 5, name: 'Otros', image: '/images/icons/otros1.svg' },
    { id: 6, name: 'PC Gamer', image: '/images/icons/desktop.svg' },
  ]
  if (id) return categories.find(item => item.id == id)
  return categories
}

export function getSubcategories(id) {
  const subcategories = [
    {
      id: 1,
      name: 'Membresias Nintendo Switch',
      url: '/subcategoria/membresias-nintendo-switch',
    },
    {
      id: 2,
      name: 'Membresias Playstation',
      url: '/subcategoria/membresias-playstation',
    },
    { id: 3, name: 'Promociones', url: '/subcategoria/promociones' },
    { id: 4, name: 'Juegos Clasicos', url: '/subcategoria/juegos-clasicos' },
    { id: 5, name: 'Combos', url: '/subcategoria/combos' },
    { id: 6, name: 'Sorteos', url: '/subcategoria/sorteos' },
  ]
  if (id) return subcategories.find(item => item.id == id)
  return subcategories
}

export const CREATE_COIN = () => { }
/*gql`
  mutation createCoin($id: Int) {
    createCoin(id: $id)
  }
`*/

export const CREATE_FAVORITE = () => { }
/*gql`
  mutation createFavorite($publication: Int, $user: Int) {
    createFavorite(publication: $publication, user: $user)
  }
`

export const DELETE_NOTIFICATION = 
/*gql`
  mutation deleteNotification($id: Int, $userId: Int) {
    deleteNotification(id: $id, userId: $userId)
  }
`*/

export const DELETE_FOLLOWINED_PUBLICATION = () => { }
/*gql`
  mutation deleteFollowinedPublication($publication: Int, $user: Int) {
    deleteFollowinedPublication(publication: $publication, user: $user)
  }
`*/

export const GET_NOTIFICATIONS = () => { }
/*gql`
  query getNotifications($user: Int, $closed: String) {
    getNotifications(user: $user, closed: $closed) {
      closed
      coins
      created
      detail
      id
      link
      type
      user
    }
  }
`*/

export const VALIDATE_COUPON = () => { }
/*gql`
  mutation validateCoupon($coupon: String, $publication: Int, $user: Int) {
    validateCoupon(coupon: $coupon, publication: $publication, user: $user)
  }
`

export const GET_CLAIMED_COUPONS = 
/*gql`
  query getClaimedCoupons($coupon: String, $publication: Int, $user: Int) {
    getClaimedCoupons(coupon: $coupon, publication: $publication, user: $user) {
      coins
      coupon
    }
  }
`*/

export const GET_FOLLOWED_PUBLICATIONS = () => { }
/*gql`
  query getFollowedPublications($user: Int) {
    getFollowedPublications(user: $user)
  }
`

const slug = null,
  category = null,
  subcategory = null,
  title = null,
  status = true
export const GET_PUBLICATIONS = 
/*gql`
  query publications(
    $status: Boolean
    $slug: String
    $category: Int
    $subcategory: Int
    $title: String
  ) {
    publications(
      status: $status
      slug: $slug
      category: $category
      subcategory: $subcategory
      title: $title
    ) {
      accept_changes
      apply_cashback
      banner_bottom
      banner_top
      category
      certificate
      description
      following
      id
      image_1
      image_2
      image_3
      image_4
      image_5
      image_link
      is_new
      price
      quantity
      sale_price
      slug
      tags
      title
      user
      user_name
      user_phone
      user_picture
      user_transactions
      views
      warranty
    }
  }
`*/

export const notifierOptions = {
  labels: {
    success: '',
  },
}

export const interestsList = [
  { name: 'Nintendo Switch', id: 1 },
  { name: 'PC', id: 2 },
  { name: 'Playstation', id: 3 },
  { name: 'XBOX', id: 4 },
  { name: 'Comprar', id: 5 },
  { name: 'Vender', id: 6 },
  { name: 'Truques', id: 7 },
]

export const versions = ['1.1.1']

export const animatePrince = (HTMLElement, targetNumber, fromNumber) => {
  var target = parseFloat(fromNumber);
  var number = targetNumber // parseFloat(HTMLElement.value);
  console.log(number + "  " + target + " " + (number > target));
  if (number > target) { // Aumentando
    var interval = setInterval(function () {
      HTMLElement.innerHTML = target
      if (number <= target) clearInterval(interval)
      target = Number(target + 1)
    }, 100);
  } else { // Disminuyendo
    var interval = setInterval(function () {
      if (HTMLElement) {
        HTMLElement.innerHTML = target
        if (number >= target) clearInterval(interval)
        target = Number(target - 1)
      }
    }, 80)
  }
}

export function snakeToCamel(string) {
  let splitStringArr = string.split("_");
  let builtStr = splitStringArr.reduce((acc, curr, i) => {
    curr = i !== 0 ? curr[0].toUpperCase() + curr.slice(1) : curr;
    return acc + curr;
  }, "");
  return builtStr;
}

export function convertResponse(response) {
  if (response == null) return response;
  let parentKeys = Object.keys(response);
  parentKeys.forEach((key) => {
    let currentObj = response[key];
    delete response[key];
    let newKey = snakeToCamel(key);
    response[newKey] = currentObj;
    if (typeof response[newKey] === "object") {
      convertResponse(response[newKey]);
    }
  });
  return response;
}

export function isEmpty(obj) {
  // Validating json is not empty, string is not empty and array is not empty
  if (obj === null || obj === undefined) return true;
  if (typeof obj === "string" && obj.trim() === "") return true;
  if (Array.isArray(obj) && obj.length === 0) return true;
  if (typeof obj === "object" && Object.keys(obj).length === 0) return true;
  return false;
}

export function dragElement(elmnt) {
  // Funcion para hacer que un elemento HTML sea arrastrable y mantiene la posicion donde se coloca con el touch o cursor
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) { // Debe existir un elemento con el id + "header"
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export function startConfetti() {
  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
    zIndex: 1301
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
  confetti({ ...defaults })
}

export function cookiesToObject(cookies) {
  // Tested in getServerSideProps
  const cookiesArray = cookies.split(';')
  const cookiesObject = {}
  cookiesArray.forEach(cookie => {
    const [key, value] = cookie.split('=')
    cookiesObject[key.trim()] = value
  })
  return cookiesObject
}

export const timeAgo = (prevDate) => {
  debugger;
  const prevDateFormatted = Number(new Date(prevDate));
  const today = Number(new Date());
  const diff = today - prevDateFormatted;
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  switch (true) {
    case diff < minute:
      const seconds = Math.round(diff / 1000);
      return `${seconds} ${seconds > 1 ? 'segundos' : 'segundo'}`
    case diff < hour:
      return Math.round(diff / minute) + ' minutos';
    case diff < day:
      return Math.round(diff / hour) + ' horas';
    case diff < month:
      return Math.round(diff / day) + ' días';
    case diff < year:
      return Math.round(diff / month) + ' meses';
    case diff > year:
      return Math.round(diff / year) + ' años';
    default:
      return "";
  }
};
