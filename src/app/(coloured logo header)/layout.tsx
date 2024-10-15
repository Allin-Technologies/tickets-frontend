import { Header } from "@/components/navigation/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header variant='coloured' />
      {children}
    </>
  );
}
