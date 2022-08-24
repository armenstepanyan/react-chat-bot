import React, { useEffect, useState, useCallback } from "react";
import Options from "./Options";
import { ListItem, ValueOption, AnswerItem } from "./interfaces";
import ChoosenAnswers from "./ChoosenAnswers";
import Preloader from "./Preloader";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


function Chat() {
  const [list, setList] = useState<Array<ListItem>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentOption, setCurrentOption] = useState<ListItem | null>(null);
  const [ choosenAnswers, setChoosenAnswers ] = useState<Array<AnswerItem>>([]);
 
  
  const loadList = useCallback(async () => {

    try {
        const res = await fetch(`https://raw.githubusercontent.com/mzronek/task/main/flow.json`);
        const dataList = await res.json();
        setIsLoading(false);
        setList(dataList);
        setCurrentOption(dataList[0]);
    } catch (e) {
        setError(true);
        setIsLoading(false);
        console.log(e)
    }

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


  const html = isLoading ? <Preloader /> : (  currentOption ? (<Options option={currentOption} onSelect={valueSelected}/>) : (<div>Finish</div>) )

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
