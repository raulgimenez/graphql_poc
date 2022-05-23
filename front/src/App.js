import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import "./App.css";
import { useStyletron } from "baseui";
import { Select } from "baseui/select";
import { DisplayXSmall } from "baseui/typography";

const SEARCH_BY_NAME = gql`
  query ($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
      }
    }
  }
`;

function App() {
  const [getCharaters, result] = useLazyQuery(SEARCH_BY_NAME);
  const [characters, setCharacters] = useState([]);
  let navigate = useNavigate();

  const [css] = useStyletron();

  useEffect(() => {
    if (result.data) {
      setCharacters(
        result.data.characters.results.map((character) => ({
          label: character.name,
          value: character.id,
        }))
      );
    }
  }, [result]);

  return (
    <div className="App">
      <header className="App-header">
        <DisplayXSmall className={css({ color: "aquamarine !important", "margin-bottom": "30px" })}>
          Rick and Morty Characters
        </DisplayXSmall>
        <img src="/logo512.png" className="App-logo" alt="logo" />
        <p>
          <div>
            <Select
              options={characters}
              placeholder="Search character"
              onChange={(params) =>
                navigate("/character/" + params.value[0].value)
              }
              onInputChange={(e) =>
                getCharaters({ variables: { name: e.target.value } })
              }
              overrides={{
                ul: { style: { "max-width": "300px" } }
              }}
            />
          </div>
        </p>
        <a
          className={css({ color: "aquamarine" })}
          href="https://github.com/raulgimenez/graphql_poc"
          target="_blank"
          rel="noopener noreferrer"
        >
          source code
        </a>
      </header>
    </div>
  );
}

export default App;
