export class DataParser {

    constructor() {
    }

    async parse(json: any, sheet: string, starting_row: number, name_cell: string, sex_cell: string, year_of_birth_cell: string, disciplines: { [cell: string]: any }, organisation: any): Promise<void> {
        let counter = 0;
        const swimmers: Swimmer[] = [];
        const swimmer_entry_data: any[] = [];

        for (const [index, row] of json[sheet].entries()) {
            if (index < starting_row)
                continue;

            if (!row[name_cell] || !row[sex_cell] || !row[year_of_birth_cell])
                continue;

            counter++;

            //PLIVACI table
            const swimmer: Swimmer = {
                SIFRA: organisation.SIFRA + this.getSwimmerId(counter.toString()), //ID
                IME: row[name_cell],
                PREZIME: "",
                JMBG: "",
                RODEN: "1/1/" + row[year_of_birth_cell].toString(),
                SPOL: row[sex_cell].match(new RegExp("^m", "i")) ? "M" : "Z", //M | Z,
                ULICA: "",
                GRAD: "",
                TEL: "",
                MAIL: "",
                WEB: "",
                DOBS: 0,
                KAT: 0,
                KATOD: "",
                KATDO: "",
                SIFRAORG: "",
                RTFOPIS: "",
                SLIKA: "",
                STARASIFRA: "",
                ISOK: "T",
                USR: "",
                ADATUM: ""
            }
            swimmers.push(swimmer);

            //Iterate through all disciplines swimmer is swimming
            Object.keys(disciplines).forEach(column => {
                if (!row[column])
                    return;

                const swimmer_data: any = { //TURNIR_REZ baza
                    SIFRA: 24,
                    PLIVAC: swimmer.SIFRA, //19101###XXXXX1
                    PLIVACN: swimmer.IME,
                    SPOL: swimmer.SPOL, // M | Z
                    DOBS: 0,
                    S01: "",
                    S02: "",
                    S03: "",
                    S04: "",
                    S05: "",
                    S06: "",
                    S07: "",
                    S08: "",
                    S09: "F",
                    S10: "T",
                    DATUM: swimmer.RODEN, //Date type
                    VRIJEME: "",
                    DISCIPLINA: disciplines[column].SIFRA, //Jedan row po disciplini (to je ID discipline odabrana u excelu)
                    REZPR: this.parseEntryTime(row[column]), //Isparsano vrijeme prijave 00:00.000
                    STARTG: 0,
                    STARTP: 0,
                    REZKON: "99:99.999",
                    BOD: 0,
                    BODKLUB: 0,
                    PLASMAN01: 0,
                    PLASMAN02: 0,
                    PLASMAN03: 0,
                    PLASMAN04: 0,
                    PLASMAN05: 0,
                    PLASMAN06: 0,
                    PLASMAN07: 0,
                    PLASMAN08: 0,
                    PLASMAN09: 0,
                    PLASMAN10: 0,
                    REKORD: 0,
                    PLIVAC01: "",
                    PLIVAC02: "",
                    PLIVAC03: "",
                    PLIVAC04: "",
                    PLIVAC05: "",
                    PLIVAC06: "",
                    PLIVAC07: "",
                    PLIVAC08: "",
                    PLIVAC09: "",
                    PLIVAC10: "",
                    PLIVAC11: "",
                    PLIVAC12: "",
                    PLIVAC13: "",
                    PLIVAC14: "",
                    PLIVAC15: "",
                    PLIVAC16: "",
                    LIMIT: "",
                    ISLIMIT: "F",
                    ISVANKON: "F",
                    ISDQ: "F",
                    NAPOMENA: "",
                    PROLAZ: 0,
                    START: "+00.000",
                    PROLAZ01: "00:00.000",
                    PROLAZ02: "00:00.000",
                    PROLAZ03: "00:00.000",
                    PROLAZ04: "00:00.000",
                    PROLAZ05: "00:00.000",
                    PROLAZ06: "00:00.000",
                    PROLAZ07: "00:00.000",
                    PROLAZ08: "00:00.000",
                    PROLAZ09: "00:00.000",
                    PROLAZ10: "00:00.000",
                    PROLAZ11: "00:00.000",
                    PROLAZ12: "00:00.000",
                    PROLAZ13: "00:00.000",
                    PROLAZ14: "00:00.000",
                    PROLAZ15: "00:00.000",
                    PROLAZ16: "00:00.000",
                    PROLAZ17: "00:00.000",
                    PROLAZ18: "00:00.000",
                    PROLAZ19: "00:00.000",
                    PROLAZ20: "00:00.000",
                    PROLAZ21: "00:00.000",
                    PROLAZ22: "00:00.000",
                    PROLAZ23: "00:00.000",
                    PROLAZ24: "00:00.000",
                    PROLAZ25: "00:00.000",
                    PROLAZ26: "00:00.000",
                    PROLAZ27: "00:00.000",
                    PROLAZ28: "00:00.000",
                    PROLAZ29: "00:00.000",
                    PROLAZ30: "00:00.000",
                    PROLAZ31: "00:00.000",
                    PROLAZ32: "00:00.000",
                    PROLAZ33: "00:00.000",
                    PROLAZ34: "00:00.000",
                    PROLAZ35: "00:00.000",
                    PROLAZ36: "00:00.000",
                    PROLAZ37: "00:00.000",
                    PROLAZ38: "00:00.000",
                    PROLAZ39: "00:00.000",
                    PROLAZ40: "00:00.000",
                    PROLAZ41: "00:00.000",
                    PROLAZ42: "00:00.000",
                    PROLAZ43: "00:00.000",
                    PROLAZ44: "00:00.000",
                    PROLAZ45: "00:00.000",
                    PROLAZ46: "00:00.000",
                    PROLAZ47: "00:00.000",
                    PROLAZ48: "00:00.000",
                    PROLAZ49: "00:00.000",
                    PROLAZ50: "00:00.000",
                    PROLAZ51: "00:00.000",
                    PROLAZ52: "00:00.000",
                    PROLAZ53: "00:00.000",
                    PROLAZ54: "00:00.000",
                    PROLAZ55: "00:00.000",
                    PROLAZ56: "00:00.000",
                    PROLAZ57: "00:00.000",
                    PROLAZ58: "00:00.000",
                    PROLAZ59: "00:00.000",
                    PROLAZ60: "00:00.000"
                };

                swimmer_entry_data.push(swimmer_data);
            });
        }
    }

