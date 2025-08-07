// src/components/Notification.jsx
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderColor: '#00CED1', // Azul agua marina
    backgroundColor: '#E0FFFF', // Azul agua marina claro
    display: notification ? '' : 'none' // Ocultar si no hay notificación
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
