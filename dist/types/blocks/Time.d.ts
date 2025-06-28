import { default as React } from 'react';
export declare const Time: React.NamedExoticComponent<React.HTMLAttributes<HTMLTimeElement> & {
    type?: "unix" | "unixtime" | "ISO8601" | "ulid" | string;
    timestamp: Date | number | string | undefined;
    format?: string;
} & React.RefAttributes<HTMLTimeElement>>;
