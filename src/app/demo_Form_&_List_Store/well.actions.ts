import { Well } from "../Models/WellModel";

export class addWellData{
    static readonly type = '[WellData] add well data'

    constructor(public welldata : Well){}
}

export class editWellData{
    static readonly type = '[WellData] edit well data'

    constructor(public welldata : Well, public welldataId : number){}
}

export class getSingleWellData{
    static readonly type = '[WellData] single well data'

    constructor(public welldataId : number){}

}

export class clearSingleWellData{
    static readonly type = '[WellData] clear single well data'
}

export class deleteWellData{
    static readonly type = '[WellData] delete well data'

    constructor(public welldataId : number){}
}