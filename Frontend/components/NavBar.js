import Link from "next/link";
import { useRouter } from "next/router";
import LogoMark from "./LogoMark";

const LINKS = [
  { href: "/", label: "Map" },
  { href: "/shops", label: "Shops" },
  { href: "/tips", label: "Tips" },
  { href: "/submit", label: "Add a spot" },
];

export default function NavBar() {
  const router = useRouter();

  return (
    <header style={styles.header}>
      <div className="container" style={styles.inner}>
        <Link href="/" style={styles.brand}>
          <LogoMark size={26} />
          <span style={styles.brandText}>234ev</span>
        </Link>
        <nav style={styles.nav}>
          {LINKS.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  ...styles.link,
                  color: active ? "var(--color-primary)" : "var(--color-text)",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    borderBottom: "1px solid var(--color-border)",
    background: "var(--color-surface)",
    position: "sticky",
    top: 0,
    zIndex: 20,
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brandText: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 18,
  },
  nav: {
    display: "flex",
    gap: 24,
  },
  link: {
    fontSize: 14,
  },
};
