import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from 'react-native';
import { RefreshCcw, DollarSign, Cpu } from './Icons';
import { translations, AMD_SYMBOL } from '../constants';
import { calculateGrossToNet, calculateNetToGross, formatAMD } from '../utils/calculations';

const initialSalary = 200000;

const SalaryCalculator = () => {
  const [inputValue, setInputValue] = useState(initialSalary);
  const [displayValue, setDisplayValue] = useState(initialSalary.toLocaleString('en-US'));
  const [isGrossInput, setIsGrossInput] = useState(true);
  const [isITSpecialist, setIsITSpecialist] = useState(false);
  const [pksOption, setPksOption] = useState('mandatory_pre_2018_voluntary');
  const [language, setLanguage] = useState('am');
  
  // Get translations for the current language
  const t = translations[language];

  const handleInputChange = (text) => {
    // Clean the string: remove all non-digit characters to get the pure number
    const numericString = text.replace(/[^0-9]/g, '');
    const numericValue = numericString === '' ? 0 : parseInt(numericString, 10);

    // Format the value for display (adds commas)
    const formattedDisplay = numericValue > 0 ? numericValue.toLocaleString('en-US') : '';

    // Update states
    setInputValue(numericValue);
    setDisplayValue(formattedDisplay);
  };

  const toggleInputMode = () => {
    setIsGrossInput(prev => !prev);
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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Language Selector */}
        <View style={styles.languageSelector}>
          <View style={styles.languageButtons}>
            <TouchableOpacity
              onPress={() => setLanguage('am')}
              style={[
                styles.languageButton,
                language === 'am' && styles.languageButtonActive
              ]}
            >
              <Text style={[
                styles.languageButtonText,
                language === 'am' && styles.languageButtonTextActive
              ]}>
                {t.lang_am}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLanguage('en')}
              style={[
                styles.languageButton,
                language === 'en' && styles.languageButtonActive
              ]}
            >
              <Text style={[
                styles.languageButtonText,
                language === 'en' && styles.languageButtonTextActive
              ]}>
                {t.lang_en}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLanguage('ru')}
              style={[
                styles.languageButton,
                language === 'ru' && styles.languageButtonActive
              ]}
            >
              <Text style={[
                styles.languageButtonText,
                language === 'ru' && styles.languageButtonTextActive
              ]}>
                {t.lang_ru}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t.header}</Text>
          <Text style={styles.headerSubtitle}>{t.subheader}</Text>
        </View>

        {/* Input Card */}
        <View style={styles.card}>
          <View style={styles.inputHeader}>
            <Text style={styles.inputLabel}>{inputLabel}</Text>
            <TouchableOpacity onPress={toggleInputMode} style={styles.switchButton}>
              <RefreshCcw size={12} color="#2563eb" />
              <Text style={styles.switchButtonText}>
                {t.switch_to} {resultLabel}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={displayValue}
              onChangeText={handleInputChange}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
            <Text style={styles.currencySymbol}>{AMD_SYMBOL}</Text>
          </View>
        </View>

        {/* Tax Options Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.tax_options_header}</Text>

          {/* IT Sector Toggle */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <View style={styles.iconContainer}>
                <Cpu size={20} color="#10b981" />
              </View>
              <Text style={styles.toggleLabel}>{t.it_benefit}</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={isITSpecialist}
                onValueChange={setIsITSpecialist}
                trackColor={{ false: '#d1d5db', true: '#10b981' }}
                thumbColor={isITSpecialist ? '#ffffff' : '#ffffff'}
              />
            </View>
          </View>

          {/* PKS Options */}
          <View style={styles.pksSection}>
            <Text style={styles.pksHeader}>{t.pks_header}</Text>
            {PKS_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => setPksOption(option.id)}
                style={[
                  styles.pksOption,
                  pksOption === option.id && styles.pksOptionActive
                ]}
              >
                <View style={styles.radioButton}>
                  {pksOption === option.id && <View style={styles.radioButtonInner} />}
                </View>
                <View style={styles.pksOptionText}>
                  <Text style={styles.pksOptionLabel}>{option.label}</Text>
                  <Text style={styles.pksOptionDesc}>{option.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Results Card */}
        <View style={styles.resultsCard}>
          <View style={styles.resultsHeader}>
            <DollarSign size={24} color="#ffffff" />
            <Text style={styles.resultsTitle}>{t.results_header}</Text>
          </View>

          {/* Gross vs Net Display */}
          <View style={styles.resultsMain}>
            <Text style={styles.resultsLabel}>
              {isGrossInput ? t.input_gross_display : t.calculated_gross_display}
            </Text>
            <Text style={styles.resultsGrossValue}>
              {formatAMD(results.gross)}
            </Text>
            <Text style={styles.resultsLabel}>
              {isGrossInput ? t.calculated_net_display : t.input_net_display}
            </Text>
            <Text style={[
              styles.resultsNetValue,
              results.net < 0 && styles.resultsNetValueNegative
            ]}>
              {formatAMD(results.net)}
            </Text>
          </View>

          {/* Breakdown */}
          <View style={styles.breakdown}>
            <Text style={styles.breakdownTitle}>{t.breakdown_header}</Text>
            
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>
                {t.income_tax} ({isITSpecialist ? '10%' : '20%'}):
              </Text>
              <Text style={styles.breakdownValue}>
                - {formatAMD(results.it)}
              </Text>
            </View>

            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{t.stamp_duty}</Text>
              <Text style={styles.breakdownValue}>
                - {formatAMD(results.zah)}
              </Text>
            </View>

            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>{t.pks_employee}</Text>
              <Text style={styles.breakdownValue}>
                - {formatAMD(results.pks.pksEmployee)}
              </Text>
            </View>

            {results.pks.pksState > 0 && (
              <View style={[styles.breakdownRow, styles.breakdownRowBorder]}>
                <Text style={styles.breakdownLabelPositive}>{t.pks_state}</Text>
                <Text style={styles.breakdownValuePositive}>
                  + {formatAMD(results.pks.pksState)}
                </Text>
              </View>
            )}
            
            {(results.pks.pksEmployee > 0 || results.pks.pksState > 0) && (
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabelTotal}>{t.pks_total}</Text>
                <Text style={styles.breakdownValueTotal}>
                  {formatAMD(results.pks.pksTotal)}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{t.footer_note}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingTop: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  languageSelector: {
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'flex-end',
  },
  languageButtons: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  languageButtonActive: {
    backgroundColor: '#2563eb',
  },
  languageButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  languageButtonTextActive: {
    color: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
    minWidth: 120,
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    flexShrink: 1,
  },
  switchButtonText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#2563eb',
    marginLeft: 4,
    flexWrap: 'wrap',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1f2937',
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    paddingBottom: 8,
    paddingRight: 40,
  },
  currencySymbol: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minHeight: 50,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 12,
    paddingTop: 2,
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  iconContainer: {
    paddingTop: 2,
  },
  switchContainer: {
    paddingTop: 2,
  },
  pksSection: {
    marginTop: 16,
  },
  pksHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  pksOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  pksOptionActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  pksOptionText: {
    marginLeft: 12,
    flex: 1,
    flexShrink: 1,
  },
  pksOptionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
    flexWrap: 'wrap',
  },
  pksOptionDesc: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
    flexWrap: 'wrap',
  },
  resultsCard: {
    backgroundColor: '#2563eb',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  resultsMain: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    paddingBottom: 12,
    marginBottom: 16,
  },
  resultsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  resultsGrossValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginVertical: 4,
  },
  resultsNetValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fbbf24',
    marginTop: 8,
  },
  resultsNetValueNegative: {
    color: '#fca5a5',
  },
  breakdown: {
    marginTop: 16,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    paddingBottom: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  breakdownRowBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    paddingTop: 8,
  },
  breakdownLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
    marginRight: 8,
  },
  breakdownLabelPositive: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fbbf24',
    flex: 1,
    marginRight: 8,
  },
  breakdownLabelTotal: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    flex: 1,
    marginRight: 8,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fca5a5',
  },
  breakdownValuePositive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  breakdownValueTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default SalaryCalculator;
