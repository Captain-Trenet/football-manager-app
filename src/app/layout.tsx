import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar/sidebar";
import Providers from "@/redux/providers";

export const metadata: Metadata = {
  title: "Football manager app",
  description:
    "Welcome to the Football Manager App, a web application for managing football team rosters and formations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <div style={{ display: "flex" }}>
            <Sidebar />
            <div
              style={{
                padding: "40px",
                height: "100vh",
                width: "100%",
                backgroundColor: "#222222",
              }}
            >
              <Providers>{children}</Providers>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
