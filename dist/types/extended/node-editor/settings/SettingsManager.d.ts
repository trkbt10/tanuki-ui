import { SettingsManager as ISettingsManager, SettingDefinition, SettingCategory, SettingsValues, SettingValue, SettingsValidationResult, SettingsStorage } from './types';
/**
 * Event emitter for settings
 */
declare class SettingsEventEmitter {
    private listeners;
    on(event: string, handler: (data: any) => void): () => void;
    emit(event: string, data: any): void;
    removeAllListeners(): void;
}
/**
 * Local storage implementation for settings
 */
export declare class LocalSettingsStorage implements SettingsStorage {
    private prefix;
    private eventEmitter;
    constructor(prefix?: string);
    private getStorageKey;
    get(key: string): SettingValue | undefined;
    set(key: string, value: SettingValue): void;
    delete(key: string): void;
    clear(): void;
    keys(): string[];
    getMany(keys: string[]): Record<string, SettingValue>;
    setMany(values: Record<string, SettingValue>): void;
    on(event: "change", handler: (key: string, value: SettingValue) => void): () => void;
}
/**
 * Settings Manager implementation
 */
export declare class SettingsManager extends SettingsEventEmitter implements ISettingsManager {
    private settings;
    private categories;
    private values;
    private storage;
    constructor(storage?: SettingsStorage);
    registerSetting(setting: SettingDefinition): void;
    unregisterSetting(key: string): void;
    getSetting(key: string): SettingDefinition | undefined;
    getAllSettings(): Record<string, SettingDefinition>;
    getSettingsByCategory(category: string): SettingDefinition[];
    registerCategory(category: SettingCategory): void;
    unregisterCategory(key: string): void;
    getCategory(key: string): SettingCategory | undefined;
    getAllCategories(): SettingCategory[];
    getValue<T = SettingValue>(key: string): T | undefined;
    setValue(key: string, value: SettingValue): void;
    setValues(values: Partial<SettingsValues>): void;
    getAllValues(): SettingsValues;
    resetToDefaults(keys?: string[]): void;
    validateSetting(key: string, value: SettingValue): string | null;
    validateAll(): SettingsValidationResult;
    save(): Promise<void>;
    load(): Promise<void>;
    export(): string;
    import(data: string): void;
    getSchema(): Record<string, any>;
    reset(): void;
    private loadFromStorage;
}
export {};
