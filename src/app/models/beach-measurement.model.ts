export default class BeachMeasurementModel {
  id: string;
  name: string;
  coordX: number;
  coordY: number;
  measurementDate: Date;
  intestinalEnterococci: number;
  ecoli: number;

  constructor(id: string,
              name: string,
              coordX: number,
              coordY: number,
              measurementDate: Date,
              intestinalEnterococci: number,
              ecoli: number) {
    this.id = id;
    this.name = name;
    this.coordX = coordX;
    this.coordY = coordY;
    this.measurementDate = measurementDate;
    this.intestinalEnterococci = intestinalEnterococci;
    this.ecoli = ecoli;
  }
}
