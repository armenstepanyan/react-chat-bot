import React, { FunctionComponent } from 'react'
import { ListItem, ValueOption } from './interfaces'

interface OptionProps {
    option: ListItem;
    onSelect: (value: ValueOption, question: string) => void
}

const Options: FunctionComponent<OptionProps> = ({ option, onSelect }) => {
  
    const selectOption = (valueOption: ValueOption) => {
        console.log('go next', valueOption.nextId, valueOption.value);
        onSelect(valueOption, option.text)
    }

    const { valueOptions } = option;
    
  return (
    <>
    <h2>Options  {option.name}</h2>
    <p>{ option.text }</p>
    <div>
        { option.id }
    </div>
    <p>
        <button onClick={() => selectOption(valueOptions[0])}>{ valueOptions[0].text }</button> - 
        <button onClick={() => selectOption(valueOptions[1])}>{ valueOptions[1].text }</button>
    </p>
    </>
  )
}



export default Options