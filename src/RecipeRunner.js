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

  steps.map((step) => {
    if (isStepCompleted(step) || (isTimerSetForStep(step) && isTimerCompleteForStep(step))) {
      if (step.alarm) {
        stepsCompleted.push({
          step,
          component: (
            <AlarmAndComplete
              step={step}
              setSteps={setSteps}
              setCompletedSteps={setCompletedSteps}
              nextSteps={nextSteps}
            />
          ),
        });
      } else {
        stepsCompleted.push({
          step,
          component: <NoAlarmAndComplete step={step} />,
        });
      }
    } else {
      if (step.alarm) {
        if (!isTimerSetForStep(step)) {
          stepsToDo.push({
            step,
            component: <AlarmAndReady step={step} timers={timers} setTimers={setTimers} />,
          });
        } else {
          if (isTimerPausedForStep(step)) {
            stepsToDo.push({
              step,
              component: <AlarmAndPaused step={step} timer={getTimerForStep(step)} resumeTimer={resumeTimer(step)} />,
            });
          } else {
            stepsToDo.push({
              step,
              component: <AlarmAndInProgress step={step} timer={getTimerForStep(step)} pauseTimer={pauseTimer(step)} />,
            });
          }
        }
      } else {
        stepsToDo.push({
          step,
          component: (
            <NoAlarmAndInProgress
              step={step}
              setSteps={setSteps}
              setCompletedSteps={setCompletedSteps}
              nextSteps={nextSteps}
            />
          ),
        });
      }
    }
  });

  return (
    <Fragment>
      <audio id="audio" src="/audio/beep.mp3" autoPlay={false} />
      {steps.length > 0 && (
        <List>
          {stepsCompleted.map(({ step, component }) => (
            <ListItem key={step.instruction}>
              <div className="section">{component}</div>
            </ListItem>
          ))}
          {stepsToDo.map(({ step, component }) => (
            <Fragment key={step.instruction}>
              <ListItem>
                <div className="section">{component}</div>
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
      <div data-qa="no-alarm-and-complete" className={styles.Complete}>
        {step.instruction}
      </div>
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
      <div data-qa="no-alarm-and-in-progress">{step.instruction}</div>
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
      <div data-qa="alarm-and-complete" className={styles.Complete}>
        {step.instruction}
      </div>
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
        <div data-qa="alarm-and-in-progress">{step.instruction}</div>
      </div>
      <div className={styles.AlarmControlsBadgeContainer}>
        <Badge orange>{timeRemaining(moment(), timer.endTime)}</Badge>
      </div>
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
        <div data-qa="alarm-and-paused">{step.instruction}</div>
      </div>
      <div className={styles.AlarmControlsBadgeContainer}>
        <Badge orange>{timeRemaining(timer.pausedAt, timer.endTime)}</Badge>
      </div>
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
      <div data-qa="alarm-and-ready">{step.instruction}</div>
      <p className="caption" />
      <Button onClick={onClick}>
        <Icon name="timer" position="left" />
        Start timer
      </Button>
    </Fragment>
  );
}

async function registerPushNotification(step, endTime) {
  if (typeof Notification !== "undefined" && "showTrigger" in Notification.prototype) {
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
  if (navigator.serviceWorker) {
    const registration = await navigator.serviceWorker.getRegistration();
    const notifications = await registration.getNotifications({ tag: step.instruction, includeTriggered: true });
    notifications.forEach((notification) => notification.close());
  }
}
