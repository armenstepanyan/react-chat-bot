import React, { FunctionComponent } from 'react'
import { AnswerItem } from './interfaces'

interface Props {
    list: Array<AnswerItem>
}

const ChoosenAnswers: FunctionComponent<Props> = ({ list }) => {
  return (
    <>
    <div>ChoosenAnswers</div>
    { list.map(item => <div key={item.id}><h4>{item.question}</h4><p>{String(item.answer)}</p></div> ) }
    </>
    
  )
}

export default ChoosenAnswers