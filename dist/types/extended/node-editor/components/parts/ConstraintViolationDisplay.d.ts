import { ConstraintViolation } from '../../types/NodeDefinition';
import * as React from "react";
export interface ConstraintViolationDisplayProps {
    violations: ConstraintViolation[];
    onDismiss?: (violationId: string) => void;
    className?: string;
}
/**
 * Component to display constraint violations
 */
export declare const ConstraintViolationDisplay: React.FC<ConstraintViolationDisplayProps>;
/**
 * Hook to manage constraint violation state
 */
export declare const useConstraintViolationManager: () => {
    violations: ConstraintViolation[];
    addViolations: (newViolations: ConstraintViolation[]) => void;
    clearViolations: () => void;
    dismissViolation: (violationId: string) => void;
};
