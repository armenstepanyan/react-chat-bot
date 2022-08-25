import React, { useEffect, useState } from "react";
import Options from "./Options";
import { ListItem, ValueOption, AnswerItem } from "../interfaces";
import ChoosenAnswers from "./ChoosenAnswers";
import Preloader from "./Preloader";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useFetch from "../hooks/useFetch";
import Finish from "./Finish";
import ErrorBlock from "./ErrorBlock";

const START_ID = 100;

function Chat() {
  const [currentOption, setCurrentOption] = useState<ListItem | null>(null);
  const [choosenAnswers, setChoosenAnswers] = useState<Array<AnswerItem>>([]);
  const [isLast, setIsLast] = useState<boolean>(false);

  const { data: list, loading, error } = useFetch<Array<ListItem>>( "https://raw.githubusercontent.com/mzronek/task/main/flow.json", []);

  useEffect(() => {
    // starting from given ID or first item
    setCurrentOption(list.find(item => item.id === START_ID) || list[0] || null);
  }, [list]);

  // handle next or last option select
  const valueSelected = (selectedOption: ValueOption, name: string) => {
    const { nextId } = selectedOption;
    const nextOption = list.find((item) => item.id === nextId) || null;

    // update selected anwswers table
    setChoosenAnswers((prev) => [ ...prev,
      { name, value: selectedOption.value },
    ]);
    setCurrentOption(nextOption);
    setIsLast(!nextOption);
  };


  const content = loading ? (
    <Preloader />
  ) : currentOption ? (
    <Options option={currentOption} onSelect={valueSelected} />
  ) : isLast ? (<Finish list={choosenAnswers}/>) : (<Typography variant="body1">No items</Typography>);

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
