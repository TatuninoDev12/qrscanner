

export class Register {
    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor ( format: string, text: string ) {
        this.format = format;
        this.text = text;
        this.created = new Date();
        this.icon = ''
        this.type = ''
        this.determineType();
    }

    private determineType () {
        const initText = this.text.substring(0,4);
        console.log('tipo', initText);
        
        switch ( initText ) {
            case 'http':
                this.type = 'http'
                this.icon = 'globe-outline'
                break;
            case 'geo:':
                this.type = 'geo'
                this.icon = 'earth-outline'
                break;
            default:
                this.type = 'No reconocido'
                this.icon = 'create-outline'
        }
    }

}