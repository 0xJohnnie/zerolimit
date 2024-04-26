import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import AppConfig from '@utils/AppConfig';
import { _defaultColorScheme } from '@utils/constant';
import { theme } from '@utils/theme';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(AppConfig.site as string),
  title: AppConfig.title + ' | ' + AppConfig.description,
  description: AppConfig.description,
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  applicationName: AppConfig.site_name,
  icons: {
    icon: '/icon/logo-light.png',
    apple: '/icon/apple-touch-icon.png',
  },
  other: {
    version: AppConfig.version,
  },
  appleWebApp: {
    title: AppConfig.title,
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
  twitter: {
    card: 'summary_large_image',
    creator: AppConfig.author.name,
    title: {
      default: AppConfig.title,
      template: AppConfig.title_template,
    },
    description: AppConfig.description,
  },
  keywords: AppConfig.keywords,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: false,
  themeColor: 'black',
};

const MainAppShell = dynamic(() => import('@components/_MainAppShell'));

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme={_defaultColorScheme} />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme={_defaultColorScheme}>
          <MainAppShell>{children}</MainAppShell>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
