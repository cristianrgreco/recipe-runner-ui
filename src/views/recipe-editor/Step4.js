import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import baseStyles from "./RecipeEditor.module.css";
import styles from "./Step4.module.css";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import Textarea from "../../components/Textarea";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Heading from "../../components/Heading";
import { List, ListItem } from "../../components/List";

export default function Step4({ isEdit, method, setMethod }) {
  const history = useHistory();

  const onClickBack = () => {
    history.push("/recipe-editor/step-3");
  };

  const onClickNext = () => {
    history.push("/recipe-editor/step-5");
  };

  return (
    <div className={baseStyles.Container}>
      <div className={baseStyles.Heading}>
        <Heading>{isEdit ? "Edit Recipe" : "Create Recipe"} (4/5)</Heading>
      </div>
      {method.length === 0 ? (
        <div className="row">
          <div className="input-field col s12">
            <MethodItemForm method={method} setMethod={setMethod} depth={"1"} />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="input-field col s12">
            <MethodItem method={method} setMethod={setMethod} depth={"1"} />
          </div>
        </div>
      )}
      <div className="row">
        <div className="input-field col s12">
          <div className={baseStyles.ButtonsContainer}>
            <Button secondary onClick={onClickBack}>
              Back
            </Button>
            <Button onClick={onClickNext}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MethodItem({ method, setMethod, depth }) {
  const incrementDepth = (depth, amount) => {
    return `${depth.slice(0, -1) + (Number(depth.slice(-1)) + amount)}`;
  };

  return (
    <div className={`${styles.Nested} ${depth === "1" ? styles.NestedFirst : ""}`}>
      <List className={styles.NoMargin}>
        {method.length > 0 &&
          method.map((methodItem, methodItemIndex) => (
            <ListItem key={methodItemIndex} className={baseStyles.Collection_Item_Container}>
              <EditMethodItemForm
                method={method}
                setMethod={setMethod}
                methodIndex={methodItemIndex}
                depth={incrementDepth(depth, methodItemIndex)}
              />
              <div className={styles.Collection_Nested}>
                <MethodItem
                  method={methodItem.next}
                  setMethod={setMethod}
                  depth={incrementDepth(depth, methodItemIndex) + ".1"}
                />
              </div>
            </ListItem>
          ))}
        <ListItem className={baseStyles.Collection_Item_Container}>
          <MethodItemForm method={method} setMethod={setMethod} depth={incrementDepth(depth, method.length)} />
        </ListItem>
      </List>
    </div>
  );
}

function MethodItemForm({ method, setMethod, depth }) {
  const [instruction, setInstruction] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("minutes");

  const elementId = () => depth.replace(/\./g, "_");

  const onInstructionChange = (e) => {
    setInstruction(e.target.value);
  };

  const onDurationChange = (e) => {
    setDuration(Number(e.target.value));
  };

  const onDurationUnitChange = (e) => {
    setDurationUnit(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (duration !== "") {
      method.push({
        instruction,
        alarm: {
          duration,
          durationUnit,
        },
        next: [],
      });
    } else {
      method.push({
        instruction,
        next: [],
      });
    }

    setMethod((currentMethod) => [...currentMethod]);

    setInstruction("");
    setDuration("");
    setDurationUnit("minutes");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={`row ${styles.NoMarginBottom}`}>
        <div className="input-field col s12">
          <Textarea
            required
            id={`instruction-${elementId(depth)}`}
            autoFocus
            value={instruction}
            onChange={onInstructionChange}
          />
          <label htmlFor={`instruction-${elementId(depth)}`}>Step {depth}</label>
        </div>
        <div className="input-field col s12 m12 l3">
          <Input
            id={`duration-${elementId(depth)}`}
            type="number"
            min="0"
            step=".1"
            value={duration}
            onChange={onDurationChange}
          />
          <label htmlFor={`duration-${elementId(depth)}`}>Duration (optional)</label>
        </div>
        <div className="input-field col s12 m12 l3">
          <Select
            id={`duration-unit-${elementId(depth)}`}
            disabled={duration === ""}
            value={durationUnit}
            onChange={onDurationUnitChange}
          >
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </Select>
        </div>
      </div>
      <div className={`row ${styles.NoMarginBottom}`}>
        <div className="input-field col s12">
          <Button type="submit">Add</Button>
        </div>
      </div>
    </form>
  );
}

function EditMethodItemForm({ method, setMethod, methodIndex, depth }) {
  const alarm = method[methodIndex].alarm ? method[methodIndex].alarm : {};

  const initialInstructionState = () => method[methodIndex].instruction;
  const initialDurationState = () => alarm.duration || "";
  const initialDurationUnitState = () => alarm.durationUnit || "minutes";

  const [instruction, setInstruction] = useState(initialInstructionState());
  const [duration, setDuration] = useState(initialDurationState());
  const [durationUnit, setDurationUnit] = useState(initialDurationUnitState());

  const elementId = () => depth.replace(/\./g, "_");

  const onInstructionChange = (e) => {
    const instruction = e.target.value;
    setInstruction(instruction);
    method[methodIndex] = { ...method[methodIndex], instruction };
    setMethod((currentMethod) => [...currentMethod]);
  };

  const onDurationChange = (e) => {
    const duration = Number(e.target.value);
    const alarm = method[methodIndex].alarm ? method[methodIndex].alarm : {};
    setDuration(duration);
    method[methodIndex] = { ...method[methodIndex], alarm: { ...alarm, duration, durationUnit } };
    setMethod((currentMethod) => [...currentMethod]);
  };

  const onDurationUnitChange = (e) => {
    const durationUnit = e.target.value;
    const alarm = method[methodIndex].alarm ? method[methodIndex].alarm : {};
    setDurationUnit(durationUnit);
    method[methodIndex] = { ...method[methodIndex], alarm: { ...alarm, duration, durationUnit } };
    setMethod((currentMethod) => [...currentMethod]);
  };

  const onDelete = () => {
    method.splice(methodIndex, 1);
    setMethod((currentMethod) => [...currentMethod]);
    if (method[methodIndex]) {
      setInstruction(initialInstructionState());
      setDuration(initialDurationState());
      setDurationUnit(initialDurationUnitState());
    }
  };

  return (
    <Fragment>
      <div className={`row ${styles.NoMarginBottom}`}>
        <div className="input-field col s10">
          <Textarea
            required
            id={`instruction-${elementId(depth)}`}
            value={instruction}
            onChange={onInstructionChange}
          />
          <label htmlFor={`instruction-${elementId(depth)}`}>Step {depth}</label>
        </div>
        <div className="input-field col s2">
          <Button danger floating onClick={onDelete}>
            <Icon name="delete" />
          </Button>
        </div>
      </div>
      <div className={`row ${styles.NoMarginBottom}`}>
        <div className="input-field col s12 m12 l3">
          <Input
            id={`duration-${elementId(depth)}`}
            type="number"
            min="0"
            step=".1"
            value={duration}
            onChange={onDurationChange}
          />
          <label htmlFor={`duration-${elementId(depth)}`}>Duration (optional)</label>
        </div>
        <div className="input-field col s12 m12 l3">
          <Select
            id={`duration-unit-${elementId(depth)}`}
            disabled={!duration}
            value={durationUnit}
            onChange={onDurationUnitChange}
          >
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </Select>
        </div>
      </div>
    </Fragment>
  );
}
