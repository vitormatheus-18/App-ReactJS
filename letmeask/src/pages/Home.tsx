import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg';

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
                <div>
                    <img src={logoImg} alt="Logo da aplicação"/>
                    <button>
                        <img src={googleIconImg} alt="Logo do google"/>
                        Crie sua sala com o Google
                    </button>
                    <div>
                        ou entyre em uma sala
                    </div>
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <button type="submit">
                            Entrar na sala
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}