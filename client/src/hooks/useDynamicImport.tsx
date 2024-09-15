'use client';

import PACKAGE_JSON from '@ROOT/package.json';
import React, { useEffect, useRef, useState } from 'react';

interface IOptions {
  onCompleted?: (_name: string, _svgIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined) => void;
  onError?: (_err: Error | unknown) => void;
  fileType?: 'icons' | 'images';
  suffix?: string;
}

interface IUseDynamicImportOutput {
  error: Error | unknown;
  loading: boolean;
  svgIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
}

const STATIC_DIR = PACKAGE_JSON.config.STATIC_DIR;
const ASSETS_DIR = `~/public/assets`;

export const useDynamicImport = (fileName: string, options: IOptions = {}): IUseDynamicImportOutput => {
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>();

  const { onCompleted, onError, fileType = 'icons', suffix = 'svg' } = options;

  const PATH_OPTIONS = {
    icons: `${ASSETS_DIR}/icons/${fileName}.${suffix}`,
    images: `${ASSETS_DIR}/images/${fileName}.${suffix}`,
    logos: `${ASSETS_DIR}/logos/${fileName}.${suffix}`,
  };
  console.log('PATH_OPTIONS', PATH_OPTIONS);
  useEffect(() => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        /*
        ImportedIconRef.current = (await import(PATH_OPTIONS[fileType])).ReactComponent;
*/
        const { default: namedImport } = await import(PATH_OPTIONS[fileType]);
        ImportedIconRef.current = namedImport;

        onCompleted?.(fileName, ImportedIconRef.current);
      } catch (err) {
        console.error('useDynamicImport error', err);
        setError(err);
        onError?.(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [fileName, fileType, onCompleted, onError]);

  return { error, loading, svgIcon: ImportedIconRef.current };
};
