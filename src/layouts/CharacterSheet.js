import { useCallback, useState } from "react";
import {
  ATTRIBUTE_LIST,
  CLASS_LIST,
  SKILL_LIST,
  INITIAL_ATTRIBUTE_VALUE,
  INITIAL_SKILL_VALUE,
} from "../data/constants";
import { calculateModifier } from "../utils/helper";
import useAttributes from "../hooks/useAttributes";
import useSkills from "../hooks/useSkills";
import { POST_CONFIG } from "../utils/apiConfig";
import SkillCheck from "../components/SkillCheck";
import AttributeList from "../components/AttributeList";
import ClassList from "../components/ClassList";
import SkillList from "../components/SkillList";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

// Main component that renders the character sheet and manages state
function CharacterSheet({ initialAttributes, initialSkills }) {
  // States
  const [rolledNumber, setRolledNumber] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(0);
  const [displayRequirements, setDisplayRequirements] = useState(null);

  // Initial Modifiers
  const initialModifiers = ATTRIBUTE_LIST.reduce(
    (acc, attribute) => ({
      ...acc,
      [attribute]: calculateModifier(initialAttributes[attribute] || INITIAL_ATTRIBUTE_VALUE),
    }),
    {}
  );

  const [modifiers, setModifiers] = useState(initialModifiers);

  // Attribute and Skill Hooks
  const { attributes, increaseAttribute, decreaseAttribute } = useAttributes(
    initialAttributes || initialModifiers,
    modifiers,
    setModifiers
  );

  const { skills, allowedSkillPoints, usedSkillPoints, increaseSkill, decreaseSkill } = useSkills(
    initialSkills ||
      SKILL_LIST.reduce(
        (acc, skill) => ({
          ...acc,
          [skill.name]: INITIAL_SKILL_VALUE,
        }),
        {}
      ),
    modifiers
  );

  // Utility Functions
  const hideRequirements = useCallback(() => setDisplayRequirements(null), []);
  const meetsClassRequirements = useCallback(
    (roleClass) =>
      !Object.keys(CLASS_LIST[roleClass]).find(
        (attribute) => attributes[attribute] < CLASS_LIST[roleClass][attribute]
      ),
    [attributes]
  );
  const generateRandomNumber = useCallback(
    () => setRolledNumber(Math.floor(Math.random() * 20) + 1),
    []
  );
  const getSkillCheckResult = useCallback(
    () =>
      skills[selectedSkill] +
      modifiers[SKILL_LIST.find((skill) => skill.name === selectedSkill).attributeModifier] +
      rolledNumber,
    [skills, selectedSkill, modifiers, rolledNumber]
  );

  // Save Data to Server
  const saveData = useCallback(async () => {
    try {
      const response = await fetch(baseURL, POST_CONFIG({ attributes, skills }));
      console.log("save response: ", response);

      if (!response.ok) {
        throw new Error(`Failed to save data: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, [attributes, skills]);

  return (
    <>
      <SkillCheck
        setSelectedSkill={setSelectedSkill}
        generateRandomNumber={generateRandomNumber}
        rolledNumber={rolledNumber}
        getSkillCheckResult={getSkillCheckResult}
        dc={dc}
        setDc={setDc}
      />
      <button onClick={saveData}>Save</button>
      <div className="flex flex-row">
        <AttributeList
          attributes={attributes}
          modifiers={modifiers}
          increaseAttribute={increaseAttribute}
          decreaseAttribute={decreaseAttribute}
        />
        <ClassList
          meetsClassRequirements={meetsClassRequirements}
          setDisplayRequirements={setDisplayRequirements}
          displayRequirements={displayRequirements}
          hideRequirements={hideRequirements}
        />

        <SkillList
          skills={skills}
          modifiers={modifiers}
          increaseSkill={increaseSkill}
          decreaseSkill={decreaseSkill}
          usedSkillPoints={usedSkillPoints}
          allowedSkillPoints={allowedSkillPoints}
        />
      </div>
    </>
  );
}

export default CharacterSheet;
