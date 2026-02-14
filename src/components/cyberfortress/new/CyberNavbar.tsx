"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from '../CyberFortress.module.css';
import gsap from 'gsap';
import Link from 'next/link';

export function CyberNavbar() {
    const navbarRef = useRef<HTMLElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const mobileToggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                if (!navbar.classList.contains(styles.scanned)) {
                    navbar.classList.add(styles.scanned);
                }
                gsap.to(navbar, { backgroundColor: 'rgba(0, 0, 0, 0.95)', padding: '1rem 0', duration: 0.3 });
            } else {
                gsap.to(navbar, { backgroundColor: 'rgba(10, 10, 10, 0.85)', padding: '1.2rem 0', duration: 0.3 });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        const navLinks = mobileMenuRef.current;
        const spans = mobileToggleRef.current?.querySelectorAll('span');

        if (!isMobileMenuOpen) {
            // Open menu
            if (navLinks && spans) {
                navLinks.style.display = 'flex';
                // A simple way to show it for now, can be improved with classes
                gsap.fromTo(navLinks.querySelectorAll('a'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" });

                gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
                gsap.to(spans[1], { opacity: 0, duration: 0.3 });
                gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
            }
        } else {
            // Close menu
            if (navLinks && spans) {
                gsap.to(navLinks, {
                    opacity: 0, duration: 0.3, onComplete: () => {
                        navLinks.style.display = 'none';
                        navLinks.style.opacity = '1';
                    }
                });

                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { opacity: 1, duration: 0.3 });
                gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
            }
        }
    };

    return (
        <header ref={navbarRef} className={styles.navbar}>
            <div className={`${styles.container} ${styles.navbarContainer}`}>
                <Link href="/index.html" className={styles.logo}>
                    <span className={styles.redIcon}>▲</span>
                    <span className="logo-text">CyberFortress</span>
                </Link>
                <nav ref={mobileMenuRef} className={styles.navLinks}>
                    <Link href="#" className={styles.navLink}>Overview</Link>
                    <Link href="#" className={styles.navLink}>Features</Link>
                    <Link href="#" className={styles.navLink}>Architecture</Link>
                    <Link href="#" className={styles.navLink}>Security</Link>
                    <Link href="#" className={styles.navLink}>Use Cases</Link>
                    <Link href="#" className={styles.navLink}>Integrations</Link>
                    <Link href="#" className={styles.navLink}>Demo</Link>
                </nav>
                <button
                    ref={mobileToggleRef}
                    className={styles.mobileToggle}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
