import { SKILL_LIST } from "../data/constants";

// SkillCheck component handles the skill check logic
function SkillCheck({
  setSelectedSkill,
  generateRandomNumber,
  rolledNumber,
  getSkillCheckResult,
  dc,
  setDc,
}) {
  const isDCValid = dc !== null && dc !== "";

  return (
    <section>
      <h2>Skill Check</h2>
      <div>
        Skill
        <select onChange={(e) => setSelectedSkill(e.target.value)}>
          {SKILL_LIST.map((skill) => (
            <option key={skill.name}>{skill.name}</option>
          ))}
        </select>
      </div>
      <div>
        DC
        <input type="number" value={dc} onChange={(e) => setDc(e.target.value)} />
      </div>
      <div>
        <button onClick={isDCValid ? generateRandomNumber : null} disabled={!isDCValid}>
          Roll
        </button>
      </div>
      <div>Rolled Number: {rolledNumber}</div>
      <div>
        Skill Check Result:
        <span>{getSkillCheckResult()}</span>
      </div>
      <div>{getSkillCheckResult() >= Number(dc) ? "Success! 🎉" : "Failure. 😞"}</div>
    </section>
  );
}

export default SkillCheck;
