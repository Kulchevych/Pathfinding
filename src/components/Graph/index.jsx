import React, { useState } from "react";
import Peak from "../Peak";
import ScrollContainer from "react-indiana-drag-scroll";
import classes from "./styles.module.scss";
import classNames from "classnames";

export default function Graph({ peaks, peakNumbers, hArray, lines, isLoaded }) {
  const [sizeValue, setSizeValue] = useState(1);

  const increaseValue = () => {
    if (sizeValue + 0.1 > 1) {
      return;
    }

    setSizeValue((prev) => prev + 0.1);
  };
  const decreaseValue = () => {
    if (sizeValue - 0.1 < 0.4) {
      return;
    }

    setSizeValue((prev) => prev - 0.1);
  };

  return (
    <>
      <ScrollContainer className={classes.Graph}>
        <div
          className={classes.container}
          style={{
            width: peakNumbers.length * 200 + 200,
            height: peakNumbers.length * 100 + 200,
            transform: `scale(${sizeValue})`,
          }}
        >
          {isLoaded && (
            <>
              {peakNumbers.map((peak, index) => {
                return (
                  <div key={`peak${index}`}>
                    <Peak peak={peak} number={index + 1} hArray={hArray} />
                  </div>
                );
              })}
              {peaks.map(
                (peak, index) =>
                  index !== peaks.length && (
                    <div key={`peak${index}`}>
                      <svg className={classes.line}>
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="19"
                            markerHeight="7"
                            refX="19"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" />
                          </marker>
                        </defs>
                        <line
                          x1={peakNumbers[peak?.start - 1]?.x + 40}
                          y1={peakNumbers[peak?.start - 1]?.y + 40}
                          x2={peakNumbers[peak?.end - 1]?.x + 40}
                          y2={peakNumbers[peak?.end - 1]?.y + 40}
                          stroke={
                            !lines.some(
                              (line) =>
                                peak?.start === line?.start &&
                                peak?.end === line?.end
                            )
                              ? "black"
                              : "green"
                          }
                          strokeWidth="4px"
                          marker-end="url(#arrowhead)"
                        />
                      </svg>
                      <span
                        className={classes.text}
                        style={{
                          left:
                            (peakNumbers[peak?.start - 1]?.x +
                              peakNumbers[peak?.end - 1]?.x +
                              40) /
                            2,
                          top:
                            (peakNumbers[peak?.start - 1]?.y +
                              peakNumbers[peak?.end - 1]?.y +
                              40) /
                            2,
                        }}
                      >
                        {peak?.distance}
                      </span>
                    </div>
                  )
              )}
            </>
          )}
        </div>
      </ScrollContainer>
      {isLoaded && (
        <div className={classes.buttons}>
          <button
            className={classNames(classes.increase, {
              [classes.disabled]: sizeValue === 1,
            })}
            onClick={increaseValue}
          />
          <button
            className={classNames(classes.decrease, {
              [classes.disabled]: String(sizeValue).slice(0, 3) === "0.4",
            })}
            onClick={decreaseValue}
          />
        </div>
      )}
    </>
  );
}
