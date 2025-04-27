import dappData from '@data/dapp.json';
import { Metadata } from 'next';
import Link from 'next/link';

import { Badge, Box, Card, SimpleGrid, Text, Title } from '@mantine/core';

import { _cssTitle } from '@utils/constant';

import { DappForm } from '@Interface/form';

import buttonClass from '@style/Button.module.css';

export const metadata: Metadata = {
  alternates: {
    canonical: '/dappstore',
    languages: {
      'en-US': '/en-US',
    },
  },
};

// Helper function to get unique main categories and their counts
const getMainCategories = (data: Record<string, DappForm>) => {
  const categories: Record<string, number> = {};
  Object.values(data).forEach((dapp) => {
    if (dapp.mainCategory) {
      categories[dapp.mainCategory] = (categories[dapp.mainCategory] || 0) + 1;
    }
  });
  return Object.entries(categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
};

const DappStore = () => {
  const mainCategories = getMainCategories(dappData);

  return (
    <>
      <Box>
        <Title className={_cssTitle}>Dapp Store</Title>

        <SimpleGrid
          cols={{ base: 1, xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing="lg"
          verticalSpacing="lg"
          mt="xl"
        >
          {mainCategories.map(
            (category) =>
              category.count > 0 && ( // Only render if count > 0
                <Card
                  key={category.name}
                  className={buttonClass.buttonDefault}
                  bg="var(--dark-color-secondary)"
                  shadow="sm"
                  radius="lg"
                  padding="lg"
                  withBorder
                  component={Link}
                  href={`/dappstore/${encodeURIComponent(category.name)}`}
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
              ),
          )}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default DappStore;
