import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

import AppConfig from '@utils/AppConfig';
import { _defaultColorScheme, _logo, _logoApple } from '@utils/constant';
import { theme } from '@utils/theme';

import AuthParticle from './AuthParticle';
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
    icon: _logo,
    apple: _logoApple,
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
  manifest: '/manifest.json',
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
        <AuthParticle>
          <MantineProvider
            theme={theme}
            defaultColorScheme={_defaultColorScheme}
          >
            <Notifications position="top-right" style={{ marginTop: 48 }} />
            <MainAppShell>{children}</MainAppShell>
          </MantineProvider>
        </AuthParticle>
      </body>
    </html>
  );
};

export default RootLayout;
