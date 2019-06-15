export default class BeachModel {
  id: number;
  name: string;
  long: string;
  lang: string;
  measurements: MeasurementModel[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
