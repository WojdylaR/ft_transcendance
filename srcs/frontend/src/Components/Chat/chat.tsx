import {useState} from 'react'
import ChatStyle from '../../Styles/Chat/Chat'

function Chat({src} : any) {
    let [chat, chatState] = useState("Bienvenue sur le chat")
    let [val, valueState] = useState("Bienvenue sur le chat")

    return (
		<div style={{whiteSpace:"pre-line"}}>
			{chat}
        	<ChatStyle>
				<input
                    onChange={(e) => {
                                        valueState(e.target.value)
                                       }}
                    onKeyPress={(e) => {
                                        if(e.key === 'Enter' )
                                        {
                                            chatState(chat + '\n' + val)
                                        }}}
                    
                    placeholder="entrez votre message"></input>
                    <button onClick={(e) => {
                                            chatState(chat + '\n' + val)
                                            }}>
                        Envoyer
                    </button>
        	</ChatStyle>
		</div>
    )
}

export default Chat