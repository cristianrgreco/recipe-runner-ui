import React, { Fragment, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import moment from "moment";
import { timeRemaining } from "./time";
import { Button } from "./components/Button";
import { Icon } from "./components/Icon";
import styles from "./RecipeRunner.module.css";
import Badge from "./components/Badge";
import { List, ListItem } from "./components/List";

export default function RecipeRunner({ recipe }) {
  const [timers, setTimers] = useState([]);
  const [steps, setSteps] = useState(recipe.method);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    if (timers.length > 0) {
      const intervalId = setInterval(() => setTimers((timers) => [...timers]), 1000);
      return () => clearInterval(intervalId);
    }
  });

  const nextSteps = (completedStep) => (steps) => {
    return [...(completedStep.next || []), ...steps];
  };

  const isStepCompleted = (step) => {
    return (
      completedSteps.length > 0 &&
      completedSteps.some((completedStep) => completedStep.instruction === step.instruction)
    );
  };

  const getTimerForStep = (step) => {
    return timers.find((timer) => timer.name === step.instruction);
  };

  const isTimerSetForStep = (step) => {
    return timers.some((timer) => timer.name === step.instruction);
  };

  const isTimerPausedForStep = (step) => {
    const timer = getTimerForStep(step);
    return timer.paused === true;
  };

  const isTimerCompleteForStep = (step) => {
    const timer = getTimerForStep(step);
    return !timer.paused && moment().isSameOrAfter(timer.endTime);
  };

  const pauseTimer = (step) => async (timer) => {
    setTimers((timers) => {
      const timersWithoutTimer = timers.filter((aTimer) => aTimer !== timer);
      timersWithoutTimer.push({
        ...timer,
        paused: true,
        pausedAt: moment(),
      });
      return timersWithoutTimer;
    });
    await cancelPushNotification(step);
  };

  const resumeTimer = (step) => async (timer) => {
    const timeElapsedMs = moment().diff(timer.pausedAt, "ms");
    const newTimer = {
      ...timer,
      paused: false,
      pausedAt: undefined,
      endTime: timer.endTime.add(timeElapsedMs, "ms"),
    };
    setTimers((timers) => {
      const timersWithoutTimer = timers.filter((aTimer) => aTimer !== timer);
      timersWithoutTimer.push(newTimer);
      return timersWithoutTimer;
    });
    await registerPushNotification(step, newTimer.endTime);
  };

  const stepsCompleted = [];
  const stepsToDo = [];

  return (
    <Fragment>
      <audio id="audio" src="/audio/beep.mp3" autoPlay={false} />
      {steps.length > 0 && (
        <List>
          {steps.map((step) => {
            if (step.alarm === undefined && isStepCompleted(step)) {
              stepsCompleted.unshift({ alarm: false, step });
            } else if (step.alarm !== undefined && isTimerSetForStep(step) && isTimerCompleteForStep(step)) {
              stepsCompleted.unshift({ alarm: true, step });
            } else {
              stepsToDo.push(step);
            }
          })}
          {stepsCompleted.map(({ alarm, step }) => {
            if (alarm) {
              return (
                <ListItem key={step.instruction}>
                  <div className="section">
                    <AlarmAndComplete
                      step={step}
                      setSteps={setSteps}
                      setCompletedSteps={setCompletedSteps}
                      nextSteps={nextSteps}
                    />
                  </div>
                </ListItem>
              );
            } else {
              return (
                <ListItem key={step.instruction}>
                  <div className="section">
                    <NoAlarmAndComplete step={step} />
                  </div>
                </ListItem>
              );
            }
          })}
          {stepsToDo.map((step) => (
            <Fragment key={step.instruction}>
              <ListItem>
                <div className="section">
                  {step.alarm === undefined && !isStepCompleted(step) && (
                    <NoAlarmAndInProgress
                      step={step}
                      setSteps={setSteps}
                      setCompletedSteps={setCompletedSteps}
                      nextSteps={nextSteps}
                    />
                  )}
                  {step.alarm !== undefined && !isTimerSetForStep(step) && (
                    <AlarmAndReady step={step} timers={timers} setTimers={setTimers} />
                  )}
                  {step.alarm !== undefined &&
                    isTimerSetForStep(step) &&
                    !isTimerPausedForStep(step) &&
                    !isTimerCompleteForStep(step) && (
                      <AlarmAndInProgress step={step} timer={getTimerForStep(step)} pauseTimer={pauseTimer(step)} />
                    )}
                  {step.alarm !== undefined &&
                    isTimerSetForStep(step) &&
                    isTimerPausedForStep(step) &&
                    !isTimerCompleteForStep(step) && (
                      <AlarmAndPaused step={step} timer={getTimerForStep(step)} resumeTimer={resumeTimer(step)} />
                    )}
                </div>
              </ListItem>
              {step.next.map((nextStep) => (
                <ListItem key={nextStep.instruction}>
                  <div className="section">
                    <NextStep step={nextStep} />
                  </div>
                </ListItem>
              ))}
            </Fragment>
          ))}
        </List>
      )}
    </Fragment>
  );
}

