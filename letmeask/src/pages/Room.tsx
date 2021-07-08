import { type } from 'os';
import logoImg from '../assets/images/logo.svg';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState} from 'react';
import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/button';
import { database } from '../services/firebase';

import '../styles/room.scss';

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;

}>

type Question = {
    id: string;
    author: {
        name: String;
        avatar: String;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}

type RoomParams = {
    id: string;
}

export function Room(){
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')

    const roomId = params.id

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {  //Ouvir o evento mais de uma vez: On, única vez = Once.
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,                    
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions)
        })
    }, [roomId]);

    async function handleSetQuestion(event: FormEvent){
        event.preventDefault();          //Bloqueia o recarregamento de tela, "aquela piscada chata!"

        if (newQuestion.trim() === ''){
            return;
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighLighted : false,      //Se a pergunta estiver destacada pelo admin
            inAnswered: false           //Se está respondida ou não
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');   //set o campo para vazio
    }

    return(
       <div id="page-room">
           <header>
               <div className="content">
                    <img src={logoImg} alt="letmeask"/>
                    <RoomCode code={ roomId } /> 
               </div>
           </header>

           <main>
               <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
               </div>
               <form onSubmit={handleSetQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                       
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
               </form>

               {JSON.stringify(questions)}
           </main>
       </div>
    );
    
}