export interface MIDINote {
    id: string;
    pitch: number;
    startTime: number;
    duration: number;
    velocity: number;
    selected?: boolean;
}
export interface PianoKey {
    note: number;
    isBlack: boolean;
    noteName: string;
    octave: number;
}
export interface MIDISelection {
    notes: string[];
    startTime?: number;
    endTime?: number;
}
export interface MIDIPlaybackState {
    isPlaying: boolean;
    currentTime: number;
    bpm: number;
    timeSignature: [number, number];
}
export interface MIDIViewport {
    startTime: number;
    endTime: number;
    lowNote: number;
    highNote: number;
    pixelsPerBeat: number;
    keyHeight: number;
}
export interface MIDIEditMode {
    tool: 'select' | 'pencil' | 'eraser' | 'velocity';
    snap: boolean;
    snapValue: number;
}
