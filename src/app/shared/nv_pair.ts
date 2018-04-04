export interface NvPair {
    name?: string;
    value?: string;
}

export class NameValue implements NvPair {
    constructor(public name ? : string , public value ? : string ) {}
}

export class NameValueTools {

    public cloneNameValue(p: NvPair): NvPair {
        let nv = new NameValue();
        for (var prop in p) {
            if (p.hasOwnProperty(prop)) {
                nv[prop] = p[prop];
            }
        }
        return nv;
    };

    public findSelectedNvIndex(p: NvPair[], s: NvPair): number {
        return p.indexOf(s);
    };
}