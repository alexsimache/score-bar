import { FC } from "react";
import "./styles/style.css";
import _ from "lodash";

interface Score {
  score: number;
  maxLimit?: number;
  barWeight?: number;
  steps?: Record<string, string | number | number[]>[];
}

const BmiScore: FC<Score> = ({ score, maxLimit = 100, steps, barWeight }): JSX.Element => {
  // convert score number into percentage from maxLimit
  const convertNumberToPercentage = (number: any, max: number) => {
    return (number / max) * 100;
  };

  let percentageScore = convertNumberToPercentage(score, maxLimit);
  if (!Array.isArray(steps) || !steps.length || score < 0) {
    percentageScore = 0;
  }
  if (score > maxLimit) {
    percentageScore = 98;
  }

  const renderSteps = () => {
    if (!Array.isArray(steps) || !steps.length) {
      return (
        <li className="section" style={{ width: "100%" }}>
          <div className="section-bar" style={{ backgroundColor: "#c4c4c4" }} />
          <div className="label-wrapper">
            <p className="label">Default step</p>
          </div>
        </li>
      );
    }
    return steps.map((step: any) => {
      const { value, label, color } = step;
      const width = convertNumberToPercentage(value[1] - value[0], maxLimit);
      return (
        <li
          key={_.uniqueId()}
          className="section"
          style={{
            width: `${width}%`,
          }}
        >
          <div className="section-bar" style={{ backgroundColor: color, height: barWeight }} />
          <div className="label-wrapper">
            <p className="label">{label}</p>
          </div>
        </li>
      );
    });
  };
  return (
    <div className="score-bar">
      <div className="score-bar__header">{score}</div>
      <div className="score-bar__wrapper">
        <div className="score_bar__score" style={{ left: `${percentageScore}%` }} />
        <ul className="score-bar__sections">{renderSteps()}</ul>
      </div>
    </div>
  );
};

BmiScore.defaultProps = {
  maxLimit: 100,
  steps: [],
  barWeight: 50,
};

export default BmiScore;
