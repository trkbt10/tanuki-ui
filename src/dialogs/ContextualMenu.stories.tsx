import React, { ComponentProps } from "react";
import { Button } from "../form/Button";
import { ContextualMenu, useContextualMenu } from "./ContextualMenu";
import { ContextualMenuBalloon } from "./parts/ContextualMenuBalloon";
import { Modal } from "./Modal";
import { Label } from "..";
import { Paragraph } from "../elements/Paragraph";

export default {
  title: "dialogs/ContextualMenu",
  component: <></>,
};
const sample = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.
Windowsでコンピューターの世界が広がります。1234567890
あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
山路を登りながら、こう考えた。智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。住みにくさが高じると、安い所へ引き越したくなる。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。
`;

const PosititonTestComponent = () => {
  const [ref, open, toggle, bound] = useContextualMenu(true);
  return (
    <div>
      <Button ref={ref} onClick={toggle}>
        Open
      </Button>
      {bound && (
        <ContextualMenu open={open} onClose={toggle} measure={bound}>
          <Label>Button:</Label>
          <p>{sample}</p>
        </ContextualMenu>
      )}
    </div>
  );
};
export const basic = (props: ComponentProps<typeof Modal>) => {
  return (
    <div>
      <div style={{ position: "fixed", left: 0, top: 0 }}>
        <PosititonTestComponent></PosititonTestComponent>
      </div>
      {/* 
      <div style={{ position: "fixed", right: 0, top: 0 }}>
        <PosititonTestComponent></PosititonTestComponent>
      </div>
      <div style={{ position: "fixed", left: "50%", top: 0 }}>
        <PosititonTestComponent></PosititonTestComponent>
      </div>
      <div style={{ position: "fixed", left: 0, bottom: 0 }}>
        <PosititonTestComponent></PosititonTestComponent>
      </div>
      <div style={{ position: "fixed", left: "50%", bottom: 0 }}>
        <PosititonTestComponent></PosititonTestComponent>
      </div> */}
      <div style={{ position: "fixed", right: 0, bottom: 0 }}>
        <PosititonTestComponent></PosititonTestComponent>
      </div>
    </div>
  );
};
export const Window = () => {
  const bound = { x: 1088, y: 322.9609375, width: 51, height: 25.0859375 };
  const [open, setOpen] = React.useState(true);
  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      {bound && (
        <ContextualMenu open={open} onClose={toggle} measure={bound}>
          <Label>Button:</Label>
          <p>{sample}</p>
        </ContextualMenu>
      )}
    </div>
  );
};

export const Balloon = () => {
  const [lookAt, setLookAt] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const handleMove: any = (e: any) => {
      setLookAt({
        x: e.pageX,
        y: e.pageY,
      });
    };
    window.addEventListener("pointermove", handleMove, false);
    return () => {
      window.removeEventListener("pointermove", handleMove, false);
    };
  }, []);
  return (
    <div>
      <div style={{ position: "absolute", top: 0 }}>
        {lookAt.x},{lookAt.y}
      </div>
      <div
        style={{
          position: "absolute",
          left: 256,
          top: 128,
          background: "rgba(255,0,0,0.1)",
        }}
      >
        <ContextualMenuBalloon
          x={256}
          y={128}
          width={300}
          height={256}
          lookAtX={lookAt.x}
          lookAtY={lookAt.y}
        ></ContextualMenuBalloon>
      </div>
    </div>
  );
};
