import React from 'react';
import classNames from 'classnames';
import classes from './styles.module.scss';

export default function Peak({ peak, number, hArray }) {
  return (
    <div 
      className={classNames(classes.peak, 
        {[classes.active]: hArray?.some((peak) => +peak.title === number)})
      } 
      style={{ top: peak.y, left: peak.x }}
    >
      {number}
      {hArray?.find((h) => h.title === number) && 
        (<span className={classes.h}>{`h${number}=${hArray?.find((h) => h.title === number).value}`}</span>)
      }
    </div>
  )
}