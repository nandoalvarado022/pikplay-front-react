import Layout from '../../components/layout/Layout'
import UserNotifications from '../../components/userNotifications/UserNotifications'

const NotificacionesPage = () => {
  return (
    <Layout>
      <div className='page m-t-20'>
        <h2 className='Card'>Notificaciones</h2>
        <UserNotifications />
      </div>
    </Layout>
  )
}

export default NotificacionesPage
