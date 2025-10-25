import React, { useState, useMemo } from 'react';
import { RefreshCcw, DollarSign, Cpu } from 'lucide-react';

// --- CONSTANTS ---
const AMD_SYMBOL = '֏';
const MIN_WAGE_15X = 1125000; // 15 x Minimum Wage (used for PKS cap)
const PKS_STATE_MAX = 25000;

// --- TRANSLATIONS ---
const translations = {
    en: {
        header: 'SALARY CALCULATOR', // Updated Branding and fixed compilation error
        subheader: 'Calculate Income Tax, PKS, and Stamp Duty for Armenia', // Removed (ZAH)
        input_label_gross: 'Registered (Gross) Salary',
        input_label_net: 'Clean (Net) Salary',
        result_label_gross: 'Registered (Gross) Salary',
        result_label_net: 'Clean (Net) Salary',
        switch_to: 'Switch to',
        tax_options_header: 'Tax & Pension Options',
        it_benefit: 'IT Sector Tax Benefit (10% Income Tax)',
        pks_header: 'Mandatory Cumulative Pension System (PKS)',
        pks_no: 'No participation',
        pks_no_desc: '0% Contribution',
        pks_voluntary: 'Voluntary (Joined after 07/2018)',
        pks_voluntary_desc: '5% Employee contribution (max 56,250 ֏)',
        pks_mandatory: 'Mandatory / Pre-2018 Voluntary',
        pks_mandatory_desc: '10% Total contribution (State matched/capped)',
        results_header: 'Calculation Results',
        input_gross_display: 'Input Gross:',
        calculated_gross_display: 'Calculated Gross:',
        input_net_display: 'Input Net:',
        calculated_net_display: 'Calculated Net:',
        breakdown_header: 'Deductions Breakdown',
        income_tax: 'Income Tax',
        stamp_duty: 'Stamp Duty:', // Removed (ZAH)
        pks_employee: 'PKS Employee Contrib.:',
        pks_state: 'PKS State Match/Cont.:',
        pks_total: 'Total Monthly PKS Fund:',
        footer_note: 'Calculations are based on Armenian tax legislation effective from Jan 1, 2023.',
        lang_en: 'English',
        lang_am: 'Հայերեն',
        lang_ru: 'Русский',
    },
    am: {
        header: 'ԱՇԽԱՏԱՎԱՐՁԻ ՀԱՇՎԻՉ', // Updated Branding
        subheader: 'Հաշվարկել Եկամտային Հարկը, Սոց վճարը և Դրոշմանիշային Վճարը', // No change needed
        input_label_gross: 'Գրանցված (համախառն) աշխատավարձ',
        input_label_net: 'Մաքուր Աշատավարձ', // Restored (ձեռքի) for consistency
        result_label_gross: 'Գրանցված (համախառն) աշխատավարձ',
        result_label_net: 'Մաքուր աշխատավարձ',
        switch_to: 'Փոխել',
        tax_options_header: 'Հարկային և Կենսաթոշակային Պարամետրեր',
        it_benefit: 'ՏՏ Ոլորտի Հարկային Արտոնություն (10% Եկամտահարկ)',
        pks_header: 'Պարտադիր Կուտակային Կենսաթոշակային Համակարգ (ԿԿՀ)',
        pks_no: 'Չեմ մասնակցում',
        pks_no_desc: '0% վճար',
        pks_voluntary: 'Կամավոր (Միացել է 07/2018-ից հետո)',
        pks_voluntary_desc: '5% աշխատողի վճար (առավելագույնը 56,250 ֏)',
        pks_mandatory: 'Պարտադիր / Մինչև 2018թ. կամավոր',
        pks_mandatory_desc: '10% ընդհանուր վճար (Պետության համամասնական/սահմանափակ)',
        results_header: 'Հաշվարկի Արդյունքները',
        input_gross_display: 'Մուտքագրված Համախառն:',
        calculated_gross_display: 'Հաշվարկված Համախառն:',
        input_net_display: 'Մուտքագրված Մաքուր:',
        calculated_net_display: 'Հաշվարկված Մաքուր:',
        breakdown_header: 'Հարկային Պահումներ',
        income_tax: 'Եկամտահարկ',
        stamp_duty: 'Դրոշմանիշային Վճար:', // Removed (ԶԱՀ)
        pks_employee: 'ԿԿՀ Աշխատողի Վճար:',
        pks_state: 'ԿԿՀ Պետական Համամասնական/Վճար:',
        pks_total: 'ԿԿՀ Ամսական Ընդհանուր Ֆոնդ:',
        footer_note: 'Հաշվարկները հիմնված են 2023թ. հունվարի 1-ից գործող ՀՀ հարկային օրենսդրության վրա։',
        lang_en: 'English',
        lang_am: 'Հայերեն',
        lang_ru: 'Русский',
    },
    ru: {
        header: 'КАЛЬКУЛЯТОР ЗАРПЛАТЫ', // Updated Branding
        subheader: 'Расчет Подоходного Налога, НПС и Гербового Сбора', // Removed (ЗАС)
        input_label_gross: 'Регистрируемая (Валовая) Зарплата',
        input_label_net: 'Чистая (На Руки) Зарплата',
        result_label_gross: 'Регистрируемая (Валовая) Зарплата',
        result_label_net: 'Чистая (На Руки) Зарплата',
        switch_to: 'Переключить на',
        tax_options_header: 'Налоговые и Пенсионные Параметры',
        it_benefit: 'Налоговая Льгота ИТ Сектора (10% Подоходный Налог)',
        pks_header: 'Обязательная Накопительная Пенсионная Система (НПС)',
        pks_no: 'Без участия',
        pks_no_desc: '0% Взнос',
        pks_voluntary: 'Добровольное (Присоединился после 07/2018)',
        pks_voluntary_desc: '5% взнос работника (макс. 56,250 ֏)',
        pks_mandatory: 'Обязательное / Добровольное до 2018 г.',
        pks_mandatory_desc: '10% Общий взнос (С Гос. участием/ограничением)',
        results_header: 'Результаты Расчета',
        input_gross_display: 'Введенная Валовая:',
        calculated_gross_display: 'Рассчитанная Валовая:',
        input_net_display: 'Введенная Чистая:',
        calculated_net_display: 'Рассчитанная Чистая:',
        breakdown_header: 'Разбивка Вычетов',
        income_tax: 'Подоходный Налог',
        stamp_duty: 'Гербовый Сбор:', // Removed (ЗАС)
        pks_employee: 'НПС Взнос Работника:',
        pks_state: 'НПС Государственное Соответствие/Взнос:',
        pks_total: 'Общий Ежемесячный Фонд НПС:',
        footer_note: 'Расчеты основаны на налоговом законодательстве РА, действующем с 1 января 2023 года.',
        lang_en: 'English',
        lang_am: 'Հայերեն',
        lang_ru: 'Русский',
    },
};

