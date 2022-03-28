import React from "react";

const AppraisalHeading = ({ title, description, number, total }) => {
  return (
    <>
      <section>
        <div>
          {number} out of {total}
        </div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{title}</h1>
        <span>{description}</span>
      </section>
    </>
  );
};

export default AppraisalHeading;
