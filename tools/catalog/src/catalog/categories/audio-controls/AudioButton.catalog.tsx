import React, { useState } from 'react';
import { AudioButton } from 'tanuki-ui/extended/audio-controls';
import { DemoRow } from '../../../components/DemoLayouts';
import { CatalogMeta } from '../../../CatalogMeta';

export const AudioButtonMeta: CatalogMeta = {
  title: 'AudioButton',
  category: 'audio-controls',
  description: '統一されたオーディオ制御ボタン。バリアント別の外観とキーボード操作に対応',
};

export const AudioButtonBasic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isArmed, setIsArmed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSoloed, setIsSoloed] = useState(false);

  return (
    <DemoRow style={{ gap: '16px', alignItems: 'center' }}>
      <AudioButton
        variant="play"
        isActive={isPlaying}
        onClick={() => setIsPlaying(!isPlaying)}
        keyBinding=" "
      />
      <AudioButton
        variant="stop"
        onClick={() => {
          setIsPlaying(false);
          setIsRecording(false);
        }}
        onDoubleClick={() => console.log('Reset to beginning')}
      />
      <AudioButton
        variant="record"
        isArmed={isArmed}
        isRecording={isRecording}
        onClick={() => {
          if (!isArmed) {
            setIsArmed(true);
          } else if (isArmed && !isRecording) {
            setIsRecording(true);
          } else {
            setIsRecording(false);
          }
        }}
        onRightClick={() => {
          setIsArmed(false);
          setIsRecording(false);
        }}
      />
      <AudioButton
        variant="mute"
        isActive={isMuted}
        isSoloed={isSoloed}
        onClick={() => setIsMuted(!isMuted)}
        keyBinding="m"
      />
      <AudioButton
        variant="solo"
        isActive={isSoloed}
        onClick={() => {
          setIsSoloed(!isSoloed);
          if (!isSoloed) setIsMuted(false);
        }}
        keyBinding="s"
      />
    </DemoRow>
  );
};

export const AudioButtonSizes = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <DemoRow style={{ gap: '16px', alignItems: 'center' }}>
      <AudioButton
        variant="toggle"
        size="small"
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
      />
      <AudioButton
        variant="toggle"
        size="medium"
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
      />
      <AudioButton
        variant="toggle"
        size="large"
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
      />
    </DemoRow>
  );
};

export const AudioButtonShapes = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <DemoRow style={{ gap: '16px', alignItems: 'center' }}>
      <AudioButton
        variant="play"
        shape="circle"
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
      />
      <AudioButton
        variant="stop"
        shape="square"
        onClick={() => console.log('Stop')}
      />
      <AudioButton
        variant="mute"
        shape="square"
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
      />
    </DemoRow>
  );
};
