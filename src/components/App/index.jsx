import React, { useState, useEffect } from "react";
import classes from "./styles.module.scss";
import Graph from "../Graph";
import Inputs from "../Inputs";
import Button from "../Button";
import Info from "../Info";
import AboutProduct from "../AboutProduct";
import Table from "../Table";

let positions = [];

const setPeakPosition = (peak, n) => {
  peak.x = Math.floor(Math.random() * (n * 200 - 50) + 50);
  peak.y = Math.floor(Math.random() * (n * 100 - 50) + 50);

  while (
    positions.some(
      (position) =>
        Math.abs(position[0] - peak.x) <= 160 &&
        Math.abs(position[1] - peak.y) <= 160
    )
  ) {
    peak.x = Math.floor(Math.random() * (n * 200 - 50) + 50);
    peak.y = Math.floor(Math.random() * (n * 100 - 50) + 50);
  }

  positions.push([peak.x, peak.y]);
};

let values = [];
let hArray = [];
let lines = [];
let temp = 0;

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(0);
  const [peaks, setPeaks] = useState([]);
  const [peakNumbers, setPeakNumbers] = useState([]);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    positions = [];
    peakNumbers?.forEach((peak) => setPeakPosition(peak, peakNumbers.length));
  }, [peakNumbers]);

  const executeAlg = () => {
    const newDistance = JSON.parse(
      JSON.stringify(
        peaks.filter(
          (peak) =>
            peak.start === hArray[hArray.length - 1]?.title &&
            !hArray.map((h) => h.title).includes(peak?.end)
        )
      )
    );

    for (let i = 0; i < newDistance.length; i++) {
      newDistance[i].distance += temp;
    }

    for (let i = 0; i < values.length; i++) {
      if (hArray.map((h) => h.title).includes(values[i]?.end)) {
        values.splice(i, 1);
      }
    }

    values.push(...newDistance);

    let min = values[0];
    for (let i = 1; i < values.length; i++) {
      if (values[i]?.distance < min?.distance) {
        min = values[i];
      }
    }

    if (min) {
      hArray.push({ title: min?.end, value: min?.distance });
    }

    temp = min?.distance;
    lines.push(values.find((value) => min === value));
    values.splice(
      values.findIndex((value) => min === value),
      1
    );
  };

  const start = () => {
    setIsLoaded(true);

    if (hArray.length === peakNumbers.length) {
      return;
    }

    setIsStarted(true);

    hArray = [{ title: 1, value: 0 }];

    let counter = 1;
    const i = setInterval(() => {
      executeAlg();
      setIsRefreshed(counter);

      counter++;
      if (counter === peakNumbers.length) {
        clearInterval(i);
        setIsStarted(false);
      }
    }, 2000);
  };

  const reset = () => {
    hArray = [];
    values = [];
    lines = [];
    temp = 0;
    setIsRefreshed(0);
  };

  const generatePosition = () => {
    positions = [];
    peakNumbers?.forEach((peak) => setPeakPosition(peak, peakNumbers.length));
    setIsRefreshed(!isRefreshed);
  };

  useEffect(() => {
    reset();
    generatePosition();
  }, [peaks, peakNumbers]);

  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <div className={classes.flexContainer}>
          {isLoaded && (
            <div className={classes.buttons}>
              <Button
                onClick={start}
                disabled={isStarted || hArray.length}
                text="Запустити"
              />
              <Button
                onClick={reset}
                disabled={isStarted || lines.length === 0}
                text="Очистити"
              />
              <Button
                onClick={generatePosition}
                disabled={isStarted}
                text="Змінити розташування"
              />
            </div>
          )}
          <Inputs
            setIsLoaded={setIsLoaded}
            setPeaks={setPeaks}
            peaks={peaks}
            setPeakNumbers={setPeakNumbers}
            started={isStarted}
            reset={reset}
            n={n}
            setN={setN}
          />
          <Button
            onClick={() => setIsPopupActive(true)}
            disabled={isStarted}
            text="Про програму"
          />
        </div>
        {!!peaks.length && (
          <Table
            peaks={peaks}
            setPeaks={setPeaks}
            isStarted={isStarted}
          />
        )}
      </header>
      {isLoaded && (
        <div className={classes.container}>
          <Graph
            peaks={peaks}
            peakNumbers={peakNumbers}
            hArray={hArray}
            lines={lines}
            isLoaded={isLoaded}
          />
          <Info
            hArray={hArray}
            peaks={peaks}
            peaksNumbers={peakNumbers}
            isLoaded={isLoaded}
          />
        </div>
      )}
      {isPopupActive && (
        <AboutProduct handleClose={() => setIsPopupActive(false)} />
      )}
    </div>
  );
}
