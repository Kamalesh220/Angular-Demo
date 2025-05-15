export interface Well {
    Id : number;
    wellName: string;
    wellType: 'Production' | 'Injection' | 'Exploration' | '';
    spudDate?: Date | null;
    totalDepth?: number | null;
    currentPressure?: number | null;
    productionRate?: number | null;
    isOperational: boolean;
}