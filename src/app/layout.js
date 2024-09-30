import "./globals.css";
import { Poppins } from 'next/font/google'
import { AuthProvider } from "./Providers";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata = {
  title: "Connect Spot",
  description: "Connect Spot is a platform for event management.",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={poppins.variable}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
