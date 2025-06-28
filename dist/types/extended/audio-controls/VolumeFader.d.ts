import { default as React } from 'react';
import { BaseAudioControlProps, RangeControlProps, OrientationProps, DisplayProps } from './types';
export interface VolumeFaderProps extends BaseAudioControlProps, RangeControlProps, OrientationProps, DisplayProps {
}
export declare const VolumeFader: React.FC<VolumeFaderProps>;
