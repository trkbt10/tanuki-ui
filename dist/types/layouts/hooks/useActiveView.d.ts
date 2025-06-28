interface ActiveViewConfig {
    viewCount: number;
    controlled?: number;
    defaultView: number;
    onChange?: (index: number) => void;
    hasMenu?: boolean;
}
export declare const useActiveView: (config: ActiveViewConfig) => {
    activeViewIndex: number;
    setActiveViewIndex: (index: number) => void;
};
export {};
