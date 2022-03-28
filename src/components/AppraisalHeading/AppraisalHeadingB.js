import React from "react";

const AppraisalHeadingB = ({
  title,
  number,
  total,
  target,
  objective,
  initiative,
  measures,
}) => {
  return (
    <>
      <section>
        <div>
          {number} out of {total}
        </div>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {title} Perspective
          </h1>
        </div>
        <div>
          <strong>Target:</strong> {target}
        </div>
        <div>
          <strong>Objective:</strong> {objective}
        </div>
        <div>
          <strong>Initiative:</strong> {initiative}
        </div>
        <div>
          <strong>Measure:</strong> {measures}
        </div>
      </section>
    </>
  );
};

export default AppraisalHeadingB;
