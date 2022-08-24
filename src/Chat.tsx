import React, { useEffect, useState, useCallback } from "react";
import Options from "./Options";
import { ListItem, ValueOption, AnswerItem } from "./interfaces";
import ChoosenAnswers from "./ChoosenAnswers";
import Preloader from "./Preloader";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useFetch from "./hooks/useFetch";


function Chat() {

  const [currentOption, setCurrentOption] = useState<ListItem | null>(null);
  const [ choosenAnswers, setChoosenAnswers ] = useState<Array<AnswerItem>>([]); 
 
  const { data: list, loading, error } = useFetch<Array<ListItem>>('https://raw.githubusercontent.com/mzronek/task/main/flow.json', null);
  
  useEffect(() => {
    setCurrentOption(list ? list[0] : null)
  }, [list])
 
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


  const html = loading ? <Preloader /> : (  currentOption ? (<Options option={currentOption} onSelect={valueSelected}/>) : (<div>Finish</div>) )

  return (
    <>    
    <Container sx={{ py: 2 }} maxWidth="md">
         <Typography variant="h3">
            Chat bot
        </Typography>
        { html }
        { error && (<Typography variant="h4" sx={{ color: 'red' }}>
           Unable to load data
        </Typography>)}
        <ChoosenAnswers list={choosenAnswers}/>
    </Container>
      
      
    </>
  );
}

export default Chat;
