import { useState } from "react"

const usePublication = () => {
    const [showNotificationModal, setShowNotificationModal] = useState(false)

    return {
        showNotificationModal,
    }
}

export default usePublication
