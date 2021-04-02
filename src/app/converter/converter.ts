export interface Converter {
  toModel(obj: any): any;
  toDto(obj: any): any;
}
