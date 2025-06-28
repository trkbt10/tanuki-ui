export interface UseControlledValueOptions<T> {
    value?: T;
    defaultValue: T;
    onChange?: (value: T) => void;
    onChangeEnd?: (value: T) => void;
}
export declare function useControlledValue<T>({ value, defaultValue, onChange, onChangeEnd, }: UseControlledValueOptions<T>): {
    value: T;
    setValue: (newValue: T) => void;
    setValueEnd: (newValue: T) => void;
    isControlled: boolean;
};
