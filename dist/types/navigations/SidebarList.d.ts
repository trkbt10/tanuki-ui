import { default as React } from 'react';
export declare const ListItem: React.FC<React.PropsWithChildren<{
    label?: React.ReactNode;
    selected?: boolean;
    icon?: React.ReactNode;
    open?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & React.HTMLAttributes<HTMLLIElement>>>;
export declare const SidebarList: {
    Button: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
    Container: React.NamedExoticComponent<React.AllHTMLAttributes<HTMLDetailsElement> & {
        children?: React.ReactNode | undefined;
    } & React.RefAttributes<HTMLDetailsElement>>;
    SectionTitle: React.FC<React.PropsWithChildren<{
        title: React.ReactNode;
    }>>;
    Summary: React.FC<{
        children?: React.ReactNode | undefined;
    }>;
    ListItem: React.FC<React.PropsWithChildren<{
        label?: React.ReactNode;
        selected?: boolean;
        icon?: React.ReactNode;
        open?: boolean;
        onClick?: React.MouseEventHandler<HTMLElement>;
    } & React.HTMLAttributes<HTMLLIElement>>>;
    List: React.NamedExoticComponent<React.HTMLAttributes<HTMLUListElement> & {
        children?: React.ReactNode | undefined;
    } & React.RefAttributes<HTMLUListElement>>;
};
