import React, {useRef, useState} from 'react'
import './Quiz.css'
import {data} from '../../assets/data'
function Quiz() {

    let [index, setIndex] = useState(0) //zero means we are on the first question
    let [question, setQuestions] = useState(data[index])
    let [lock,setLock] = useState(false)
    let [score,setScore] = useState(0);

    let Option1 = useRef(null)
    let Option2 = useRef(null)
    let Option3 = useRef(null)
    let Option4 = useRef(null)
    let [result,setResult] = useState(false)

    let option_array = [Option1, Option2, Option3, Option4]
    //for answers
    const checkAns = (e,ans) => {
        if (lock === false) {
            if (index === data.length-1) {
                setResult(true);
                return 0;
            }
            if (question.ans === ans){ //if the answer equals the correct answer
                e.target.classList.add("correct");//this will add to the Css class correct to the target element of the event
                setLock(true); //this will lock the answers
                setScore(prev=>prev+1); //it will add every correct answer
    
            } else {
                e.target.classList.add("wrong");//this will add  to the Css class wrong to the target element of the event
                setLock(true); //this will lock the answers
                //this will add the answers of the questions
                option_array[question.ans-1].current.classList.add("correct");
            }

        }
       
    }

   const Next = () => {
    if (lock===true) {
        setIndex(++index);
        setQuestions(data[index])
        setLock(false);
        option_array.map((option) => {
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
            return null;
        })
    }
   }
   //for reset quiz

   const reset = () => {
    setIndex(0)
    setQuestions(data[0])
    setScore(0)
    setLock(false)
    setResult(false)
   }
    return (
        <div className='container'>
            <h1>Quiz Dragon Ball Z</h1>
            <hr />
            {result?<></>:<>
                <h2>{index+1}. {question.questions}</h2>
            <ul>
                <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={Next}>Next</button>
            <div className="index">{index+1} of {data.length} questions</div>
        
            </>}
            {result?<> <h2>You scored : {score} out of {data.length}</h2>
            <button onClick={reset}> Play Again</button></>:<></>}
           
           
        </div>
    )
}
export default Quiz