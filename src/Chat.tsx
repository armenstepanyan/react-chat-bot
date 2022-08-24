import React, { useEffect, useState, useCallback } from "react";
import Options from "./Options";
import { ListItem, ValueOption, AnswerItem } from "./interfaces";
import ChoosenAnswers from "./ChoosenAnswers";

function Chat() {
  const [list, setList] = useState<Array<ListItem>>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [currentOption, setCurrentOption] = useState<ListItem | null>(null);
  const [ choosenAnswers, setChoosenAnswers ] = useState<Array<AnswerItem>>([]);
 
  
  const loadList = useCallback(async () => {
    const res = await fetch(`https://raw.githubusercontent.com/mzronek/task/main/flow.json`);
    const dataList = await res.json();
    setisLoading(false);
    setList(dataList);
    setCurrentOption(dataList[0]);
  }, []);

  useEffect(() => {
    loadList();
  }, [loadList])

  const valueSelected = (selectedOption: ValueOption, question: string) => {

    const { nextId } = selectedOption;
    const nextOption = list.find(item => item.id === nextId) || null;

    setChoosenAnswers(prev => ([
        ...prev,
        { 
            id: Date.now(), // let's keep it simple for now
            question,
            answer: selectedOption.value
         }
    ]))
    setCurrentOption(nextOption);

  }
 
  return (
    <>    
      <h2> Chat bot</h2>
      <div>
        <ChoosenAnswers list={choosenAnswers}/>
      </div>
      { isLoading ? (<div>Loading....</div>) : ( 
        currentOption ? (<Options option={currentOption} onSelect={valueSelected}/>) : (<div>Finish</div>)
        ) 
      }
      
    </>
  );
}

export default Chat;
