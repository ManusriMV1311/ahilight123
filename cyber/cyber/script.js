document.addEventListener('DOMContentLoaded', () => {
    console.log("AhiLight System Initializing...");

    // Helper to safely initialize components
    const safeInit = (name, fn) => {
        try {
            fn();
            console.log(`[OK] ${name}`);
        } catch (e) {
            console.error(`[FAIL] ${name}:`, e);
        }
    };

    // Register GSAP plugins
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // --- Component Definitions ---

    const initGlobalBackground = () => {
        if (!window.THREE) return;

        let container = document.getElementById('hero-canvas');
        let isHero = true;

        // If no hero canvas (not index page), create global fixed background
        if (!container) {
            isHero = false;
            container = document.createElement('div');
            container.id = 'global-canvas';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '-1';
            container.style.pointerEvents = 'none';
            document.body.prepend(container);
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        camera.position.z = 5;

        // --- Shield & Core (Index/Hero Only) ---
        let shield, core;
        if (isHero) {
            // Shield Object
            const geometry = new THREE.DodecahedronGeometry(2, 0);
            const material = new THREE.MeshBasicMaterial({
                color: 0xff3333, wireframe: true, transparent: true, opacity: 0.3
            });
            shield = new THREE.Mesh(geometry, material);
            scene.add(shield);

            // Core glow
            const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
            const coreMat = new THREE.MeshBasicMaterial({ color: 0xff3333, transparent: true, opacity: 0.1 });
            core = new THREE.Mesh(coreGeo, coreMat);
            scene.add(core);
        }

        // --- Particles (Global) ---
        const particlesCount = window.innerWidth < 768 ? 500 : 1500;
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) positions[i] = (Math.random() - 0.5) * 15;
        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMat = new THREE.PointsMaterial({ color: 0xff3333, size: 0.02, transparent: true, opacity: 0.5 });
        const particles = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particles);

        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
        });

        const animate = () => {
            requestAnimationFrame(animate);

            if (isHero && shield && core) {
                shield.rotation.y += 0.005;
                shield.rotation.x += 0.002;
                core.rotation.y -= 0.008;
                shield.position.x += (mouseX - shield.position.x) * 0.05;
                shield.position.y += (-mouseY - shield.position.y) * 0.05;
            }

            // Global particles animation
            const posArr = particlesGeo.attributes.position.array;
            for (let i = 0; i < particlesCount * 3; i += 3) {
                posArr[i + 2] -= 0.02;
                if (posArr[i + 2] < -5) posArr[i + 2] = 10;
            }
            particlesGeo.attributes.position.needsUpdate = true;

            // Subtle camera movement for non-hero pages to add depth
            if (!isHero) {
                camera.position.x += (mouseX - camera.position.x) * 0.02;
                camera.position.y += (-mouseY - camera.position.y) * 0.02;
            }

            renderer.render(scene, camera);
        };
        animate();

        // Scroll ScrollTrigger for Hero elements
        if (window.gsap && isHero && shield) {
            gsap.to(camera.position, { z: 2, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
            gsap.to(shield.scale, { x: 0.5, y: 0.5, z: 0.5, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    const initScrollReveals = () => {
        if (!window.gsap) return;
        const revealSections = document.querySelectorAll('.reveal-section');
        revealSections.forEach(section => {
            const scanLine = document.createElement('div');
            scanLine.className = 'scan-reveal-line';
            section.appendChild(scanLine);

            ScrollTrigger.create({
                trigger: section,
                start: "top 80%",
                onEnter: () => {
                    section.classList.add('revealed');
                    gsap.fromTo(scanLine, { top: '0%', opacity: 1 }, { top: '100%', opacity: 0, duration: 1.2, ease: "power2.inOut" });

                    if (section.id === 'problem-section') {
                        gsap.from('.glitch-card', { y: 50, rotationX: 15, opacity: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" });
                    }
                    if (section.id === 'product-highlight') {
                        const solutionCard = section.querySelector('.solution-card');
                        setTimeout(() => {
                            solutionCard.classList.add('stabilized');
                            gsap.from(solutionCard, { scale: 0.95, filter: 'blur(10px)', duration: 1.5, ease: "power4.out" });
                        }, 500);
                    }
                }
            });
        });
    };

    const initStatsBoot = () => {
        const statsSection = document.getElementById('stats-container');
        if (!statsSection || !window.anime || !window.gsap) return;

        ScrollTrigger.create({
            trigger: statsSection,
            start: "top 80%",
            onEnter: () => {
                anime({ targets: '#circle-1', strokeDasharray: ['0, 100', '99, 100'], easing: 'easeInOutQuad', duration: 2000 });
                anime({ targets: '#circle-2', strokeDasharray: ['0, 100', '85, 100'], easing: 'easeInOutQuad', duration: 2000 });

                const statVals = [{ id: '#stat-val-1', val: '< 1%' }, { id: '#stat-val-2', val: '85%' }];
                statVals.forEach(item => {
                    const el = document.querySelector(item.id);
                    if (!el) return;
                    el.style.opacity = '1'; el.textContent = '';
                    let i = 0;
                    const type = () => { if (i < item.val.length) { el.textContent += item.val.charAt(i); i++; setTimeout(type, 100); } };
                    type();
                });

                gsap.to('.stat-sub.terminal-text', { opacity: 1, stagger: 0.5, duration: 0.4, delay: 1.5, ease: "power2.out" });
            }
        });
    };

    const initFooterShutdown = () => {
        const footer = document.querySelector('.footer');
        if (!footer || !window.gsap) return;

        ScrollTrigger.create({
            trigger: footer,
            start: "top 90%",
            onEnter: () => {
                const linkGroups = document.querySelectorAll('.link-group, .footer-brand');
                const shutdownMsg = document.getElementById('shutdown-msg');
                gsap.from(linkGroups, { opacity: 0, x: -20, stagger: 0.2, duration: 0.8, ease: "power2.out" });
                gsap.to(shutdownMsg, { opacity: 1, duration: 0.5, delay: 1.5 });
            }
        });
    };

    const initInternalAnimations = () => {
        const path = window.location.pathname;
        if (path.includes('research.html')) {
            document.querySelectorAll('.research-card').forEach(card => {
                card.classList.add('classified-card');
                const badge = document.createElement('div');
                badge.className = 'classified-badge';
                badge.textContent = 'CLASSIFIED';
                card.appendChild(badge);
                ScrollTrigger.create({
                    trigger: card,
                    start: "top 85%",
                    onEnter: () => {
                        card.classList.add('viewed');
                        gsap.from(badge, { scale: 2, opacity: 0, duration: 0.5, ease: "bounce.out" });
                    }
                });
            });
        }

        if (path.includes('careers.html')) {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const text = heroTitle.textContent;
                heroTitle.textContent = '';
                let i = 0;
                const type = () => { if (i < text.length) { heroTitle.textContent += text.charAt(i); i++; setTimeout(type, 50); } };
                type();
            }
            gsap.to('.job-card', { opacity: 1, scale: 1, y: 0, stagger: 0.2, scrollTrigger: { trigger: '.jobs-grid', start: "top 80%" } });
        }

        if ((path.includes('technology.html') || path.includes('products.html')) && window.THREE) {
            const container = document.getElementById('architecture-canvas');
            if (container) {
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(window.innerWidth, window.innerHeight);
                container.appendChild(renderer.domElement);
                camera.position.z = 8;
                const layers = [];
                for (let i = 0; i < 3; i++) {
                    const geo = new THREE.BoxGeometry(4, 0.1, 3);
                    const mat = new THREE.MeshBasicMaterial({ color: 0xff3333, wireframe: true, transparent: true, opacity: 0.2 + (i * 0.2) });
                    const layer = new THREE.Mesh(geo, mat); layer.position.y = (i - 1) * 2; layer.rotation.x = Math.PI / 6;
                    scene.add(layer); layers.push(layer);
                }
                const animate = () => {
                    requestAnimationFrame(animate);
                    layers.forEach((l, i) => l.rotation.y += 0.005 * (i + 1));
                    renderer.render(scene, camera);
                };
                animate();
                ScrollTrigger.create({
                    trigger: ".tech-architecture", start: "top top", end: "bottom bottom", scrub: true,
                    onUpdate: (self) => {
                        camera.position.z = 8 - (self.progress * 4); camera.position.y = (self.progress * 2);
                        layers.forEach((l, i) => l.position.y = ((i - 1) * 2) + (self.progress * i));
                    }
                });
            }
        }
    };



    const initNavbarHUD = () => {
        if (!window.gsap) return;
        const navbar = document.querySelector('.navbar');
        const navItems = document.querySelectorAll('.nav-links a');

        // Text reveal is now handled by initPageTextReveal

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                if (!navbar.classList.contains('scanned')) navbar.classList.add('scanned');
                gsap.to(navbar, { backgroundColor: 'rgba(0, 0, 0, 0.95)', padding: '1rem 0', duration: 0.3 });
            } else {
                gsap.to(navbar, { backgroundColor: 'rgba(10, 10, 10, 0.85)', padding: '1.5rem 0', duration: 0.3 });
            }
        });
    };

    const initMobileMenu = () => {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');
        if (!mobileToggle || !navLinks || !window.gsap) return;

        mobileToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            if (isActive) {
                navLinks.classList.add('show');
                const mobLinks = navLinks.querySelectorAll('a');
                const spans = mobileToggle.querySelectorAll('span');
                gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
                gsap.to(spans[1], { opacity: 0, duration: 0.3 });
                gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
                gsap.fromTo(mobLinks, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" });
            } else {
                const spans = mobileToggle.querySelectorAll('span');
                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { opacity: 1, duration: 0.3 });
                gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(navLinks, { opacity: 0, duration: 0.3, onComplete: () => { navLinks.classList.remove('show'); navLinks.style.opacity = '1'; } });
            }
        });
    };

    const initContentFadeIn = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.feature-card, .hero-content, .hero-visual').forEach(el => { el.classList.add('fade-in'); observer.observe(el); });
    };

    const initPageTextReveal = () => {
        if (!window.gsap) return;

        // Select all major text elements and components NOT inside the footer
        const contentText = document.querySelectorAll('main h1, main h2, main h3, main h4, main p, main ul, section h1, section h2, section h3, section h4, section p, section ul, .feature-card, .problem-card, .member-card, .glitch-card, .theme-icon, .tech-icon, .large-icon');

        contentText.forEach(block => {
            gsap.fromTo(block,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: block,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    };

    // Initialize Lucide Icons
    const initLucideIcons = () => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    // --- EXECUTION ---
    safeInit('LucideIcons', initLucideIcons);
    safeInit('GlobalBackground', initGlobalBackground);
    safeInit('ScrollReveals', initScrollReveals);
    safeInit('StatsBoot', initStatsBoot);
    safeInit('FooterShutdown', initFooterShutdown);

    safeInit('NavbarHUD', initNavbarHUD);
    safeInit('MobileMenu', initMobileMenu);
    safeInit('ContentFadeIn', initContentFadeIn);
    safeInit('PageTextReveal', initPageTextReveal);
});
