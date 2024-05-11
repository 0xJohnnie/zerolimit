'use client';

import { useCallback, useMemo } from 'react';

import {
  Chip,
  Flex,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Stack,
  Title,
} from '@mantine/core';

import { _iconHalfSize, _lStorageSettings } from '@utils/constant';
import { saveToLocalStorage } from '@utils/util';

import dappStoreScrollbarClass from '@style/DappStoreScrollbar.module.css';
import textClass from '@style/Text.module.css';

import { DappCard } from './DappCard';
import { useDappData } from './useDappData';

const DappDisplay = () => {
  const {
    loading,
    categoryList,
    filteredData,
    selectedCategory,
    setSelectedCategory,
  } = useDappData();

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

  const handleChange = useCallback((selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    saveToLocalStorage(_lStorageSettings, {
      dappStore: { selectedCategory: selectedCategory },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dappCards = useMemo(() => {
    return Object.entries(filteredData).map(([key, field]) => (
      <DappCard
        key={key}
        field={field}
        handleWebsiteClick={handleWebsiteClick}
        handleSocialClick={handleSocialClick}
      />
    ));
  }, [filteredData, handleWebsiteClick, handleSocialClick]);

  return (
    <>
      <Stack mt={_iconHalfSize}>
        <Skeleton visible={loading}>
          {filteredData && Object.keys(filteredData).length > 0 ? (
            <>
              <Chip.Group
                multiple={false}
                value={selectedCategory}
                onChange={handleChange}
              >
                <ScrollArea
                  classNames={dappStoreScrollbarClass}
                  type="always"
                  offsetScrollbars
                  scrollbarSize={8}
                  pb={8}
                >
                  <Flex
                    mah={categoryList.length > 10 ? 100 : 50}
                    bg="rgba(0, 0, 0, .3)"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                  >
                    {categoryList.map((category) => (
                      <Chip key={category} value={category} size="sm" p={8}>
                        {category}
                      </Chip>
                    ))}
                  </Flex>
                </ScrollArea>
              </Chip.Group>

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
