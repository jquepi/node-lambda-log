import LogMessage from './LogMessage.js';
import stringify from 'fast-safe-stringify';

export type GenericRecord<K extends string | number = string | number, V = unknown> = Record<K, V>;
export type Message<T = string | number | Error> = T;
export type Empty = false | null | undefined;

type TagFnObject = {
  level: string;
  meta: GenericRecord;
  options: LambdaLogOptions;
};

export type Tag = string | number | ((data: TagFnObject) => string | Empty) | Empty;

type StringifyType = typeof stringify;

export type Formatter =
  'json' |
  'clean' |
  'minimal' |
  ((ctx: LogMessage, options: LambdaLogOptions, stringify: StringifyType) => string);

export type LogObject = {
  level: string;
  msg: Message;
  meta?: GenericRecord;
  tags?: Tag[];
};

export type LogLevels = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export type LambdaLogOptions = {
  [key: string]: any;
  meta?: GenericRecord;
  tags?: Tag[];
  dynamicMeta?: ((ctx: LogMessage, options: LambdaLogOptions) => GenericRecord | Empty) | Empty;
  level?: false | LogLevels;
  dev?: boolean;
  silent?: boolean;
  replacer?: ((key: string, val: any) => any) | null | undefined;
  logHandler?: ConsoleObject;
  levelKey?: string | false;
  messageKey?: string;
  tagsKey?: string | false;
  onParse?: (msg: Message, options: LambdaLogOptions) => { msg: string; meta?: GenericRecord; error?: Error; tags?: Tag[] } | Empty;
  onCompile?: (level?: string, msg?: Message, meta?: GenericRecord, tags?: Tag[], options?: LambdaLogOptions) => GenericRecord;
  onFormat?: Formatter;
};

export interface ConsoleObject extends Console {
  [key: string]: any;
  log: (...params: any) => void;
  info: (...params: any) => void;
  warn: (...params: any) => void;
  error: (...params: any) => void;
  debug: (...params: any) => void;
}

export interface StubbedError extends Error {
  [key: string]: any;
  log?: LogMessage;
  toJSON?: () => GenericRecord;
}
