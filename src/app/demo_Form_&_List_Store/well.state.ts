import { state } from "@angular/animations";
import { Well } from "../Models/WellModel";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { addWellData, clearSingleWellData, deleteWellData, editWellData, getSingleWellData } from "./well.actions";

export interface WellStateModel{
    allWellData : Well[],
    singleWelldata : Well | null
}

@State<WellStateModel>({
    name : 'WellData',
    defaults : {
        allWellData :[ {
            wellName: 'Well A',
            wellType: 'Production',
            spudDate: new Date('2023-01-01'),
            totalDepth: 1000,
            currentPressure: 5000,
            productionRate: 100,
            isOperational: true,
            Id: 1
          },
          {
            Id: 2,
            wellName: 'Well B',
            wellType: 'Exploration',
            spudDate: new Date('2023-02-01'),
            totalDepth: 1500,
            currentPressure: 6000,
            productionRate: 200,
            isOperational: false
          }],
        singleWelldata : {
            Id : 0,
            wellName: '',
            wellType: "",
            spudDate: null,
            totalDepth: 0,
            currentPressure: 0,
            productionRate: 0,
            isOperational: false
        } 
    }
})

@Injectable({
    providedIn : 'root'
})

export class WellDataStore{

    @Action(addWellData)
    createWell(ctx:StateContext<WellStateModel>,{welldata}:addWellData)
    {
        const state = ctx.getState();

        welldata.Id = state.allWellData.length+1; 

        ctx.patchState({
            ...state,
            allWellData : [...state.allWellData,welldata]
        })
    }

    @Action(editWellData)
    updateWellData(ctx:StateContext<WellStateModel>,{welldata, welldataId} : editWellData)
    {
        const state = ctx.getState();
        welldata.Id = welldataId
        let updateState = state.allWellData.map((item) => {
            return item.Id === welldataId ? welldata : item;
        })

        
        ctx.patchState({
            ...state,
            allWellData : updateState
        })
    }

    @Action(getSingleWellData)
    getWellDataById(ctx:StateContext<WellStateModel>, {welldataId} : getSingleWellData)
    {
        const state = ctx.getState();
        let getSingleDataById  = state.allWellData.find((item) => {
            return item.Id === welldataId ? item : null;
        })
        ctx.patchState({
            singleWelldata: getSingleDataById
        })
    }

    @Action(clearSingleWellData)
    clearSingleWelldata(ctx:StateContext<WellStateModel>)
    {
        const state = ctx.getState();

        ctx.patchState({
            ...state,
            singleWelldata: null,
            allWellData : [...state.allWellData]
        })
    }

    @Action(deleteWellData)
    removeWellData(ctx:StateContext<WellStateModel>, {welldataId}:deleteWellData)
    {
        const state = ctx.getState();
        let removeWellData = state.allWellData.filter((item) => {
            return item.Id !== welldataId
        })

        console.log("checkdelete", state.allWellData.filter((item) => {
            return item.Id !== welldataId
        }))
        
            ctx.patchState({
                ...state,
                allWellData : removeWellData
            })
        
        
        
    }

    @Selector([WellDataStore])
    static getallWellData(state:WellStateModel) 
    {
        if (state.allWellData?.length === 0) {
            return null;
          } else {
            return state.allWellData;
          }
    }
    @Selector([WellDataStore])
    static getSingleWellData(state:WellStateModel) 
    {
        if (state.singleWelldata == null) {
            return null;
          } else {
            return state.singleWelldata;
          }
    }

   
}