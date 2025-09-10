import * as React from "react";
import { useHistory } from "../contexts/HistoryContext";
import { Button } from "./elements";
import styles from "./HistoryPanel.module.css";

export const HistoryPanel: React.FC = () => {
  const { state, canUndo, canRedo, undo, redo } = useHistory();

  const formatTime = (ts: number) => new Date(ts).toLocaleTimeString();

  return (
    <div className={styles.historyPanel}>
      <div className={styles.historyControls}>
        <Button size="small" variant="secondary" onClick={() => undo()} disabled={!canUndo}>
          Undo
        </Button>
        <Button size="small" variant="secondary" onClick={() => redo()} disabled={!canRedo}>
          Redo
        </Button>
      </div>
      <ul className={styles.historyList}>
        {state.entries.map((entry, idx) => (
          <li key={entry.id} className={`${styles.historyItem} ${idx === state.currentIndex ? styles.historyItemCurrent : ""}`}>
            <span className={styles.historyAction}>{entry.action}</span>
            <span className={styles.historyTime}>{formatTime(entry.timestamp)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

HistoryPanel.displayName = "HistoryPanel";
