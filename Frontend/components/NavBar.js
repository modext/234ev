import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoMark from "./LogoMark";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/download", label: "Download App" },
  { href: "/stations", label: "Charging Stations" },
  { href: "/tips", label: "Tips" },
  { href: "/submit", label: "Add a spot" },
  { href: "/shops", label: "Maintenance Shops" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="navbar" style={styles.header}>
      <div className="container navbar-inner" style={styles.inner}>
        <Link href="/" style={styles.brand}>
          <LogoMark size={26} />
          <span style={styles.brandText}>234ev</span>
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            style={{
              ...styles.toggleBar,
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              ...styles.toggleBar,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              ...styles.toggleBar,
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>

        <nav
          className={`navbar-nav${menuOpen ? " navbar-nav--open" : ""}`}
          aria-hidden={!menuOpen ? undefined : false}
        >
          {LINKS.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar-link${active ? " navbar-link--active" : ""}`}
                style={{
                  color: active ? "var(--color-primary)" : "var(--color-text)",
                  fontWeight: active ? 600 : 500,
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="navbar-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
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
    position: "relative",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    zIndex: 22,
  },
  brandText: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 18,
  },
  toggleBar: {
    display: "block",
    width: 22,
    height: 2,
    background: "var(--color-text)",
    borderRadius: 2,
    transition: "transform 0.2s ease, opacity 0.2s ease",
  },
};
