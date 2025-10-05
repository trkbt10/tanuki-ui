import * as React from "react";
import { useNodeCanvas } from "../contexts/NodeCanvasContext";
import { Input, Label, SwitchInput } from "../components/elements";
import { useI18n } from "../i18n";
import styles from "./EditorSettingsPanel.module.css";

/**
 * Grid settings component
 */
export const GridSettings: React.FC = () => {
  const { state: canvasState, dispatch: canvasDispatch, actions: canvasActions } = useNodeCanvas();
  const { t } = useI18n();

  return (
    <>
      <div className={styles.settingsField}>
        <SwitchInput
          id="grid-show"
          checked={canvasState.gridSettings.showGrid}
          onChange={(checked) => canvasDispatch(canvasActions.updateGridSettings({ showGrid: checked }))}
          label={t("inspectorShowGrid")}
          size="medium"
        />
      </div>
      <div className={styles.settingsField}>
        <SwitchInput
          id="grid-snap"
          checked={canvasState.gridSettings.snapToGrid}
          onChange={(checked) => canvasDispatch(canvasActions.updateGridSettings({ snapToGrid: checked }))}
          label={t("inspectorSnapToGrid")}
          size="medium"
        />
      </div>
      <div className={styles.settingsField}>
        <Label htmlFor="grid-size">
          {t("inspectorGridSize")}:
          <Input
            id="grid-size"
            name="gridSize"
            type="number"
            className={styles.settingsInput}
            value={canvasState.gridSettings.size}
            min={10}
            max={100}
            step={5}
            onChange={(e) => {
              const size = parseInt(e.target.value, 10);
              if (!isNaN(size) && size > 0) {
                canvasDispatch(
                  canvasActions.updateGridSettings({
                    size,
                  })
                );
              }
            }}
            aria-label="Grid size in pixels"
          />
        </Label>
      </div>
      <div className={styles.settingsField}>
        <Label htmlFor="snap-threshold">
          {t("inspectorSnapThreshold")}:
          <Input
            id="snap-threshold"
            name="snapThreshold"
            type="number"
            className={styles.settingsInput}
            value={canvasState.gridSettings.snapThreshold}
            min={1}
            max={20}
            step={1}
            onChange={(e) => {
              const snapThreshold = parseInt(e.target.value, 10);
              if (!isNaN(snapThreshold) && snapThreshold > 0) {
                canvasDispatch(
                  canvasActions.updateGridSettings({
                    snapThreshold,
                  })
                );
              }
            }}
            aria-label="Snap threshold in pixels"
          />
        </Label>
      </div>
    </>
  );
};

GridSettings.displayName = "GridSettings";
