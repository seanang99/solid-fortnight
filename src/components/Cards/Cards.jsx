import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { checkTitleAndVerse } from "../../utils/checkSM";

import "./style.scss";

/**
 * Renders card component with the customisable props
 * @params {title, subtitles, content, test, packDescription} props
 * @returns Card component
 */
const Cards = (props) => {
  const { title, subtitle, content, test, packDescription } = props;

  const [userTitle, setUserTitle] = useState("");
  const [userVerse, setUserVerse] = useState("");
  const [validateTitle, setValidateTitle] = useState(false);
  const [validateVerse, setValidateVerse] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState();

  const markTitleAndVerse = () => {
    const data = {
      title,
      verse: content,
      userTitle,
      userVerse,
    };
    const res = checkTitleAndVerse(data);
    setIsCorrect(res);
  };

  const handleOnSubmit = () => {
    // Validate Title and Verse inputs
    setValidateTitle(!userTitle);
    setValidateVerse(!userVerse);

    if (userTitle && userVerse) {
      markTitleAndVerse();
      setSubmitted(true);
    }
  };

  const handleFeedback = (isCorrect, title, content) => {
    const { correctTitle, correctVerse, correct } = isCorrect;
    let feedback = "";

    if (!correctTitle && !correctVerse) {
      feedback = "Incorrect Title and Verse!";
    } else if (!correctTitle) {
      feedback = "Incorrect Title!";
    } else if (!correctVerse) {
      feedback = "Incorrect Verse!";
    } else {
      feedback = "Correct Answer! Well done!";
    }

    const divClassName = `feedback__${correct ? "correct" : "wrong"}`;

    return (
      <>
        <p className={`feedback ${divClassName}`}>{feedback}</p>
        {!correctTitle ? (
          <div className={`correction-title ${divClassName}`}>{title}</div>
        ) : (
          <></>
        )}
        {!correctVerse ? (
          <div className={`correction-verse ${divClassName}`}>{content}</div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const handleClear = () => {
    // Clear title and verse input
    setUserTitle("");
    setUserVerse("");

    // Reset any warnings and hide correct answer
    setSubmitted(false);

  };

  return (
    <Card>
      {test ? (
        <>
          <Card.Header>{subtitle}</Card.Header>
          <Card.Body>
            <Form.Group controlId="Form.ControlTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                className={`form-input ${validateTitle ? "form-input-invalid" : ""}`}
                type="text"
                value={userTitle}
                onChange={(e) => {
                  setValidateTitle(!e.target.value); //Validate if empty
                  setUserTitle(e.target.value);
                }}
              />
              <p className={`form-control-validator${validateTitle ? "" : "__hidden"}`}>
                Title cannot be blank
              </p>
            </Form.Group>

            <Form.Group controlId="Form.ControlVerse">
              <Form.Label>Verse</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className={`form-input ${validateVerse ? "form-input-invalid" : ""}`}
                value={userVerse}
                onChange={(e) => {
                  setValidateVerse(!e.target.value); //Validate if empty
                  setUserVerse(e.target.value);
                }}
              />
              <p
                className={`form-control-validator${validateVerse ? "" : "__hidden"
                  }`}
              >
                Verse cannot be blank
              </p>
            </Form.Group>

            <Button
              className="form-button"
              variant="primary"
              value="Check"
              onClick={() => handleOnSubmit()}
            >Check</Button>
            <Button
              className="form-button"
              variant="danger"
              value="Clear"
              onClick={() => handleClear()}
            >Clear</Button>

            {submitted ? (
              <>
                <footer>{handleFeedback(isCorrect, title, content)}</footer>
              </>
            ) : (
              <></>
            )}
          </Card.Body>
        </>
      ) : (
        <>
          <Card.Header>{title}</Card.Header>
          <Card.Body>
            <div className="card__body">
              <div className="card___content">
                <p className="card__subtitle">{subtitle}</p>
                <p>{content}</p>
              </div>
              <div className="card__footer">
                <p>{packDescription}</p>
              </div>
            </div>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default Cards;
