
import { Link } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/button';
import { useAuth } from '../hooks/useAuth';



import '../styles/auth.scss';

export function NewRoom(){
    const { user } = useAuth()
  

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração para perguntas e respostas"/>
                <strong>Crie sala de Q&amp;A ao-vivo</strong>
                <p>Tire suas dúvidas em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo da aplicação"/>
                    <form>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}