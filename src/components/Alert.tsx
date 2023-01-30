export default function Alert({ message, status }) {
    if (message === null) return null
    return (
        <div style={{ backgroundColor: status === 'success' ? '#54af50' : '#607d8b' }} className="alert">
            {message}
        </div>
    )
}
