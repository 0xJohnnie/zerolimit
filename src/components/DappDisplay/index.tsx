'use client';

import { useCallback, useMemo } from 'react';

import { SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';

import { _iconHalfSize } from '@utils/constant';

// Removed unused imports: _lStorageSettings, saveToLocalStorage, Chip, Flex, ScrollArea
// Removed unused style import: dappStoreScrollbarClass
import { DappForm } from '@Interface/form';

// Import DappForm
import textClass from '@style/Text.module.css';

import { DappCard } from './DappCard';
import { useDappData } from './useDappData';

interface DappDisplayProps {
  mainCategory?: string; // Existing prop for filtering via hook
  data?: Record<string, DappForm>; // Optional prop for pre-filtered data
}

const DappDisplay = ({ mainCategory, data }: DappDisplayProps) => {
  // Call hook unconditionally to get data if 'data' prop is not provided
  const hookData = useDappData({ mainCategory });

  // Determine loading state and data source
  const loading = data ? false : hookData.loading; // If data prop exists, not loading
  const displayData = data || hookData.filteredData; // Use data prop if available, else hook data

  const handleWebsiteClick = useCallback(
    (event: { preventDefault: () => void }, website: string) => {
      if (!website) {
        event.preventDefault();
      }
    },
    [],
  );

  const handleSocialClick = useCallback(
    (event: { preventDefault: () => void }, socialValue: string) => {
      if (!socialValue) {
        event.preventDefault();
      }
    },
    [],
  );

  // Removed handleChange function

  const dappCards = useMemo(() => {
    // Use displayData which is either the prop or from the hook
    return Object.entries(displayData).map(([key, field]) => (
      <DappCard
        key={key}
        field={field}
        handleWebsiteClick={handleWebsiteClick}
        handleSocialClick={handleSocialClick}
      />
    ));
  }, [displayData, handleWebsiteClick, handleSocialClick]); // Depend on displayData

  return (
    <>
      <Stack mt={_iconHalfSize}>
        <Skeleton visible={loading}>
          {/* Check displayData instead of filteredData */}
          {displayData && Object.keys(displayData).length > 0 ? (
            <>
              {/* Removed Chip.Group and ScrollArea for category filtering */}
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} mt={16}>
                {dappCards}
              </SimpleGrid>
            </>
          ) : (
            <Title className={textClass.title} ta="center" m={50}>
              No Result
            </Title>
          )}
        </Skeleton>
      </Stack>
    </>
  );
};

export default DappDisplay;
