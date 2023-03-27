import React, { useEffect, useRef } from "react";
import classes from "./styles.module.scss";

let list = [];
let hTemp = [];

export default function Info({ hArray, peaks, peaksNumbers, isLoaded }) {
  const tableRef = useRef(null);

  useEffect(() => {
    list = [];
    hTemp = [];
  }, [isLoaded]);

  useEffect(() => {
    if (hArray.length === 0) {
      return;
    }
    const lastList = list?.slice(-1)?.flat();

    while (
      lastList.some((item) => hArray.map((h) => h.title).includes(item?.end))
    ) {
      const itemIndex = lastList.findIndex((item) =>
        hArray.map((h) => h.title).includes(item?.end)
      );

      lastList.splice(itemIndex, 1);
    }

    list.push([
      ...lastList,
      ...peaks.filter(
        (peak) =>
          peak.start === hArray[hArray.length - 1]?.title &&
          !hArray.map((h) => h.title).includes(peak?.end)
      ),
    ]);

    hTemp.push({ ...hArray[hArray.length - 1] });

    if (hArray.length === peaksNumbers.length - 1) {
      const lastList = list?.slice(-1)?.flat();

      while (
        lastList.some((item) => hArray.map((h) => h.title).includes(item?.end))
      ) {
        const itemIndex = lastList.findIndex((item) =>
          hArray.map((h) => h.title).includes(item?.end)
        );

        lastList.splice(itemIndex, 1);
      }

      list = [...list.slice(0, -1), lastList];
    }
  }, [hArray.length]);

  useEffect(() => {
    tableRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [list.length]);

  return (
    <div className={classes.Info}>
      {!!hArray.length &&
        hArray?.map((h, index) => {
          return (
            <div>
              <span className={classes.stepNumber}>{index + 1} Крок:</span>
              <div className={classes.step}>{`h${h.title} = ${h.value}`}</div>

              {list[index]?.map((item) => {
                const probH = item?.end;
                const startH = item?.start;
                const distanceH = item?.distance;

                const sum =
                  hTemp.find((hTemp) => hTemp.title === startH).value +
                  distanceH;

                return (
                  <div className={classes.row} ref={tableRef}>
                    {`h${probH} = h${startH} + ${distanceH} = ${sum}`}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