    private getSwimmerId(counter: string): string {
        const zeroNum = 6 - counter.length;
        return '0'.repeat(zeroNum) + counter;
    }

    private parseEntryTime(entryTime: string): string {
        //Format must be "00:00.000"
        const reverseString = entryTime.split("").reverse().join("");
        let milliseconds = "", seconds = "", minutes = "";
        let haveMillis = false, haveSeconds = false;
        for (let i = 0; i < reverseString.length; i++) {
            if (!haveMillis) {
                if (!isNaN(Number(reverseString[i])))
                    milliseconds+= reverseString[i];
                else
                    haveMillis = true;

                continue;
            }
            if (!haveSeconds) {
                if (!isNaN(Number(reverseString[i])))
                    seconds+= reverseString[i];
                else
                    haveSeconds = true;

                continue;
            }

            minutes+= reverseString[i];
        }

        const finalMillis = this.fillMillis(milliseconds.split("").reverse().join(""));
        const finalSeconds = this.prefillTimeWithZeros(seconds.split("").reverse().join(""));
        const finalMinutes = this.prefillTimeWithZeros(minutes.split("").reverse().join(""));

        return finalMinutes + ":" + finalSeconds + "." + finalMillis;
    }

    private fillMillis(millis: string): string {
        const zeroNum = 3 - millis.length;
        return millis + '0'.repeat(zeroNum);
    }

    private prefillTimeWithZeros(time: string): string {
        const zeroNum = 2 - time.length;
        return '0'.repeat(zeroNum) + time;
    }

    sleep() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 3000)
        })
    }
}

type Swimmer = {
    SIFRA: string, //ID plivaca,
    IME: string,
    PREZIME: string,
    JMBG: string,
    RODEN: string,
    SPOL: "M" | "Z",
    ULICA: string,
    GRAD: string,
    TEL: string,
    MAIL: string,
    WEB: string,
    DOBS: number,
    KAT: number,
    KATOD: string,
    KATDO: string,
    SIFRAORG: string,
    RTFOPIS: string,
    SLIKA: string,
    STARASIFRA: string,
    ISOK: "T",
    USR: string,
    ADATUM: string
}
