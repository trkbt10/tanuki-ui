/**
 * Hook that provides auto layout functionality
 */
export declare const useAutoLayout: () => {
    applyLayout: (layoutType: "force" | "hierarchical" | "grid", selectedOnly?: boolean) => void;
    applyForceLayout: (selectedOnly?: boolean) => void;
    applyHierarchicalLayout: (selectedOnly?: boolean) => void;
    applyGridLayout: (selectedOnly?: boolean) => void;
};
