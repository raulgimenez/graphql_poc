import "./App.css";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Button } from "baseui/button";
import { Spinner } from "baseui/spinner";
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const SEARCH_BY_ID = gql`
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        name
        episode
      }
      created
    }
  }
`;

function Resume(character) {
  return (
    <React.Fragment>
      <p className="list-group-item">status: {character.status}</p>
      <p className="list-group-item">species: {character.species}</p>
      <p className="list-group-item">type: {character.type}</p>
      <p className="list-group-item">gender: {character.gender}</p>
      <p className="list-group-item">origin: {character.origin.name}</p>
      <p className="list-group-item">location: {character.location.name}</p>
    </React.Fragment>
  );
}

function Character() {
  const { id } = useParams();
  const { data, loading } = useQuery(SEARCH_BY_ID, {
    variables: { id: id },
  });
  let navigate = useNavigate();

  let character = {};

  if (data) {
    character = data.character;
  }

  if (loading == null || loading) {
    return (
      <div className="App">
        <header className="App-header">
          <Spinner />
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <Card
            overrides={{ Root: { style: { width: "40%" } } }}
            title={character.name}
          >
            <StyledThumbnail src={character.image} />
            <StyledBody>{Resume(character)}</StyledBody>
            <StyledAction>
              <Button
                overrides={{
                  BaseButton: { style: { width: "100%" } },
                }}
                onClick={() => navigate("/", { replace: true })}
              >
                {"<< back to Search"}
              </Button>
            </StyledAction>
          </Card>
        </header>
      </div>
    );
  }
}

export default Character;
