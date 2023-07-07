export interface KeyValueObject {
  [key: string]: string | RegExp;
}
export interface ArrayOfKeyValueObject {
  [key: string]: KeyValueObject;
}
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
