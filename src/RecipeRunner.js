import React, {Fragment, useEffect, useState} from 'react';
import moment from 'moment';
import {formatTime, timeRemaining} from "./time";
import {Button} from "./components/Button";
import {Icon} from "./components/Icon";
import config from './config';

export default function RecipeRunner({recipe}) {
    const [timers, setTimers] = useState([]);
    const [steps, setSteps] = useState(recipe.method);
    const [completedSteps, setCompletedSteps] = useState([]);

    useEffect(() => {
        if (timers.length > 0) {
            const intervalId = setInterval(() => setTimers(timers => [...timers]), 1000);
            return () => clearInterval(intervalId)
        }
    });

    const nextSteps = completedStep => steps => {
        return [...(completedStep.next || []), ...steps];
    };

    const isStepCompleted = step => {
        return completedSteps.length > 0
            && completedSteps.some(completedStep => completedStep.instruction === step.instruction);
    };

    const getTimerForStep = step => {
        return timers.find(timer => timer.name === step.instruction);
    };

    const isTimerSetForStep = step => {
        return timers.some(timer => timer.name === step.instruction);
    };

    const isTimerCompleteForStep = step => {
        const timer = getTimerForStep(step);
        return moment().isSameOrAfter(timer.endTime);
    };

    return (
        <Fragment>
            <audio id="audio" src="/audio/beep.mp3" autoPlay={false}/>
            <div className="row">
                <div className="col">
                    <Icon name="person" style={{verticalAlign: 'bottom'}}/>
                    <span style={{verticalAlign: 'bottom'}}>{recipe.serves}</span>
                </div>
                <div className="col">
                    <Icon name="timer" style={{verticalAlign: 'bottom'}}/>
                    <span style={{verticalAlign: 'bottom'}}>{formatTime(recipe.duration)}</span>
                </div>
            </div>
            <div className="section">
                {steps.length > 0 && (
                    <ul className="collection">
                        {steps.map(step => (
                            <li key={step.instruction} className="collection-item">
                                <div className="section">
                                    {step.alarm === undefined && isStepCompleted(step) && (
                                        <NoAlarmAndComplete step={step}/>
                                    )}
                                    {step.alarm === undefined && !isStepCompleted(step) && (
                                        <NoAlarmAndInProgress
                                            step={step}
                                            setSteps={setSteps}
                                            setCompletedSteps={setCompletedSteps}
                                            nextSteps={nextSteps}/>
                                    )}
                                    {step.alarm !== undefined && !isTimerSetForStep(step) && (
                                        <AlarmAndReady
                                            step={step}
                                            timers={timers}
                                            setTimers={setTimers}/>
                                    )}
                                    {step.alarm !== undefined && isTimerSetForStep(step) && !isTimerCompleteForStep(step) && (
                                        <AlarmAndInProgress
                                            step={step}
                                            timer={getTimerForStep(step)}/>
                                    )}
                                    {step.alarm !== undefined && isTimerSetForStep(step) && isTimerCompleteForStep(step) && (
                                        <AlarmAndComplete
                                            step={step}
                                            setSteps={setSteps}
                                            setCompletedSteps={setCompletedSteps}
                                            nextSteps={nextSteps}
                                        />
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>)
                }
            </div>
        </Fragment>
    );
}

function NoAlarmAndComplete({step}) {
    return (
        <Fragment>
            <span className={`badge green white-text ${config.colorAlteration}`}>DONE</span>
            <div className="grey-text" style={{textDecoration: "line-through"}}>
                {step.instruction}
            </div>
        </Fragment>
    );
}

function NoAlarmAndInProgress({step, setSteps, setCompletedSteps, nextSteps}) {
    const onClick = () => {
        setSteps(nextSteps(step));
        setCompletedSteps(completedSteps => [...completedSteps, step]);
    };

    return (
        <Fragment>
            <div>{step.instruction}</div>
            <p className="caption"/>
            <Button onClick={onClick}>
                <Icon name="check" position="left" />DONE
            </Button>
        </Fragment>
    );
}

function AlarmAndComplete({step, setSteps, setCompletedSteps, nextSteps}) {
    const alertOnCompletion = () => {
        window.M.toast({
            html: step.alarm.description,
            displayLength: 10000
        });

        document.querySelector("#audio").play();

        if (navigator.vibrate) {
            navigator.vibrate(500);
        }
    };

    useEffect(() => {
        setSteps(nextSteps(step));
        setCompletedSteps(completedSteps => [...completedSteps, step]);
        alertOnCompletion();
    }, []);

    return (
        <Fragment>
            <span className={`badge green white-text ${config.colorAlteration}`}>DONE</span>
            <div className="grey-text" style={{textDecoration: "line-through"}}>
                {step.instruction}
            </div>
        </Fragment>
    );
}

function AlarmAndInProgress({step, timer}) {
    return (
        <Fragment>
            <span className={`badge orange white-text ${config.colorAlteration}`}>{timeRemaining(moment(), timer.endTime)}</span>
            <div>{step.instruction}</div>
        </Fragment>
    );
}

function AlarmAndReady({step, setTimers, timers}) {
    const addTimer = (timers, step) => [
        ...timers, {
            name: step.instruction,
            endTime: moment().add(step.alarm.duration, 'ms'),
        }
    ];

    const onClick = () => {
        setTimers(addTimer(timers, step))
    };

    return (
        <Fragment>
            <div>{step.instruction}</div>
            <p className="caption"/>
            <Button onClick={onClick}>
                <Icon name="timer" position="left"/>Start timer
            </Button>
        </Fragment>
    );
}
