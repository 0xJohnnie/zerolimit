'use client';

import dappData from '@data/dapp.json';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { Button, Stack, Text } from '@mantine/core';

import DappDisplay from '@components/DappDisplay';

import { DappForm } from '@Interface/form';

import buttonClass from '@style/Button.module.css';

const CategoryPage = ({ params }: any) => {
  // Use useParams to get route parameters client-side if needed,
  // but params prop should suffice here. Let's get mainCategory for the back button link.
  const routeParams = useParams();
  const mainCategoryParam = routeParams?.mainCategory;

  // Decode the main category name for the back button link and text
  const decodedMainCategory = useMemo(() => {
    if (!mainCategoryParam) return undefined;
    const category = Array.isArray(mainCategoryParam)
      ? mainCategoryParam[0]
      : mainCategoryParam;
    try {
      // Decoding might not be necessary if Next.js already decodes it,
      // but kept for consistency with the reference component logic.
      return decodeURIComponent(category);
    } catch (e) {
      console.error('Failed to decode main category:', e);
      return undefined; // Handle potential decoding errors
    }
  }, [mainCategoryParam]);

  // Decode URL parameters passed via props for filtering
  // It's generally better to rely on the props directly if Next.js handles decoding.
  const mainCategorySlug = decodeURIComponent(params.mainCategory);
  const categorySlug = decodeURIComponent(params.category);

  // Filter the dappData object based on both mainCategory and category
  const filteredDapps = useMemo(() => {
    return Object.entries(dappData as Record<string, DappForm>)
      .filter(([key, dapp]) => {
        // Match mainCategory and category against the decoded slugs
        return (
          dapp.mainCategory === mainCategorySlug &&
          dapp.category === categorySlug
        );
      })
      .reduce<Record<string, DappForm>>((acc, [key, dapp]) => {
        acc[key] = dapp;
        return acc;
      }, {});
  }, [mainCategorySlug, categorySlug]); // Depend on decoded slugs

  // Handle case where decodedMainCategory might not be ready for the button
  if (!decodedMainCategory) {
    // Optional: Show a loading state or a generic back button
    return (
      <Stack align="center" mt="xl">
        <Text>Loading category details...</Text>
        {/* Fallback back button */}
        <Button component={Link} href="/dappstore">
          Back to Dapp Store
        </Button>
      </Stack>
    );
  }

  return (
    // Container div with styling similar to the main category page
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      {/* Back Button */}
      <Button
        component={Link}
        // Dynamically create the href back to the main category page
        href={`/dappstore/${encodeURIComponent(decodedMainCategory)}`}
        aria-label="Back to Main Category"
        className={buttonClass.buttonSelected}
        mb="md" // Add bottom margin
      >
        {/* Dynamically set the button text */}
        {`← Back to ${decodedMainCategory}`}
      </Button>

      {/* Existing DappDisplay component */}
      {/* Pass the pre-filtered data to DappDisplay */}
      <DappDisplay data={filteredDapps} />
    </div>
  );
};

export default CategoryPage;
