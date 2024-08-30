import type { Metadata } from 'next';
import './globals.css';
import {NextUIProvider} from '@nextui-org/react';
import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  title: 'Prueba Técnica',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
       
        <body>
          <StoreProvider>
            <NextUIProvider>
              {children}
            </NextUIProvider>
          </StoreProvider>
          
        </body>
      
    </html>
  );
}
