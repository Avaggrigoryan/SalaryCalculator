import { AMD_SYMBOL, MIN_WAGE_15X, PKS_STATE_MAX } from '../constants';

// Helper function to format numbers with commas and currency symbol
export const formatAMD = (number) => {
    if (isNaN(number) || number === null) return `${AMD_SYMBOL} 0`;
    return `${AMD_SYMBOL} ${Math.round(number).toLocaleString('en-US')}`;
};

// 1. Calculates the Servicemen's Insurance Fund (ZAH) Stamp Duty
export const calculateStampDuty = (grossSalary) => {
    if (grossSalary <= 100000) return 1500;
    if (grossSalary <= 200000) return 3000;
    if (grossSalary <= 500000) return 5500;
    if (grossSalary <= 1000000) return 8500;
    return 15000; // Over 1,000,000 AMD
};

// 2. Calculates the Employee Pension Contribution (PKS_E) and State Contribution
export const calculatePKS = (grossSalary, pksOption) => {
    const BI = grossSalary;
    let pksEmployee = 0;
    let pksState = 0;

    switch (pksOption) {
        case 'no_participation':
            // No contribution
            break;

        case 'voluntary_post_2018':
            // Employee pays 5% of BI, capped at 5% of 1,125,000 (56,250 AMD)
            pksEmployee = Math.min(BI * 0.05, MIN_WAGE_15X * 0.05);
            break;

        case 'mandatory_pre_2018_voluntary':
            // Total 10% (Employee + State)
            const pksTotalRate = BI * 0.10;

            if (BI <= 500000) {
                // 5% employee, 5% state
                pksEmployee = BI * 0.05;
                pksState = BI * 0.05;
            } else if (BI <= MIN_WAGE_15X) {
                // Total 10%. State capped at 25,000 AMD.
                pksState = PKS_STATE_MAX;
                pksEmployee = pksTotalRate - PKS_STATE_MAX;
            } else {
                // Gross > 1,125,000 AMD. Total capped at 112,500 AMD.
                pksState = PKS_STATE_MAX;
                pksEmployee = MIN_WAGE_15X * 0.10 - PKS_STATE_MAX; // 112,500 - 25,000 = 87,500 AMD
            }
            break;

        default:
            break;
    }
    
    pksEmployee = Math.max(0, pksEmployee);
    // ROUND PKS DEDUCTIONS TO NEAREST INTEGER for payroll accuracy
    const finalPksEmployee = Math.round(pksEmployee);
    const finalPksState = Math.round(pksState);

    return {
        pksEmployee: finalPksEmployee,
        pksState: finalPksState,
        pksTotal: finalPksEmployee + finalPksState,
    };
};

// 3. Main function to calculate all deductions and Net from a known Gross Salary
export const calculateGrossToNet = (grossSalary, isITSpecialist, pksOption) => {
    // Gross Salary must be a whole number for calculation
    const wholeGrossSalary = Math.round(grossSalary);
    
    if (wholeGrossSalary <= 0 || isNaN(wholeGrossSalary)) {
        return { gross: 0, net: 0, it: 0, zah: 0, pks: { pksEmployee: 0, pksState: 0, pksTotal: 0 } };
    }

    // 3.1. Stamp Duty (ZAH) - Always integer
    const zah = calculateStampDuty(wholeGrossSalary);

    // 3.2. Pension Contribution (PKS) - Employee and State contributions are now integers
    const pks = calculatePKS(wholeGrossSalary, pksOption);

    // 3.3. Income Tax (IT) - Calculated on Gross Salary, rounded to nearest integer
    const itRate = isITSpecialist ? 0.10 : 0.20;
    const it = Math.round(wholeGrossSalary * itRate); // Apply rounding here
    
    // 3.4. Net Salary
    const net = wholeGrossSalary - it - pks.pksEmployee - zah;

    return {
        gross: wholeGrossSalary,
        net: net,
        it: it,
        zah: zah,
        pks: pks,
    };
};

// 4. Iterative function to calculate Gross from a known Net Salary
export const calculateNetToGross = (targetNet, isITSpecialist, pksOption) => {
    if (targetNet <= 0 || isNaN(targetNet)) return calculateGrossToNet(0, isITSpecialist, pksOption);

    let guess = targetNet * 1.30;
    let iterationLimit = 100;
    const tolerance = 0.01; 

    for (let i = 0; i < iterationLimit; i++) {
        // Calculate with the current integer guess
        const results = calculateGrossToNet(Math.round(guess), isITSpecialist, pksOption);
        const calculatedNet = results.net;
        const difference = targetNet - calculatedNet;

        // Check for high-precision match (less than 1 dram difference)
        if (Math.abs(difference) <= tolerance) {
            break; // Exit loop, we are close enough
        }
        
        // Adjust the guess amount
        guess += difference * 0.5; // Use a damping factor (0.5) to ensure stability near tax brackets
    }
    
    // Finalization
    let finalGross = Math.ceil(guess);

    // CRITICAL FIX: Check if the gross amount one Dram lower hits the target exactly.
    if (finalGross > 0) {
        // Calculate the results for the Gross salary one dram lower
        const resultsAtLower = calculateGrossToNet(finalGross - 1, isITSpecialist, pksOption); 

        // If the lower Gross amount gives the EXACT target Net amount, we use that lower Gross.
        if (resultsAtLower.net === targetNet) {
            finalGross = finalGross - 1;
        }
    }
    
    return calculateGrossToNet(finalGross, isITSpecialist, pksOption);
};
