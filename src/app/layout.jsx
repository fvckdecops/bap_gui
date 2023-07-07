import CarouselElement from './carousel';
import './globals.css';
import Navbar from './menu';

export const metadata = {
    title: 'Bagas Adji Pratama',
    description: 'BAP - Play with your code, not your bot',
    icons:{
        icon: '/bap.svg'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <CarouselElement />
                <main className='main'>
                    {children}
                </main>
            </body>
        </html>
    );
}
