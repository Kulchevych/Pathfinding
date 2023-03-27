import React, { useRef } from "react";
import classes from "./styles.module.scss";

export default function TableColumn({ peaks, peak, setPeaks }) {
  const startRef = useRef(null);
  const endRef = useRef(null);

  const changeStartValue = (event) => {
    const peakIndex = peaks.findIndex((item) => item === peak);
    const newPeak = { ...peaks[peakIndex] };

    newPeak.start = +event.target.textContent;

    if (newPeak.start <= 0) {
      newPeak.start = 1;
      event.target.textContent = 1;
    }

    setPeaks([
      ...peaks.slice(0, peakIndex),
      newPeak,
      ...peaks.slice(peakIndex + 1),
    ]);
  };

  const changeEndValue = (event) => {
    const peakIndex = peaks.findIndex((item) => item === peak);
    const newPeak = { ...peaks[peakIndex] };

    newPeak.end = +event.target.textContent;

    if (newPeak.end <= 0) {
      newPeak.end = 1;
      event.target.textContent = 1;
    }

    setPeaks([
      ...peaks.slice(0, peakIndex),
      newPeak,
      ...peaks.slice(peakIndex + 1),
    ]);
  };

  const changeDistance = (event) => {
    const peakIndex = peaks.findIndex((item) => item === peak);
    const newPeak = { ...peaks[peakIndex] };

    newPeak.distance = +event.target.textContent;

    if (newPeak.distance <= 0) {
      newPeak.distance = 1;
      event.target.textContent = 1;
    }

    setPeaks([
      ...peaks.slice(0, peakIndex),
      newPeak,
      ...peaks.slice(peakIndex + 1),
    ]);
  };

  const deletePeak = () => {
    const peakIndex = peaks.findIndex((item) => item === peak);

    setPeaks([
      ...peaks.slice(0, peakIndex),
      ...peaks.slice(peakIndex + 1),
    ]);
  }

  return (
    <div className={classes.column}>
      <div className={classes.row}>
        <div
          contentEditable
          onBlur={changeStartValue}
          ref={startRef}
          suppressContentEditableWarning={true}
        >
          {peak.start}
        </div>
        <div
          contentEditable
          onInput={changeEndValue}
          ref={endRef}
          suppressContentEditableWarning={true}
        >
          {peak.end}
        </div>
      </div>
      <div
        className={classes.row}
        contentEditable
        onInput={changeDistance}
        suppressContentEditableWarning={true}
      >
        {peak.distance}
      </div>

      <div className={classes.deletePeak} onClick={deletePeak} />
    </div>
  );
}
