import dappDataBackup from '@data/dapp.json';
import defaultAppSettings from '@data/defaultAppSettings.json';
import { useEffect, useState } from 'react';

import { _lStorageDappStore, _lStorageSettings } from '@utils/constant';
import { getFromLocalStorage, saveToLocalStorage } from '@utils/util';

import { DappForm } from '@Interface/form';

export const useDappData = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [storageData, setStorageData] = useState<Record<string, DappForm>>({});
  const [filteredData, setFilteredData] = useState<Record<string, DappForm>>(
    {},
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchData = () => {
      try {
        let localStorage: Record<string, DappForm> | null =
          getFromLocalStorage(_lStorageDappStore);

        if (!localStorage) {
          localStorage = dappDataBackup;
          saveToLocalStorage(_lStorageDappStore, localStorage);
        }

        if (localStorage) {
          const uniqueCategories = [
            'All',
            ...new Set(
              Object.values(localStorage).map((field) => field.category),
            ),
          ];
          setCategoryList(uniqueCategories);
          setStorageData(localStorage);
          setFilteredData(localStorage);
        }
      } catch (e) {
        console.error('Failed to parse stored value');
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let settings = getFromLocalStorage(_lStorageSettings);

    if (!settings.dappStore) {
      settings.dappStore = { ...defaultAppSettings.dappStore };
      saveToLocalStorage(_lStorageSettings, settings);
    }
    setSelectedCategory(settings.dappStore.selectedCategory);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newFilteredData = Object.entries(storageData)
      .filter(
        ([key, field]) =>
          selectedCategory === 'All' || field.category === selectedCategory,
      )
      .reduce(
        (acc, [key, field]) => ({ ...acc, [key]: field }),
        {} as Record<string, DappForm>,
      );

    setFilteredData(newFilteredData);
    setLoading(Object.keys(newFilteredData).length === 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, storageData]);

  return {
    loading,
    categoryList,
    filteredData,
    selectedCategory,
    setSelectedCategory,
  };
};
