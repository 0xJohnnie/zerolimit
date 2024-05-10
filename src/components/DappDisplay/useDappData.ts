import dappDataBackup from '@data/dapp.json';
import { useEffect, useState } from 'react';

import { _dappForm } from '@utils/constant';
import { getFromLocalStorage, saveToLocalStorage } from '@utils/util';

import { DappForm } from '@Interface/form';

export const useDappData = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [storageData, setStorageData] = useState<Record<string, DappForm>>({});
  const [filteredData, setFilteredData] = useState<Record<string, DappForm>>(
    {},
  );
  const [value, setValue] = useState('All');

  useEffect(() => {
    const fetchData = () => {
      try {
        let storedValue: Record<string, DappForm> | null =
          getFromLocalStorage(_dappForm);

        if (storedValue === null || Object.keys(storedValue).length === 0) {
          storedValue = dappDataBackup;
          saveToLocalStorage(_dappForm, storedValue);
        }

        if (Object.keys(storageData).length === 0 && storedValue) {
          const uniqueCategories = [
            'All',
            ...new Set(
              Object.values(storedValue).map((field) => field.category),
            ),
          ];
          setCategoryList(uniqueCategories);
          setStorageData(storedValue);
          setFilteredData(storedValue);
        }
      } catch (e) {
        console.error('Failed to parse stored value');
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newFilteredData = Object.entries(storageData)
      .filter(([key, field]) => value === 'All' || field.category === value)
      .reduce(
        (acc, [key, field]) => ({ ...acc, [key]: field }),
        {} as Record<string, DappForm>,
      );
    setFilteredData(newFilteredData);
    setLoading(Object.keys(newFilteredData).length === 0);
  }, [value, storageData]);

  return { loading, categoryList, filteredData, value, setValue };
};
