export const metadata = {
  title: 'Memory Game - Silicon Misiones',
  description: 'Juego de memoria desarrollado en Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}