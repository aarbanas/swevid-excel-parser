export class DataParser {

    constructor() {
    }

    async parse(json: any, sheet: string, starting_row: number, name_cell: string, sex_cell: string, year_of_birth_cell: string, disciplines: { [cell: string]: any }): Promise<void> {
        for (const [index, row] of json[sheet].entries()) {
            if (index < starting_row)
                continue;

            if (!row[name_cell] || !row[sex_cell] || !row[year_of_birth_cell])
                continue;

            const swimmer_data: any = {
                name: row[name_cell],
                sex: row[sex_cell],
                yob: row[year_of_birth_cell],
                disciplines: []
            };
            console.log(swimmer_data);
        }
    }

    sleep() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 3000)
        })
    }
}
