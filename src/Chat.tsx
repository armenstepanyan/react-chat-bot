import React, { useEffect, useState, useCallback } from "react";
import Options from "./Options";
import { ListItem, ValueOption, AnswerItem } from "./interfaces";
import ChoosenAnswers from "./ChoosenAnswers";
import Preloader from "./Preloader";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useFetch from "./hooks/useFetch";
import Finish from "./Finish";
import Error from "./Error";


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

  useEffect(() => {
    if (isLast) {
      return;
      console.log("last item send");
      fetch('https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation', {
        method: 'PUT',
        body: JSON.stringify(choosenAnswers.map(item => ({ name: item.name, value: item.value })))
      })
      .then(res => res.text())
      .then(() => {
        console.log('Data sent');
      })
      .catch(() => {
        console.log('Error');
      })
    }
  }, [isLast]);

  const content = loading ? (
    <Preloader />
  ) : currentOption ? (
    <Options option={currentOption} onSelect={valueSelected} />
  ) : (<Finish />);

  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="md">
        <Typography variant="h3">Chat bot</Typography>
        {error ? (<Error message="Unable to load data"/>) :  content  }
        <ChoosenAnswers list={choosenAnswers} />
      </Container>
    </>
  );
}

export default Chat;
