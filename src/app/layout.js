import "./globals.css";
import AppWrapper from "@/components/layout/AppWrapper";

export const metadata = {
  title: "Family Memory Vault 🏡",
  description: "A premium space to save and relive your beautiful family memories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>

      <body>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}