// Helper function to format numbers with commas and currency symbol
const formatAMD = (number) => {
    // The final display of net and gross results is rounded here.
    if (isNaN(number) || number === null) return `${AMD_SYMBOL} 0`;
    return `${AMD_SYMBOL} ${Math.round(number).toLocaleString('en-US')}`;
};

// --- CORE CALCULATION LOGIC ---

// 1. Calculates the Servicemen's Insurance Fund (ZAH) Stamp Duty
const calculateStampDuty = (grossSalary) => {
    if (grossSalary <= 100000) return 1500;
    if (grossSalary <= 200000) return 3000;
    if (grossSalary <= 500000) return 5500;
    if (grossSalary <= 1000000) return 8500;
    return 15000; // Over 1,000,000 AMD
};

// 2. Calculates the Employee Pension Contribution (PKS_E) and State Contribution
const calculatePKS = (grossSalary, pksOption) => {
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
const calculateGrossToNet = (grossSalary, isITSpecialist, pksOption) => {
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
const calculateNetToGross = (targetNet, isITSpecialist, pksOption) => {
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


// --- REACT COMPONENT ---

const initialSalary = 200000;

const App = () => {
    const [inputValue, setInputValue] = useState(initialSalary); // Numeric value for calculation
    const [displayValue, setDisplayValue] = useState(initialSalary.toLocaleString('en-US')); // String value for display
    const [isGrossInput, setIsGrossInput] = useState(true);
    const [isITSpecialist, setIsITSpecialist] = useState(false);
    const [pksOption, setPksOption] = useState('mandatory_pre_2018_voluntary');
    const [language, setLanguage] = useState('am'); // Default language set to Armenian
    
    // Get translations for the current language
    const t = translations[language];

    const handleInputChange = (e) => {
        const rawInput = e.target.value;

        // 1. Clean the string: remove all non-digit characters to get the pure number
        const numericString = rawInput.replace(/[^0-9]/g, '');
        const numericValue = numericString === '' ? 0 : parseInt(numericString, 10);

        // 2. Format the value for display (adds commas)
        // Only format if there is a number greater than zero
        const formattedDisplay = numericValue > 0 ? numericValue.toLocaleString('en-US') : '';

        // 3. Update states
        setInputValue(numericValue);
        setDisplayValue(formattedDisplay);
    };

    const toggleInputMode = () => {
        setIsGrossInput(prev => !prev);
        // Clear both the numeric and display values on mode switch
        setInputValue(0);
        setDisplayValue('');
    };

    // Memoize the results to avoid unnecessary recalculations
    const results = useMemo(() => {
        if (inputValue <= 0) {
            return calculateGrossToNet(0, isITSpecialist, pksOption);
        }
        
        if (isGrossInput) {
            return calculateGrossToNet(inputValue, isITSpecialist, pksOption);
        } else {
            return calculateNetToGross(inputValue, isITSpecialist, pksOption);
        }
    }, [inputValue, isGrossInput, isITSpecialist, pksOption]);

    // Translate PKS options dynamically
    const PKS_OPTIONS = useMemo(() => [
        { id: 'no_participation', label: t.pks_no, desc: t.pks_no_desc },
        { id: 'voluntary_post_2018', label: t.pks_voluntary, desc: t.pks_voluntary_desc },
        { id: 'mandatory_pre_2018_voluntary', label: t.pks_mandatory, desc: t.pks_mandatory_desc },
    ], [t]);

    const inputLabel = isGrossInput ? t.input_label_gross : t.input_label_net;
    const resultLabel = isGrossInput ? t.result_label_net : t.result_label_gross;

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans antialiased flex flex-col items-center">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                .font-sans { font-family: 'Inter', sans-serif; }
                .card {
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
            `}</style>

            {/* --- LANGUAGE SELECTOR --- */}
            <div className="w-full max-w-lg flex justify-end mb-4">
                <div className="inline-flex rounded-full bg-white p-1 shadow-md">
                    <button 
                        onClick={() => setLanguage('am')}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${language === 'am' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        {t.lang_am}
                    </button>
                    <button 
                        onClick={() => setLanguage('en')}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        {t.lang_en}
                    </button>
                    <button 
                        onClick={() => setLanguage('ru')}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${language === 'ru' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        {t.lang_ru}
                    </button>
                </div>
            </div>

            <header className="w-full max-w-lg text-center my-6">
                <h1 className="text-3xl font-bold text-blue-800 tracking-tight">
                    {t.header}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    {t.subheader}
                </p>
            </header>

            <div className="w-full max-w-lg space-y-6">
                
                {/* --- INPUT CARD --- */}
                <div className="bg-white card rounded-xl p-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <label htmlFor="salary-input" className="text-sm font-semibold text-gray-700">
                            {inputLabel}
                        </label>
                        <button
                            onClick={toggleInputMode}
                            className="text-xs font-medium text-blue-600 bg-blue-50/50 hover:bg-blue-100 px-3 py-1 rounded-full flex items-center transition-colors"
                        >
                            <RefreshCcw size={12} className="mr-1" />
                            {t.switch_to} {resultLabel}
                        </button>
                    </div>
                    
                    <div className="relative">
                        <input
                            id="salary-input"
                            type="text" // Changed to text to allow custom formatting
                            value={displayValue} // Displays formatted string
                            onChange={handleInputChange}
                            placeholder="0"
                            className="w-full text-4xl font-extrabold text-gray-800 border-b-2 border-blue-500 focus:border-blue-700 outline-none pb-1 transition-all"
                        />
                        <span className="absolute right-0 bottom-2 text-2xl font-bold text-gray-400 select-none">
                            {AMD_SYMBOL}
                        </span>
                    </div>
                </div>

                {/* --- TAX OPTIONS CARD --- */}
                <div className="bg-white card rounded-xl p-5 border border-gray-100 space-y-4">
                    <h2 className="text-lg font-bold text-gray-700">{t.tax_options_header}</h2>

                    {/* IT Sector Toggle */}
                    <div className="flex justify-between items-center border-b pb-3">
                        <div className="flex items-center space-x-2">
                            <Cpu size={20} className="text-green-500" />
                            <span className="font-medium text-gray-700">{t.it_benefit}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                checked={isITSpecialist}
                                onChange={(e) => setIsITSpecialist(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>

                    {/* PKS Options */}
                    <div>
                        <p className="font-medium text-gray-700 mb-2">{t.pks_header}</p>
                        {PKS_OPTIONS.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => setPksOption(option.id)}
                                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all border ${
                                    pksOption === option.id
                                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200'
                                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                } mb-2`}
                            >
                                <input
                                    type="radio"
                                    name="pks-option"
                                    checked={pksOption === option.id}
                                    readOnly
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <div className="ml-3 text-sm">
                                    <label className="font-medium text-gray-900">{option.label}</label>
                                    <p className="text-gray-500 text-xs">{option.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* --- RESULTS CARD --- */}
                <div className="bg-blue-600 card rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                        <DollarSign size={24} className="mr-2" />
                        {t.results_header}
                    </h2>

                    {/* Gross vs Net Display */}
                    <div className="text-white border-b border-blue-400/50 pb-3 mb-4">
                        <p className="text-sm font-medium opacity-80">
                            {isGrossInput ? t.input_gross_display : t.calculated_gross_display}
                        </p>
                        <p className="text-3xl font-extrabold">
                            {formatAMD(results.gross)}
                        </p>
                        <p className="text-sm font-medium opacity-80 mt-2">
                            {isGrossInput ? t.calculated_net_display : t.input_net_display}
                        </p>
                        <p className={`text-4xl font-extrabold ${results.net < 0 ? 'text-red-300' : 'text-yellow-300'}`}>
                            {formatAMD(results.net)}
                        </p>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 text-white/90">
                        <p className="text-base font-semibold border-b border-blue-400/30 pb-1 mt-4">{t.breakdown_header}</p>
                        
                        {/* Income Tax */}
                        <div className="flex justify-between">
                            <span className="font-medium">{t.income_tax} ({isITSpecialist ? '10%' : '20%'}):</span>
                            <span className="font-bold text-red-300">- {formatAMD(results.it)}</span>
                        </div>

                        {/* Stamp Duty */}
                        <div className="flex justify-between">
                            <span className="font-medium">{t.stamp_duty}</span>
                            <span className="font-bold text-red-300">- {formatAMD(results.zah)}</span>
                        </div>

                        {/* PKS Employee */}
                        <div className="flex justify-between">
                            <span className="font-medium">{t.pks_employee}</span>
                            <span className="font-bold text-red-300">- {formatAMD(results.pks.pksEmployee)}</span>
                        </div>

                        {/* PKS State */}
                        {results.pks.pksState > 0 && (
                            <div className="flex justify-between pt-2 border-t border-blue-400/30">
                                <span className="font-medium text-sm text-yellow-300">{t.pks_state}</span>
                                <span className="font-bold text-yellow-300">+ {formatAMD(results.pks.pksState)}</span>
                            </div>
                        )}
                        
                        {/* Total PKS */}
                        {(results.pks.pksEmployee > 0 || results.pks.pksState > 0) && (
                            <div className="flex justify-between pt-1">
                                <span className="font-medium text-sm text-white/70">{t.pks_total}</span>
                                <span className="font-bold text-white">{formatAMD(results.pks.pksTotal)}</span>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>

            {/* Footer Note */}
            <div className="w-full max-w-lg mt-6 p-4 text-center text-xs text-gray-500">
                <p>{t.footer_note}</p>
            </div>
        </div>
    );
};

export default App;
