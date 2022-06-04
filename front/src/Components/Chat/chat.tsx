import { useState} from 'react'

function Chat({src} : any) {
    const [chat, chatState] = useState("Bienvenue sur le chat")
    return (
        <div>
            {chat}
        </div>
    )
}

export default Chat