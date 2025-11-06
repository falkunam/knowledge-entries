import "./globals.css";
import { ReactQueryProvider } from "./lib/provider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Knowledge Entries Dashboard",
  description: "CRUD Dashboard with React Query + JSON Server",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
