import Background from '@/components/background';
import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Weather Next App',
  description: 'App created on next to watch the weather',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="100vh bg-slate-300 w-full">
          <Background />
          <div className="flex  sm:text-base justify-center items-center w-full md:h-screen">
            <div className="flex justify-center p-2 md:p-10 shadow-xl  z-10 min-w-[320px] md:min-w-[640px] border-white border-[1px] backdrop-blur-lg border-opacity-30 shadow-slate-800  h-auto  bg-sky-600 bg-opacity-60  rounded-lg overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
