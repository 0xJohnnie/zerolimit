'use client';

import dappData from '@data/dapp.json';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import {
  Badge,
  Button,
  Card,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';

import buttonClass from '@style/Button.module.css';
import textClass from '@style/Text.module.css';

interface DappSocial {
  twitter: string;
  discord: string;
  telegram: string;
  youtube: string;
  github: string;
}

interface DappItem {
  dateAdded: number;
  dappName: string;
  category: string;
  logo: string;
  website: string;
  dappSocial: DappSocial;
  mainCategory: string;
}

type DappData = Record<string, DappItem>;

const CategoryPage = () => {
  const params = useParams();
  const mainCategoryParam = params?.mainCategory;

  // Decode the main category name
  const decodedMainCategory = useMemo(() => {
    if (!mainCategoryParam) return undefined;
    const category = Array.isArray(mainCategoryParam)
      ? mainCategoryParam[0]
      : mainCategoryParam;
    try {
      return decodeURIComponent(category);
    } catch (e) {
      console.error('Failed to decode main category:', e);
      return undefined; // Handle potential decoding errors
    }
  }, [mainCategoryParam]);

  // Convert JSON object to array and filter by mainCategory
  const dappsInMainCategory = useMemo(() => {
    if (!decodedMainCategory) return [];
    // Ensure dappData is treated as the correct type
    const data = dappData as DappData;

    return Object.values(data).filter(
      (dapp) => dapp.mainCategory === decodedMainCategory,
    );
  }, [decodedMainCategory]);

  // Get unique sub-categories with counts for the current mainCategory
  const uniqueCategories = useMemo(() => {
    const categoryCounts = new Map<string, number>();
    dappsInMainCategory.forEach((dapp) => {
      if (dapp.category) {
        // Ensure category is not empty/null
        categoryCounts.set(
          dapp.category,
          (categoryCounts.get(dapp.category) || 0) + 1,
        );
      }
    });
    // Convert map to array of { name: string, count: number }
    return Array.from(categoryCounts, ([name, count]) => ({ name, count }));
  }, [dappsInMainCategory]);

  // Handle loading or invalid state
  if (!decodedMainCategory) {
    return (
      <Stack align="center" mt="xl">
        <Text>Loading category or category not found...</Text>
        <Button component={Link} href="/dappstore">
          Back to Dapp Store
        </Button>
      </Stack>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      {/* Simple Back Button */}
      <Button
        component={Link}
        href="/dappstore"
        aria-label="Back to Dapp Store"
        className={buttonClass.buttonSelected}
        mb="md"
      >
        ← Back to Dapp Store
      </Button>

      {/* Page Title */}
      <Title order={2} className={textClass.title} mb="lg">
        {decodedMainCategory}
      </Title>

      {/* Display Grid of Categories as Links */}
      {uniqueCategories.length > 0 ? (
        <SimpleGrid
          cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
          spacing="lg"
          verticalSpacing="lg"
          w="100%"
        >
          {uniqueCategories.map((category) => (
            <Card
              key={category.name}
              className={buttonClass.buttonDefault}
              shadow="sm"
              radius="lg"
              padding="lg"
              withBorder
              component={Link}
              href={`/dappstore/${encodeURIComponent(
                decodedMainCategory,
              )}/${encodeURIComponent(category.name)}`}
            >
              <Text
                fw={500}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {category.name}
                <Badge
                  color="pink"
                  style={{
                    marginLeft: 'var(--mantine-spacing-xs)',
                  }}
                >
                  {category.count}
                </Badge>
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No sub-categories found for {decodedMainCategory}.</Text>
      )}
    </div>
  );
};

export default CategoryPage;
