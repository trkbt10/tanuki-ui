import * as React from "react";
type Variants = "combobox" | "noborder" | string;
export declare const Toolbar: {
    ({ children, style: css, }: React.PropsWithChildren<{
        style?: React.CSSProperties;
    }>): React.JSX.Element;
    displayName: string;
    SegmentedControl: React.MemoExoticComponent<({ items, defaultSelected, onSelect, children, }: React.PropsWithChildren<{
        items?: React.ReactNode[];
        defaultSelected?: number;
        onSelect?: (item: number) => void;
        children?: React.ReactNode;
    }>) => React.JSX.Element>;
    Toolbar: /*elided*/ any;
    SearchField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
        variant?: string;
    } & React.RefAttributes<HTMLInputElement>>;
    InputField: React.NamedExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
        variant?: string;
    } & React.RefAttributes<HTMLInputElement>>;
    Separator: React.MemoExoticComponent<() => React.JSX.Element>;
    PushButton: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: Variants;
        as?: React.ElementType<any>;
    } & React.RefAttributes<HTMLAnchorElement | HTMLInputElement | HTMLButtonElement>>;
    PullDown: React.ForwardRefExoticComponent<React.SelectHTMLAttributes<HTMLSelectElement> & {
        variant?: Variants;
    } & React.RefAttributes<HTMLSelectElement>>;
    Title: React.FC<React.PropsWithChildren<{
        title?: string;
        subTitle?: string;
    }>>;
    Body: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Segment: React.FC<React.PropsWithChildren<{
        onClick: (index: number) => void;
        index: number;
        isActive?: boolean;
    }>>;
    ComboBox: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & {
        variant?: Variants;
    } & React.RefAttributes<HTMLSelectElement>>;
    PopUpButton: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & {
        variant?: Variants;
    } & React.RefAttributes<HTMLSelectElement>>;
    Spacer: React.FC<{}>;
};
export declare const BarItems: {
    SegmentedControl: React.MemoExoticComponent<({ items, defaultSelected, onSelect, children, }: React.PropsWithChildren<{
        items?: React.ReactNode[];
        defaultSelected?: number;
        onSelect?: (item: number) => void;
        children?: React.ReactNode;
    }>) => React.JSX.Element>;
    Toolbar: {
        ({ children, style: css, }: React.PropsWithChildren<{
            style?: React.CSSProperties;
        }>): React.JSX.Element;
        displayName: string;
        SegmentedControl: React.MemoExoticComponent<({ items, defaultSelected, onSelect, children, }: React.PropsWithChildren<{
            items?: React.ReactNode[];
            defaultSelected?: number;
            onSelect?: (item: number) => void;
            children?: React.ReactNode;
        }>) => React.JSX.Element>;
        Toolbar: /*elided*/ any;
        SearchField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
            variant?: string;
        } & React.RefAttributes<HTMLInputElement>>;
        InputField: React.NamedExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
            variant?: string;
        } & React.RefAttributes<HTMLInputElement>>;
        Separator: React.MemoExoticComponent<() => React.JSX.Element>;
        PushButton: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
            variant?: Variants;
            as?: React.ElementType<any>;
        } & React.RefAttributes<HTMLAnchorElement | HTMLInputElement | HTMLButtonElement>>;
        PullDown: React.ForwardRefExoticComponent<React.SelectHTMLAttributes<HTMLSelectElement> & {
            variant?: Variants;
        } & React.RefAttributes<HTMLSelectElement>>;
        Title: React.FC<React.PropsWithChildren<{
            title?: string;
            subTitle?: string;
        }>>;
        Body: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>, "ref"> & React.RefAttributes<HTMLDivElement>>;
        Segment: React.FC<React.PropsWithChildren<{
            onClick: (index: number) => void;
            index: number;
            isActive?: boolean;
        }>>;
        ComboBox: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & {
            variant?: Variants;
        } & React.RefAttributes<HTMLSelectElement>>;
        PopUpButton: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & {
            variant?: Variants;
        } & React.RefAttributes<HTMLSelectElement>>;
        Spacer: React.FC<{}>;
    };
    SearchField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
        variant?: string;
    } & React.RefAttributes<HTMLInputElement>>;
    InputField: React.NamedExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
        variant?: string;
    } & React.RefAttributes<HTMLInputElement>>;
    Separator: React.MemoExoticComponent<() => React.JSX.Element>;
    PushButton: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: Variants;
        as?: React.ElementType<any>;
    } & React.RefAttributes<HTMLAnchorElement | HTMLInputElement | HTMLButtonElement>>;
    PullDown: React.ForwardRefExoticComponent<React.SelectHTMLAttributes<HTMLSelectElement> & {
        variant?: Variants;
    } & React.RefAttributes<HTMLSelectElement>>;
    Title: React.FC<React.PropsWithChildren<{
        title?: string;
        subTitle?: string;
    }>>;
    Body: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Segment: React.FC<React.PropsWithChildren<{
        onClick: (index: number) => void;
        index: number;
        isActive?: boolean;
    }>>;
    ComboBox: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & {
        variant?: Variants;
    } & React.RefAttributes<HTMLSelectElement>>;
    PopUpButton: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & {
        variant?: Variants;
    } & React.RefAttributes<HTMLSelectElement>>;
    Spacer: React.FC<{}>;
};
export {};
