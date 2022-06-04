import {useState} from 'react'
import Chat from './chat'

function ChatButton() {
    const [chat_compo, chatState] = useState(-1)

    return(
        <div style={{
            backgroundColor: 'grey',
		position: 'fixed',
		textAlign: 'right',
        right: 0,
		width: '33%',
        height: '33%',
		bottom: '3%',
        }}>
            {chat_compo > 0 ? <div><Chat /><p style={{bottom:"0"}}><input placeholder="entrez votre message"></input><button>Envoyer</button></p></div> : null}
            <button style={{bottom:"0"}} onClick={() => chatState(chat_compo * (- 1))}>
                Chat
            </button>
            
        </div>
    )
}

export default ChatButton