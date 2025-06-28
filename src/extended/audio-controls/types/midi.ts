export interface MIDINote {
  id: string;
  pitch: number; // MIDI note number (0-127)
  startTime: number; // Start time in beats or seconds
  duration: number; // Duration in beats or seconds
  velocity: number; // Velocity (0-127)
  selected?: boolean;
}

export interface PianoKey {
  note: number; // MIDI note number
  isBlack: boolean;
  noteName: string; // e.g., "C4", "F#3"
  octave: number;
}

export interface MIDISelection {
  notes: string[]; // Array of selected note IDs
  startTime?: number;
  endTime?: number;
}

export interface MIDIPlaybackState {
  isPlaying: boolean;
  currentTime: number;
  bpm: number;
  timeSignature: [number, number]; // [numerator, denominator]
}

export interface MIDIViewport {
  startTime: number;
  endTime: number;
  lowNote: number; // Lowest visible MIDI note
  highNote: number; // Highest visible MIDI note
  pixelsPerBeat: number;
  keyHeight: number;
}

export interface MIDIEditMode {
  tool: 'select' | 'pencil' | 'eraser' | 'velocity';
  snap: boolean;
  snapValue: number; // Snap to grid value (e.g., 1/16 note)
}