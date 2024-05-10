import { IconWorld } from '@tabler/icons-react';
import Link from 'next/link';
import { FC, MouseEvent, useMemo } from 'react';
import voca from 'voca';

import { Badge, Button, Card, Group, SimpleGrid, Title } from '@mantine/core';

import { inputFields } from '@components/DappInputForm/util';

import { _iconSize, _iconStroke } from '@utils/constant';

import { DappForm } from '@Interface/form';

import buttonClass from '@style/Button.module.css';

import { getButtonBackgroundColor, getButtonURL } from './util';

interface DappCardProps {
  field: DappForm;
  handleWebsiteClick: (event: MouseEvent, website: string) => void;
  handleSocialClick: (event: MouseEvent, socialValue: string) => void;
}

export const DappCard: FC<DappCardProps> = ({
  field,
  handleWebsiteClick,
  handleSocialClick,
}) => {
  const socialButtons = useMemo(() => {
    return Object.entries(field.dappSocial).map(([socialKey, socialValue]) => {
      const matchingInputField = inputFields.find(
        (inputField) => inputField.name === voca.titleCase(socialKey),
      );

      const buttonURL = getButtonURL(socialKey);
      const backgroundColor = getButtonBackgroundColor(socialKey, socialValue);

      return (
        <Button
          component={Link}
          href={buttonURL + socialValue}
          target="_blank"
          data-disabled={!socialValue}
          onClick={(event) => handleSocialClick(event, socialValue)}
          style={{ backgroundColor }}
          key={socialKey}
          radius="md"
          size="sm"
          className={socialValue && buttonClass.socialButtonDefault}
          leftSection={matchingInputField?.icon}
        >
          {voca.titleCase(socialKey)}
        </Button>
      );
    });
  }, [field.dappSocial, handleSocialClick]);

  return (
    <>
      <Card
        key={field.dappName}
        bg="var(--dark-color-secondary)"
        shadow="sm"
        padding="sm"
        radius="lg"
        withBorder
      >
        <Group align="center" justify="space-between" gap={4} mb={_iconSize}>
          <Title order={2}>{field.dappName}</Title>
          <Badge color="#555">{field.category}</Badge>
        </Group>
        <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} spacing="xs">
          <Button
            component={Link}
            href={field.website}
            target="_blank"
            onClick={(event) => handleWebsiteClick(event, field.website)}
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

          {socialButtons}
        </SimpleGrid>
      </Card>
    </>
  );
};
