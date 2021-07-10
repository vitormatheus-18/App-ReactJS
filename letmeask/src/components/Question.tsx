import { ReactNode } from 'react';  //Usado para coisas aceitáveis em um return


import "../styles/question.scss";

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string; 
    };
    children?: ReactNode
    isAnswered?: boolean
    isHighLighted?: boolean
}


export function Question({
    content,
    author,
    isAnswered = false,
    isHighLighted = false,
    children,
}: QuestionProps){
    return(
        <div 
            className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted  && !isAnswered ? 'highlighted': ''}`}
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src ={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>

    );
}