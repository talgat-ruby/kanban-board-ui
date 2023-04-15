import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const metadata = {
    title: "Kanban Project",
    description: "Sample Kanban project",
};

const font = Plus_Jakarta_Sans({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                {/* <Navbar /> */}
                {children}
            </body>
        </html>
    );
}
