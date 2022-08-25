import React, { useEffect, useState, useCallback } from "react";
import Options from "./Options";
import { ListItem, ValueOption, AnswerItem } from "./interfaces";
import ChoosenAnswers from "./ChoosenAnswers";
import Preloader from "./Preloader";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useFetch from "./hooks/useFetch";
import Finish from "./Finish";
import ErrorBlock from "./ErrorBlock";


function Chat() {
  const [currentOption, setCurrentOption] = useState<ListItem | null>(null);
  const [choosenAnswers, setChoosenAnswers] = useState<Array<AnswerItem>>([]);
  const [isLast, setIsLast] = useState<Boolean>(false);

  const { data: list, loading, error } = useFetch<Array<ListItem>>( "https://raw.githubusercontent.com/mzronek/task/main/flow.json", []);

  useEffect(() => {
    setCurrentOption(list ? list[0] : null);
  }, [list]);

  const valueSelected = (selectedOption: ValueOption, question: string) => {
    const { nextId } = selectedOption;
    const nextOption = list.find((item) => item.id === nextId) || null;

    setChoosenAnswers((prev) => [
      ...prev,
      {
        id: typeof nextId === "number" ? nextId : Date.now(),
        name: question,
        value: selectedOption.value,
      },
    ]);
    setCurrentOption(nextOption);
    setIsLast(!nextOption);
  };


  const content = loading ? (
    <Preloader />
  ) : currentOption ? (
    <Options option={currentOption} onSelect={valueSelected} />
  ) : isLast && (<Finish list={choosenAnswers}/>);

  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="md">
        <Typography variant="h3">Chat bot</Typography>
        {error ? (<ErrorBlock message="Unable to load data"/>) :  content  }
        <ChoosenAnswers list={choosenAnswers} />
      </Container>
    </>
  );
}

export default Chat;
