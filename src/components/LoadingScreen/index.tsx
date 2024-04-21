import { LoadingOverlay } from '@mantine/core';
import { _darkHoverColor } from '@utils/constant';

const LoadingScreen = () => {
  const loadingOverlayProps = {
    visible: true,
    zIndex: 1000,
    overlayProps: { blur: 2, backgroundOpacity: 0.08, color: _darkHoverColor },
    loaderProps: { color: _darkHoverColor, type: 'dots', size: 128 },
  };

  return <LoadingOverlay {...loadingOverlayProps} />;
};

export default LoadingScreen;
