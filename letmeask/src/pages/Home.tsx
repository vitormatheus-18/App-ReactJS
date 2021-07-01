import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/button';

import '../styles/auth.scss';

export function Home(){
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
                    <button className="btn-createWithGoogle">
                        <img src={googleIconImg} alt="Logo do google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}