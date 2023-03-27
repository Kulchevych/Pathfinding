import React from "react";
import classes from "./styles.module.scss";
import TableColumn from "./TableColumn";

export default function Table({ peaks, setPeaks }) {
  const addPeak = () => {
    setPeaks([
      ...peaks,
      {
        start: Math.max(...peaks.map((peak) => peak.end)),
        end: Math.max(...peaks.map((peak) => peak.end)) + 1,
        distance: 1,
      },
    ]);
  };

  return (
    <div className={classes.table}>
      <div className={classes.column}>
        <div className={classes.row}>Дуга</div>
        <div className={classes.row}>Обмеження</div>
      </div>
      {peaks.map((peak) => (
        <TableColumn
          peak={peak}
          key={`${peak.start} + ${peak.end}`}
          peaks={peaks}
          setPeaks={setPeaks}
        />
      ))}
      <div className={classes.addPeak} onClick={addPeak} />
    </div>
  );
}
