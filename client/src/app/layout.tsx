import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "@/theme/theme";
import { Inter } from "next/font/google";

// Allows FontAwesome styles to work properly
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// this makes the global.css accessible in all pages
import "@/theme/global.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// inter theme is here instead of theme file due to import issues
const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * This layout file affects ALL FILES in the project
 * Theme for the Typography MUI component is set here
 * Backround color, and to flush components into pages is set here
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#F6F8FF",
          margin: 0, // flushes components into the screen
        }}
        className={inter.variable}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
