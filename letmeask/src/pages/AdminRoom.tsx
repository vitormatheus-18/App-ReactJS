import { type } from 'os';
import logoImg from '../assets/images/logo.svg';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState} from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom'

import { Button } from '../components/button';
import { database } from '../services/firebase';
import { Question } from '../components/Question';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function AdminRoom(){
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;


    const { title, questions } = useRoom(roomId);
    
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
               <div className="question-list">             
               {questions.map(question => {
                   return (
                    <Question
                        key={question.id}
                        content={question.content}
                        author={question.author}
                    />
                   );
               })}
               </div>
           </main>
       </div>
    );
    
}