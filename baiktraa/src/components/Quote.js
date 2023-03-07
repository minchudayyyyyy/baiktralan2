import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReplayIcon from "@mui/icons-material/Replay";
export default function Quote() {
  const [author, setAuthor] = useState("");
  const [randomQuote, setRandomQuote] = useState("");
  const [quoteListByAuthor, setQuoteListByAuthor] = useState([]);
  const [showList, setShowList] = useState(false);

  const getData = async () => {
    //get all data
    const { data } = await axios.get(`https://type.fit/api/quotes`);

    //get all author
    let authorList = data?.map((item) => item.author);

    //get random author
    let author = authorList[Math.floor(Math.random() * authorList.length)];

    //get quote list by author
    let quoteListByAuthor = data?.filter((item) => item.author === author);
    let randomQuote =
      quoteListByAuthor[Math.floor(Math.random() * quoteListByAuthor.length)]
        .text;

    setQuoteListByAuthor(quoteListByAuthor);
    setRandomQuote(randomQuote);
    setAuthor(author);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box width="500px">
      <Box
        display="flex"
        justifyContent={showList === true ? "space-between" : "flex-end"}
        alignItems="center"
        width="100%"
        marginBottom={2}
      >
        {showList === true && (
          <IconButton onClick={() => setShowList(false)}>
            <ArrowBackIcon />
          </IconButton>
        )}

        <Button
          onClick={() => getData()}
          variant="contained"
          startIcon={<ReplayIcon />}
        >
          Random
        </Button>
      </Box>
      <Card>
        {showList === true ? (
          <Box maxHeight="500px" overflow="auto" marginBottom={1}>
            {quoteListByAuthor.map((item) => (
              <CardContent>
                <Typography
                  borderLeft="3px solid green"
                  paddingLeft={1.5}
                  variant="body2"
                  fontSize="18px"
                >
                  {item.text}
                </Typography>
              </CardContent>
            ))}
          </Box>
        ) : (
          <CardContent>
            <Typography
              borderLeft="3px solid green"
              paddingLeft={1.5}
              variant="body2"
              fontSize="18px"
            >
              {randomQuote}
            </Typography>
          </CardContent>
        )}

        <CardActions>
          <Button onClick={() => setShowList(true)}>{author}</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
