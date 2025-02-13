// src/utils/currencyConverter.ts

// Příklad statických kurzů (tyto hodnoty je třeba pravidelně aktualizovat)
const conversionRates: { [currency: string]: number } = {
    USD: 0.044, // např. 1 Kč = 0.044 USD
    EUR: 0.040, // 1 Kč = 0.040 EUR
    // Přidejte další měny podle potřeby
  };
  
  /**
   * Převod ceny z Kč do zadané cílové měny.
   * @param priceInCZK - cena v českých korunách
   * @param targetCurrency - cílová měna (např. 'USD', 'EUR')
   * @returns cena v cílové měně
   */
  export const convertPrice = (priceInCZK: number, targetCurrency: string): number => {
    const rate = conversionRates[targetCurrency];
    if (!rate) {
      // Pokud není definován kurz, vracíme původní cenu
      return priceInCZK;
    }
    return priceInCZK * rate;
  };
  
  /**
   * Formátování ceny pomocí Intl.NumberFormat.
   * @param price - cena, kterou chceme naformátovat
   * @param currency - kód měny (např. 'USD', 'EUR', 'CZK')
   * @param locale - volitelně locale (např. 'en-US', 'cs-CZ'); výchozí je 'en-US'
   * @returns naformátovaný řetězec s cenou
   */
  export const formatPrice = (price: number, currency: string, locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(price);
  };
  