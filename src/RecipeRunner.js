import React, {Fragment, useEffect, useState} from 'react';
import beepMp3 from './res/beep.mp3';

export default function RecipeRunner({recipe}) {
    const [timers, setTimers] = useState([]);
    const [steps, setSteps] = useState(recipe.method);
    const [completedSteps, setCompletedSteps] = useState([]);

    useEffect(() => {
        if (timers.length > 0) {
            const intervalId = setInterval(() => setTimers(timers => timers
                .map(timer => ({...timer, duration: Math.max(0, timer.duration - 1000)}))), 1000);

            return () => clearInterval(intervalId)
        }
    });

    const nextSteps = completedStep => steps => [...(completedStep.next || []), ...steps];
    const isStepCompleted = step => completedSteps.length > 0 && completedSteps.some(completedStep => completedStep.instruction === step.instruction);
    const isTimerSetForStep = step => timers.some(timer => timer.name === step.instruction);
    const getTimerForStep = step => timers.find(timer => timer.name === step.instruction);

    return (
        <Fragment>
            <h3 className="header">Method</h3>
            {steps.length > 0 && (
                <ul className="collection">
                    {steps.map(step => (
                        <li key={step.instruction} className="collection-item">
                            <div className="section">
                                {step.alarm === undefined && isStepCompleted(step) && (
                                    <NoAlarmAndCompleted step={step}/>
                                )}
                                {step.alarm === undefined && !isStepCompleted(step) && (
                                    <NoAlarmAndInProgress
                                        step={step}
                                        setSteps={setSteps}
                                        setCompletedSteps={setCompletedSteps}
                                        nextSteps={nextSteps}/>
                                )}
                                {step.alarm !== undefined && isTimerSetForStep(step) && (
                                    <AlarmAndInProgress
                                        step={step}
                                        timer={getTimerForStep(step)}/>
                                )}
                                {step.alarm !== undefined && !isTimerSetForStep(step) && (
                                    <AlarmAndNotInProgress
                                        step={step}
                                        setSteps={setSteps}
                                        timers={timers}
                                        setTimers={setTimers}
                                        setCompletedSteps={setCompletedSteps}
                                        nextSteps={nextSteps}/>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>)
            }
        </Fragment>
    );
}

function NoAlarmAndCompleted({step}) {
    return (
        <Fragment>
            <span className="badge green white-text lighten-2">DONE</span>
            <div className="grey-text" style={{textDecoration: "line-through"}}>
                {step.instruction}
            </div>
        </Fragment>
    );
}

function NoAlarmAndInProgress({step, setSteps, setCompletedSteps, nextSteps}) {
    return (
        <Fragment>
            <div>{step.instruction}</div>
            <p className="caption"/>
            <a className="waves-effect waves-light red lighten-2 btn"
               onClick={() => {
                   setSteps(nextSteps(step));
                   setCompletedSteps(completedSteps => [...completedSteps, step]);
               }}>
                <i className="material-icons left">check</i>Done
            </a>
        </Fragment>
    );
}

function AlarmAndInProgress({step, timer}) {
    const formatTime = ms => {
        if (ms <= 0) {
            return "0";
        }

        const seconds = ms / 1000;
        const minutes = Math.floor(seconds / 60);

        if (minutes > 0) {
            return `${minutes}m ${seconds - minutes * 60}s`;
        } else {
            return `${seconds}s`
        }
    };

    return (
        <Fragment>
            {timer.duration === 0
                ? (
                    <Fragment>
                        <span className="badge green white-text lighten-2">DONE</span>
                        <div className="grey-text" style={{textDecoration: "line-through"}}>
                            {step.instruction}
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <span className="badge orange white-text lighten-2">{formatTime(timer.duration)}</span>
                        <div>{step.instruction}</div>
                    </Fragment>
                )}
        </Fragment>
    );
}

function AlarmAndNotInProgress({step, setTimers, timers, setSteps, setCompletedSteps, nextSteps}) {
    const addTimer = (timers, step) => [
        ...timers, {
            name: step.instruction,
            duration: step.alarm.duration
        }
    ];

    const alertOnCompletion = () => {
        window.M.toast({html: step.alarm.description});
        document.querySelector("#audio").play();
    };

    return (
        <Fragment>
            <audio id="audio" src={beepMp3} autoPlay={false}/>
            <div>{step.instruction}</div>
            <p className="caption"/>
            <a className="waves-effect waves-light red lighten-2 btn"
               onClick={() => {
                   setTimers(addTimer(timers, step));
                   setTimeout(() => {
                       setSteps(nextSteps(step));
                       setCompletedSteps(completedSteps => [...completedSteps, step]);
                       alertOnCompletion();
                   }, step.alarm.duration);
               }}>
                <i className="material-icons left">timer</i>Start timer
            </a>
        </Fragment>
    );
}
