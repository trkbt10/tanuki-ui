import { PanelState, DragState } from './types';
import { PanelAction } from './actions';
interface ReducerState {
    panelState: PanelState;
    dragState: DragState;
}
export declare const panelReducer: (state: ReducerState, action: PanelAction) => ReducerState;
export declare const createInitialState: (initialPanelState?: PanelState) => ReducerState;
export {};
