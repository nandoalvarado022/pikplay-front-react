import getNotifications from './mocks/getNotifications'
import publicationsMock from './mocks/publications';
import home from './mocks/home'
import getArticles from './mocks/getArticles'

export default function handler(req, res) {
  const operationName = req.headers?.['operation-name']
  switch (operationName) {
    case 'getArticles':
      res.status(200).json(getArticles);
      break;
    case 'getNotifications':
      res.status(200).json(getNotifications);
      break;
    case 'publications':
      res.status(200).json(publicationsMock);
      break;
    case 'home':
      res.status(200).json(home);
      break;
    default:
      res.status(200).json({});
  }
}