function NextStep({ step }) {
  return (
    <Fragment>
      <Badge>NEXT</Badge>
      <div className={styles.Next}>{step.instruction}</div>
    </Fragment>
  );
}

function NoAlarmAndComplete({ step }) {
  return (
    <Fragment>
      <Badge green>DONE</Badge>
      <div className={styles.Complete}>{step.instruction}</div>
    </Fragment>
  );
}

function NoAlarmAndInProgress({ step, setSteps, setCompletedSteps, nextSteps }) {
  const onClick = () => {
    setSteps(nextSteps(step));
    setCompletedSteps((completedSteps) => [...completedSteps, step]);
  };

  return (
    <Fragment>
      <div>{step.instruction}</div>
      <p className="caption" />
      <Button onClick={onClick}>
        <Icon name="check" position="left" />
        DONE
      </Button>
    </Fragment>
  );
}

function AlarmAndComplete({ step, setSteps, setCompletedSteps, nextSteps }) {
  const alertOnCompletion = () => {
    window.M.toast({
      html: ReactDOMServer.renderToStaticMarkup(
        <span className={styles.ToastContainer}>DONE: {step.instruction}</span>
      ),
      classes: styles.Toast,
      displayLength: 60000,
    });

    document.querySelector("#audio").play();

    if (navigator.vibrate) {
      navigator.vibrate(500);
    }
  };

  useEffect(() => {
    setSteps(nextSteps(step));
    setCompletedSteps((completedSteps) => [...completedSteps, step]);
    alertOnCompletion();
  }, []);

  return (
    <Fragment>
      <Badge green>DONE</Badge>
      <div className={styles.Complete}>{step.instruction}</div>
    </Fragment>
  );
}

function AlarmAndInProgress({ step, timer, pauseTimer }) {
  return (
    <div className={styles.AlarmContainer}>
      <div className={styles.AlarmControlsContainer}>
        <div className={styles.AlarmControlsButtonContainer}>
          <Button warn floating onClick={() => pauseTimer(timer)}>
            <Icon name="pause" />
          </Button>
        </div>
        <div>{step.instruction}</div>
      </div>
      <Badge orange>{timeRemaining(moment(), timer.endTime)}</Badge>
    </div>
  );
}

function AlarmAndPaused({ step, timer, resumeTimer }) {
  return (
    <div className={styles.AlarmContainer}>
      <div className={styles.AlarmControlsContainer}>
        <div className={styles.AlarmControlsButtonContainer}>
          <Button floating onClick={() => resumeTimer(timer)}>
            <Icon name="play_arrow" />
          </Button>
        </div>
        <div>{step.instruction}</div>
      </div>
      <Badge orange>{timeRemaining(timer.pausedAt, timer.endTime)}</Badge>
    </div>
  );
}

function AlarmAndReady({ step, setTimers, timers }) {
  const calculateEndTime = (step) => moment().add(step.alarm.duration, step.alarm.durationUnit || "ms");
  const endTime = calculateEndTime(step);

  const addTimer = (timers, step) => [
    ...timers,
    {
      name: step.instruction,
      endTime: calculateEndTime(step),
    },
  ];

  const onClick = async () => {
    await registerPushNotification(step, endTime);
    setTimers(addTimer(timers, step));
  };

  return (
    <Fragment>
      <div>{step.instruction}</div>
      <p className="caption" />
      <Button onClick={onClick}>
        <Icon name="timer" position="left" />
        Start timer
      </Button>
    </Fragment>
  );
}

async function registerPushNotification(step, endTime) {
  if ("showTrigger" in Notification.prototype) {
    const serviceWorkerRegistration = await navigator.serviceWorker.getRegistration();

    if ((await Notification.requestPermission()) === "granted") {
      const triggerDate = Date.now() + endTime.diff(moment(), "ms");

      await serviceWorkerRegistration.showNotification("La Cocina Leon", {
        tag: step.instruction,
        body: `⏰ ${step.instruction}`,
        // eslint-disable-next-line
        showTrigger: new TimestampTrigger(triggerDate),
        badge: "/logo.png",
        icon: "/logo.png",
      });
    }
  }
}

async function cancelPushNotification(step) {
  const registration = await navigator.serviceWorker.getRegistration();
  const notifications = await registration.getNotifications({ tag: step.instruction, includeTriggered: true });
  notifications.forEach((notification) => notification.close());
}
