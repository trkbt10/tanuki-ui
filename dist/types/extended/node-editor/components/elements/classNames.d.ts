type ClassValue = string | number | boolean | undefined | null;
type ClassArray = ClassValue[];
type ClassDictionary = Record<string, any>;
type ClassNameInput = ClassValue | ClassDictionary | ClassArray;
/**
 * A utility function for conditionally joining CSS class names.
 *
 * @param inputs - Any number of class name inputs (strings, objects, arrays)
 * @returns A string of joined class names
 *
 * @example
 * classNames('foo', 'bar'); // 'foo bar'
 * classNames('foo', { bar: true }); // 'foo bar'
 * classNames('foo', { bar: false }); // 'foo'
 * classNames('foo', ['bar', 'baz']); // 'foo bar baz'
 * classNames('foo', null, undefined, 0, false, 'bar'); // 'foo bar'
 */
export declare function classNames(...inputs: ClassNameInput[]): string;
export default classNames;
