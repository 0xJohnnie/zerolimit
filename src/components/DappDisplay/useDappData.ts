import defaultDappStoreData from '@data/dapp.json';
// Removed unused import: defaultAppSettings
import { useEffect, useState } from 'react';

import { _lStorageDappStore } from '@utils/constant';
// Removed unused: _lStorageSettings
import { getFromLocalStorage, saveToLocalStorage } from '@utils/util';

import { DappForm } from '@Interface/form';

interface UseDappDataProps {
  mainCategory?: string; // Add optional mainCategory prop
}

export const useDappData = ({ mainCategory }: UseDappDataProps = {}) => {
  const [loading, setLoading] = useState(true);
  // Removed categoryList state
  const [storageData, setStorageData] = useState<Record<string, DappForm>>({});
  const [filteredData, setFilteredData] = useState<Record<string, DappForm>>(
    {},
  );
  // Removed selectedCategory and setSelectedCategory state

  useEffect(() => {
    const fetchData = () => {
      setLoading(true); // Start loading
      try {
        let localStorageData: Record<string, DappForm> | null =
          getFromLocalStorage(_lStorageDappStore);

        // Robust Merge Logic: Prioritize default mainCategory if missing in local storage
        const finalMergedData: Record<string, DappForm> = {};
        const defaultKeys = Object.keys(defaultDappStoreData);
        const localKeys = localStorageData ? Object.keys(localStorageData) : [];
        const allKeys = new Set([...defaultKeys, ...localKeys]);

        for (const key of allKeys) {
          const defaultItem =
            defaultDappStoreData[key as keyof typeof defaultDappStoreData]; // Type assertion
          const localItem = localStorageData?.[key];

          if (defaultItem && localItem) {
            // Key exists in both: merge, prioritizing local storage EXCEPT for mainCategory if missing locally
            finalMergedData[key] = {
              ...defaultItem, // Start with defaults
              ...localItem, // Apply local storage overrides
              // Explicitly ensure mainCategory exists, preferring default if local is missing/undefined/null
              mainCategory: defaultItem.mainCategory || localItem.mainCategory,
            };
          } else if (defaultItem) {
            // Key only in default: use default
            finalMergedData[key] = defaultItem;
          } else if (localItem) {
            // Key only in local (user added): use local
            finalMergedData[key] = localItem;
          }
        }

        // Save merged data back if local storage was initially empty or structure differs significantly
        if (
          !localStorageData ||
          Object.keys(localStorageData).length !==
            Object.keys(finalMergedData).length
        ) {
          // Potential optimization: only save if actual changes occurred during merge
          saveToLocalStorage(_lStorageDappStore, finalMergedData);
        }

        // Sort data alphabetically by dappName
        const sortedEntries = Object.entries(finalMergedData).sort(
          ([_, a], [__, b]) =>
            a.dappName.localeCompare(b.dappName, undefined, {
              sensitivity: 'base',
            }),
        );
        const sortedData = Object.fromEntries(sortedEntries);
        setStorageData(sortedData); // Store the full sorted data

        // Filter based on mainCategory prop
        const newFilteredData = Object.entries(sortedData)
          .filter(
            ([, field]) =>
              !mainCategory || // Show all if no mainCategory is provided
              field.mainCategory?.trim().toLowerCase() ===
                mainCategory?.trim().toLowerCase(), // Case-insensitive and whitespace-trimmed comparison
          )
          .reduce(
            (acc, [key, field]) => ({ ...acc, [key]: field }),
            {} as Record<string, DappForm>,
          );

        setFilteredData(newFilteredData);
      } catch (e) {
        console.error('Failed to parse stored value or fetch data:', e);
        setFilteredData({}); // Set empty data on error
      } finally {
        setLoading(false); // Finish loading
      }
    };

    fetchData();
    // Dependency array includes mainCategory to refetch/refilter when it changes
  }, [mainCategory]);

  // Removed useEffect for setting selectedCategory from local storage
  // Removed useEffect for filtering based on selectedCategory

  return {
    loading,
    // Removed categoryList
    filteredData,
    // Removed selectedCategory, setSelectedCategory
  };
};
