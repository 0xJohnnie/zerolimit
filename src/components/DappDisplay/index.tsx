'use client';

import dappDataBackup from '@data/dapp.json';
import { IconWorld } from '@tabler/icons-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import voca from 'voca';

import {
  Badge,
  Button,
  Card,
  Chip,
  Flex,
  Group,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Stack,
  Title,
} from '@mantine/core';

import { inputFields } from '@components/DappInputForm/util';

import {
  _dappForm,
  _iconHalfSize,
  _iconSize,
  _iconStroke,
} from '@utils/constant';
import { getFromLocalStorage, saveToLocalStorage } from '@utils/util';

import { DappForm } from '@Interface/form';

import buttonClass from '@style/Button.module.css';
import dappStoreScrollbarClass from '@style/DappStoreScrollbar.module.css';
import textClass from '@style/Text.module.css';

import { getButtonBackgroundColor, getButtonURL } from './util';

const DappDisplay = () => {
  const [storageData, setStorageData] = useState<Record<string, DappForm>>({});
  const [filteredData, setFilteredData] = useState<Record<string, DappForm>>(
    {},
  );
  const [value, setValue] = useState('All');
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<string[]>([]);

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

  useEffect(() => {
    const fetchData = () => {
      try {
        const storedValue: Record<string, DappForm> | null =
          getFromLocalStorage(_dappForm);

        if (storedValue === null || Object.keys(storedValue).length === 0) {
          saveToLocalStorage(_dappForm, dappDataBackup);
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

  return (
    <>
      <Stack mt={_iconHalfSize}>
        <Skeleton visible={loading}>
          {filteredData && Object.keys(filteredData).length > 0 ? (
            <>
              <Chip.Group multiple={false} value={value} onChange={setValue}>
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
                {filteredData &&
                  Object.entries(filteredData).map(([key, field]) => (
                    <Card
                      key={key}
                      bg="var(--dark-color-secondary)"
                      shadow="sm"
                      padding="sm"
                      radius="lg"
                      withBorder
                    >
                      <Group
                        align="center"
                        justify="space-between"
                        gap={4}
                        mb={_iconSize}
                      >
                        <Title order={2}>{field.dappName}</Title>
                        <Badge color="#555">{field.category}</Badge>
                      </Group>
                      <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} spacing="xs">
                        <Button
                          component={Link}
                          href={field.website}
                          target="_blank"
                          onClick={(event) =>
                            handleWebsiteClick(event, field.website)
                          }
                          style={{
                            backgroundColor: 'var(--hover-color-primary)',
                          }}
                          radius="md"
                          size="sm"
                          className={buttonClass.socialButtonDefault}
                          leftSection={<IconWorld stroke={_iconStroke} />}
                        >
                          Website
                        </Button>

                        {Object.entries(field.dappSocial).map(
                          ([socialKey, socialValue]) => {
                            const matchingInputField = inputFields.find(
                              (inputField) =>
                                inputField.name === voca.titleCase(socialKey),
                            );

                            const buttonURL = getButtonURL(socialKey);
                            const backgroundColor = getButtonBackgroundColor(
                              socialKey,
                              socialValue,
                            );

                            return (
                              <Button
                                component={Link}
                                href={buttonURL + socialValue}
                                target="_blank"
                                data-disabled={!socialValue}
                                onClick={(event) =>
                                  handleSocialClick(event, socialValue)
                                }
                                style={{ backgroundColor }}
                                key={socialKey}
                                radius="md"
                                size="sm"
                                className={
                                  socialValue && buttonClass.socialButtonDefault
                                }
                                leftSection={matchingInputField?.icon}
                              >
                                {voca.titleCase(socialKey)}
                              </Button>
                            );
                          },
                        )}
                      </SimpleGrid>
                    </Card>
                  ))}
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
