export default class GeoCodingPlace {
    coordinates: number[];
    label: string;
    name: string;

    constructor(x: number, y: number, label: string, name: string) {
        this.coordinates = [y, x]
        this.label = '🏖️ ' + label;
        this.name = name.toLocaleLowerCase();
    }
}