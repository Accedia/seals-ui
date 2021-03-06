export default class BeachMeasurementModel {
  id: string;
  name: string;
  shortName: string;
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

    let index = this.name.indexOf('-');
    if (name.charAt(index + 1) !== ' ') {
      index = this.name.indexOf('-', index + 1);
    }
    if (index === -1) { index = this.name.length; }
    this.shortName = this.name.substring(0, index).trim();
  }
}
