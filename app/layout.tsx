import "./globals.css";

export const metadata = {
  title: "Atmos Weather",
  description: "A high-fidelity weather dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0f101a] text-white">
        {children}
      </body>
    </html>
  );
}