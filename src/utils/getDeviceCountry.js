import * as RNLocalize from "react-native-localize";
import { countries } from "country-data";

export const getDeviceCountry = () => {
  const locales = RNLocalize.getLocales();

  if (!locales || locales.length === 0) {
    return {
      code: "IN",
      dialCode: "+91",
      flag: "🇮🇳",
    };
  }

  const countryCode = locales[0].countryCode; // e.g. "US", "IN"

  const country = countries[countryCode];

  return {
    code: countryCode,
    dialCode: country?.countryCallingCodes?.[0] || "+91",
    flag: country?.emoji || "🇮🇳",
  };
};
