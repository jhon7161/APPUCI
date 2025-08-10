import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    minWidth: '250px',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#00bcd4', // Azul aqua intenso
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
    zIndex: 1000,
    opacity: notification ? 1 : 0,
    pointerEvents: notification ? 'auto' : 'none',
    transition: 'opacity 0.3s ease-in-out',
    userSelect: 'none',
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
