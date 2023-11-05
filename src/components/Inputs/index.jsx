import React, { useState, useEffect, useRef } from "react";
import Button from "../Button";
import classes from "./styles.module.scss";

export default function Inputs({
  n,
  setN,
  started,
  setIsLoaded,
  setPeaks,
  peaks,
  setPeakNumbers,
  reset,
}) {
  const [isStarted, setIsStarted] = useState(true);
  const [fileContent, setFileContent] = useState("");

  const fileRef = useRef();

  const handleFileUpload = (event) => {
    setPeaks([]);
    setPeakNumbers([]);
    setN("");

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      setFileContent(reader.result);
    };

    reader.onerror = () => {
      console.error(reader.error);
    };
  };

  useEffect(() => {
    if (fileContent) {
      const tempArr = fileContent.trim().split("\n");
      console.log(tempArr);

      tempArr?.forEach((arr) => {
        const [start, end, distance] = arr.split(" ");
        setPeaks((prev) => [
          ...prev,
          ...[{ start: +start, end: +end, distance: +distance }],
        ]);
      });
    }
  }, [fileContent]);

  useEffect(() => {
    if (fileContent && peaks.length) {
      setN(Math.max(...peaks?.map((peak) => [peak.start, peak.end]).flat()));

      setPeakNumbers(Array.from({length: n}, () => ({ x: 0, y: 0 })));
    }
  }, [peaks, n, peaks.length]);

  const buttonValidation = n.length || peaks.length;

  return (
    <div className={classes.Inputs}>
      {isStarted ? (
        <>
          {!!buttonValidation && (
            <>
              <span className={classes.label}>Кількість вершин: </span>
              <div value={n} className={classes.n}>
                {n}
              </div>
            </>
          )}
          <Button
            text="Старт"
            onClick={() => {
              setIsLoaded(true);
              setIsStarted(false);
            }}
            disabled={!buttonValidation}
          />

          <label htmlFor="photo">Завантажити файл</label>
          <input
            id="photo"
            className={classes.file}
            type="file"
            onChange={handleFileUpload}
            ref={fileRef}
            accept="text/plain"
          />
        </>
      ) : (
        <Button
          text="Змінити значення"
          onClick={() => {
            setPeaks([]);
            setN("");
            setFileContent(null);
            setPeakNumbers([]);
            reset();
            setIsLoaded(false);
            setIsStarted(true);
          }}
          disabled={started}
        />
      )}
    </div>
  );
}
