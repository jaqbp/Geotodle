export class CityModel3d  {
    constructor(name, description, path) {
        this.name = name;
        this.description = description;
        this.path = path;
    }
    
    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getPath() {
        return this.path;
    }
}