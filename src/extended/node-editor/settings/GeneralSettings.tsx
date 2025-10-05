import * as React from "react";
import { useNodeEditor } from "../contexts/node-editor";
import { Input, Label, SwitchInput } from "../components/elements";
import { useI18n } from "../i18n";
import styles from "./EditorSettingsPanel.module.css";

/**
 * General editor settings component
 */
export const GeneralSettings: React.FC = () => {
  const { settings, settingsManager, updateSetting } = useNodeEditor();
  const { t } = useI18n();
  const [autoSaveIntervalInput, setAutoSaveIntervalInput] = React.useState<string>(() =>
    String(settings.autoSaveInterval ?? 30)
  );

  React.useEffect(() => {
    setAutoSaveIntervalInput(String(settings.autoSaveInterval ?? 30));
  }, [settings.autoSaveInterval]);

  const handleAutoSaveToggle = React.useCallback(
    (enabled: boolean) => {
      updateSetting("general.autoSave", enabled);
    },
    [updateSetting]
  );

  const handleAutoSaveIntervalChange = React.useCallback((value: string) => {
    setAutoSaveIntervalInput(value);
  }, []);

  const handleAutoSaveIntervalBlur = React.useCallback(() => {
    const interval = parseInt(autoSaveIntervalInput, 10);
    if (!Number.isNaN(interval) && interval >= 5 && interval <= 3600) {
      updateSetting("general.autoSaveInterval", interval);
    } else {
      setAutoSaveIntervalInput(String(settings.autoSaveInterval ?? 30));
    }
  }, [autoSaveIntervalInput, settings.autoSaveInterval, updateSetting]);

  const settingsWritable = Boolean(settingsManager);

  return (
    <>
      <div className={styles.settingsField}>
        <SwitchInput
          id="auto-save"
          checked={settings.autoSave}
          onChange={handleAutoSaveToggle}
          label={t("inspectorAutoSave")}
          size="medium"
          disabled={!settingsWritable}
        />
      </div>
      <div className={styles.settingsField}>
        <Label htmlFor="auto-save-interval">
          {t("inspectorAutoSaveInterval")}
          <Input
            id="auto-save-interval"
            name="autoSaveInterval"
            type="number"
            className={styles.settingsInput}
            value={autoSaveIntervalInput}
            min={5}
            max={3600}
            step={5}
            onChange={(e) => handleAutoSaveIntervalChange(e.target.value)}
            onBlur={handleAutoSaveIntervalBlur}
            disabled={!settingsWritable}
            aria-label="Auto-save interval in seconds"
          />
        </Label>
      </div>
    </>
  );
};

GeneralSettings.displayName = "GeneralSettings";
