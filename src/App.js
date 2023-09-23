import React, { useEffect, useState } from "react";
import "./App.css";
import CharacterSheet from "./layouts/CharacterSheet";
import { FETCH_CONFIG } from "./utils/apiConfig";
import {
  ATTRIBUTE_LIST,
  SKILL_LIST,
  INITIAL_ATTRIBUTE_VALUE,
  INITIAL_SKILL_VALUE,
} from "./data/constants";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from constants if server data is null
  const attributes = data
    ? data.attributes
    : ATTRIBUTE_LIST.reduce((acc, attr) => ({ ...acc, [attr]: INITIAL_ATTRIBUTE_VALUE }), {});
  const skills = data
    ? data.skills
    : SKILL_LIST.reduce((acc, skill) => ({ ...acc, [skill.name]: INITIAL_SKILL_VALUE }), {});

  // Fetch data from the API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(baseURL, FETCH_CONFIG);

      if (!response.ok) {
        console.error(`Failed fetching data: ${response.statusText}`);
        return;
      }

      const { body } = await response.json();
      setData(body);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Sheet Assignment</h1>
      </header>
      <section className="App-section">
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <CharacterSheet initialAttributes={attributes} initialSkills={skills} />
        )}
      </section>
    </div>
  );
}

export default App;
