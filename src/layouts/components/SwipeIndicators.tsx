import React from 'react';
import classes from './SwipeIndicators.module.css';

interface SwipeIndicatorsProps {
  count: number;
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

export const SwipeIndicators: React.FC<SwipeIndicatorsProps> = React.memo(({
  count,
  activeIndex,
  onIndexChange,
}) => {
  if (count <= 1) return null;

  const indicators = React.useMemo(
    () =>
      Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          className={classes.indicator}
          data-active={index === activeIndex}
          onClick={() => onIndexChange(index)}
          aria-label={`View ${index + 1}`}
          aria-current={index === activeIndex ? 'true' : 'false'}
          type="button"
        />
      )),
    [count, activeIndex, onIndexChange]
  );

  return (
    <nav 
      className={classes.indicators}
      role="tablist"
      aria-label="Navigation indicators"
    >
      {indicators}
    </nav>
  );
});

SwipeIndicators.displayName = 'SwipeIndicators';