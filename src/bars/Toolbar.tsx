import * as React from "react";
import { usePrevious } from "react-use";
import { ChevronMark } from "../blocks/ChevronMark";
import { SearchIcon } from "../blocks/SearchIcon";
import classes from "./Toolbar.module.css";
type Variants = "combobox" | "noborder" | string;
const PushButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement | HTMLInputElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variants; as?: React.ElementType<any> }
>(({ children, variant, ...props }, ref) => {
  const Element = props.as ?? "button";
  return (
    <Element className={classes.button} data-variant={variant} {...props} ref={ref}>
      {children}
      {variant === "combobox" && (
        <i className={classes.pullDownMark} role="none">
          <ChevronMark></ChevronMark>
        </i>
      )}
    </Element>
  );
});
PushButton.displayName = "PushButton";

type NavigationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: React.ReactNode;
};

const NavigationButton = React.forwardRef<HTMLButtonElement, NavigationButtonProps & { direction: "back" | "forward" }>(
  ({ direction, children, className, type, ...restProps }, ref) => {
    return (
      <button
        {...restProps}
        type={type ?? "button"}
        className={classes.button}
        data-variant="navigation"
        data-direction={direction}
        ref={ref}
      >
        <span className={classes.navigationButtonIcon}>
          <ChevronMark size={16} direction={direction === "back" ? "left" : "right"} />
        </span>
        {children}
      </button>
    );
  }
);
NavigationButton.displayName = "NavigationButton";

const BackButton = React.forwardRef<HTMLButtonElement, NavigationButtonProps>((props, ref) => {
  return <NavigationButton {...props} direction="back" ref={ref} />;
});
BackButton.displayName = "BackButton";

const ForwardButton = React.forwardRef<HTMLButtonElement, NavigationButtonProps>((props, ref) => {
  return <NavigationButton {...props} direction="forward" ref={ref} />;
});
ForwardButton.displayName = "ForwardButton";

const PullDown = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { variant?: Variants }>(
  ({ variant, ...props }, ref) => {
    return (
      <div className={classes.button} data-variant={variant}>
        <select {...props} ref={ref}>
          {props.children}
        </select>
        <div role="none" className={classes.pullDownMark}>
          <ChevronMark></ChevronMark>
        </div>
      </div>
    );
  }
);
PullDown.displayName = "PullDown";

const PopUpButton: React.FC<React.ComponentPropsWithRef<typeof PullDown>> = (props) => {
  return <PullDown {...props} variant="popup"></PullDown>;
};
PopUpButton.displayName = "PopUpButton";
const ComboBox: React.FC<React.ComponentPropsWithRef<typeof PullDown>> = (props) => {
  return <PullDown {...props} variant={["combobox", props.variant].join(" ")}></PullDown>;
};
ComboBox.displayName = "ComboBox";

const InputField = React.memo(
  React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & {
      variant?: string;
    }
  >(({ children, variant, ...props }, ref) => {
    return (
      <input className={classes.input} type={props.type ?? "text"} {...props} ref={ref} data-vatiant={variant}>
        {children}
      </input>
    );
  })
);
InputField.displayName = "InputField";
const SearchField: React.FC<React.ComponentPropsWithRef<typeof InputField>> = (props) => {
  return (
    <div className={classes.withIcon}>
      <i className={classes.icon}>
        <SearchIcon size={17} />
      </i>
      <InputField {...props} type="search" placeholder={props.placeholder ?? "Search..."} />
    </div>
  );
};
SearchField.displayName = "SearchField";
const Title: React.FC<
  React.PropsWithChildren<{
    title?: string;
    subTitle?: string;
  }>
> = React.memo(({ title, subTitle, children }) => {
  return (
    <div className={classes.title}>
      {children}
      {title && <strong>{title}</strong>}
      {subTitle && <small>{subTitle}</small>}
    </div>
  );
});
Title.displayName = "Title";

const Body = React.forwardRef<HTMLDivElement, React.PropsWithChildren<React.JSX.IntrinsicElements["div"]>>(
  ({ children, ...props }, ref) => {
    return (
      <div className={classes.body} {...props} ref={ref}>
        {React.Children.map(children, (child, i) => {
          return (
            <div className={classes.child} key={i}>
              {child}
            </div>
          );
        })}
      </div>
    );
  }
);
Body.displayName = "Body";

const Separator = React.memo(() => <hr className={classes.separator} role="separator" />);

const Segment: React.FC<
  React.PropsWithChildren<{
    onClick: (index: number) => void;
    index: number;
    isActive?: boolean;
  }>
> = React.memo(({ onClick, index, isActive, children }) => {
  const memorizedOnClick = React.useCallback(() => {
    onClick(index);
  }, [index, onClick]);
  return (
    <div className={classes.segment} data-is-active={isActive} onClick={memorizedOnClick}>
      {children}
    </div>
  );
});
Segment.displayName = "Segment";
const SegmentedControl = React.memo(
  ({
    items,
    defaultSelected = 0,
    onSelect,
    children,
  }: React.PropsWithChildren<{
    items?: React.ReactNode[];
    defaultSelected?: number;
    onSelect?: (item: number) => void;
    children?: React.ReactNode;
  }>) => {
    const [selectedIndex, setSelectedIndex] = React.useState(defaultSelected);
    const prev = usePrevious(selectedIndex);
    React.useEffect(() => {
      if (typeof prev === "undefined" || !onSelect || prev === selectedIndex) {
        return;
      }
      onSelect(selectedIndex);
    }, [selectedIndex]);
    const mergedItems = React.useMemo(() => {
      if (!children) {
        return items ?? [];
      }
      return React.Children.toArray(children);
    }, [children, items]);
    return (
      <div className={classes.segmentControl}>
        {mergedItems.map((item, i) => {
          return (
            <Segment key={i} index={i} onClick={setSelectedIndex} isActive={selectedIndex === i}>
              {item}
            </Segment>
          );
        })}
      </div>
    );
  }
);
SegmentedControl.displayName = "SegmentedControl";
const Spacer: React.FC = () => {
  return <div></div>;
};
Spacer.displayName = "Spacer";
export const Toolbar = ({
  children,
  style: css,
}: React.PropsWithChildren<{
  style?: React.CSSProperties;
}>) => {
  return (
    <div className={classes.toolbar} role="toolbar" style={css}>
      {children}
    </div>
  );
};
Toolbar.displayName = "Toolbar";

export const BarItems = {
  SegmentedControl,
  Toolbar,
  SearchField,
  InputField,
  Separator,
  PushButton,
  PullDown,
  Title,
  Body,
  Segment,
  ComboBox,
  PopUpButton,
  Spacer,
  BackButton,
  ForwardButton,
};
Toolbar.SegmentedControl = SegmentedControl;
Toolbar.Toolbar = Toolbar;
Toolbar.SearchField = SearchField;
Toolbar.InputField = InputField;
Toolbar.Separator = Separator;
Toolbar.PushButton = PushButton;
Toolbar.PullDown = PullDown;
Toolbar.Title = Title;
Toolbar.Body = Body;
Toolbar.Segment = Segment;
Toolbar.ComboBox = ComboBox;
Toolbar.PopUpButton = PopUpButton;
Toolbar.Spacer = Spacer;
Toolbar.BackButton = BackButton;
Toolbar.ForwardButton = ForwardButton;
