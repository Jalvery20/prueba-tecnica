'use client'
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import StoreProvider from "../shared/lib/StoreProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
       <head>
        <title>Prueba Técnica</title>
       </head>
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
