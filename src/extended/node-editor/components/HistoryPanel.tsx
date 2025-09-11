import * as React from "react";
import { useHistory } from "../contexts/HistoryContext";
import { Button, H4 } from "./elements";
import { useI18n } from "../i18n";
import styles from "./HistoryPanel.module.css";
import inspectorStyles from "./InspectorPanel.module.css";

export const HistoryPanel: React.FC = () => {
  const { state, canUndo, canRedo, undo, redo } = useHistory();
  const { t } = useI18n();

  const formatTime = (ts: number) => new Date(ts).toLocaleTimeString();

  return (
    <div className={styles.historyPanel}>
      <H4 className={inspectorStyles.inspectorSectionTitle} aria-label={t('historyTitle') || 'History'}>
        {t('historyTitle') || 'History'}
      </H4>
      <div className={styles.historyControls}>
        <Button size="small" variant="secondary" onClick={() => undo()} disabled={!canUndo}>
          {t('historyUndo') || 'Undo'}
        </Button>
        <Button size="small" variant="secondary" onClick={() => redo()} disabled={!canRedo}>
          {t('historyRedo') || 'Redo'}
        </Button>
      </div>
      {state.entries.length === 0 ? (
        <div className={styles.historyItem}>
          <span className={styles.historyAction}>{t('historyEmpty') || 'No history yet'}</span>
        </div>
      ) : (
        <ul className={styles.historyList}>
          {state.entries.map((entry, idx) => (
            <li key={entry.id} className={`${styles.historyItem} ${idx === state.currentIndex ? styles.historyItemCurrent : ""}`}>
              <span className={styles.historyAction}>{entry.action}</span>
              <span className={styles.historyTime}>{formatTime(entry.timestamp)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

HistoryPanel.displayName = "HistoryPanel";
