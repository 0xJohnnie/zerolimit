'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@mantine/core';

import { _buttonSize } from '@utils/constant';
import { getPWADisplayMode } from '@utils/util';

declare global {
  interface Window {
    deferredPrompt: any;
  }
}

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const router = useRouter();

  const pwaDisplayMode = getPWADisplayMode();
  const isDevEnv = process.env.NODE_ENV === 'development';

  console.log('pwaDisplayMode', pwaDisplayMode);

  useEffect(() => {
    if (isDevEnv) return;

    console.error('START InstallPWA useEffect');

    const handleBeforeInstallPrompt = (event: {
      preventDefault: () => void;
    }) => {
      console.log('👍', 'beforeinstallprompt', event);
      event.preventDefault();

      window.deferredPrompt = event;

      setSupportsPWA(true);
      setPromptInstall(event);
    };

    console.debug('Before ADDING beforeinstallprompt event listener');

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    console.error('END InstallPWA useEffect');
    return () => {
      console.debug('Before REMOVING beforeinstallprompt event listener');
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, [isDevEnv]);

  const onClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    promptInstall.prompt();

    const result = await promptInstall.userChoice;

    console.log('👍', 'userChoice', result);

    window.deferredPrompt = null;

    if (result.outcome === 'accepted') {
      setPromptInstall(null);
    }

    router.refresh();
  };

  if (!supportsPWA || !promptInstall || pwaDisplayMode === 'standalone') {
    return null;
  }

  return (
    <Button
      aria-label="Add to home screen"
      size={_buttonSize}
      onClick={onClick}
      fullWidth
    >
      Add to home screen
    </Button>
  );
};

export default InstallPWA;
