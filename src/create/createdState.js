export class CreatedState {
    static Pending = new CreatedState('pending');
    static Created = new CreatedState('created');

    constructor(name) {
        this.name = name;
    }
}