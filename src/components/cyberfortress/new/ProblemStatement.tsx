"use client";

import React, { useEffect } from 'react';
import styles from '../CyberFortress.module.css';
import { Radar, ShieldCheck, EyeOff } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ProblemStatement() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: `.${styles.problemStatement}`,
            start: "top 80%",
            onEnter: () => {
                gsap.from(`.${styles.problemCard}`, {
                    y: 50,
                    rotationX: 15,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                });
            }
        });
    }, []);

    return (
        <section className={styles.problemStatement} id="problem-section">
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2>Unified Platform for Autonomous Security</h2>
                    <p>CyberFortress combines autonomous detection, policy-driven response, adversarial deception, and
                        immutable audit in a single platform. Built for enterprise deployments with real SLAs, proper
                        security, and actual support.</p>
                </div>
                <div className={styles.problemGrid}>
                    <div className={styles.problemCard} id="card-1">
                        <div className={styles.cardIcon}>
                            <Radar size={48} />
                        </div>
                        <h3>Autonomous Detection</h3>
                        <p>Traditional tools alert on signatures or rules. CyberFortress correlates behaviors across
                            domains to identify attack chains before they complete.</p>
                    </div>
                    <div className={styles.problemCard} id="card-2">
                        <div className={styles.cardIcon}>
                            <ShieldCheck size={48} />
                        </div>
                        <h3>Policy-Driven Response</h3>
                        <p>Automation without guardrails is dangerous. CyberFortress executes predefined response
                            playbooks with rollback capabilities and human override.</p>
                    </div>
                    <div className={styles.problemCard} id="card-3">
                        <div className={styles.cardIcon}>
                            <EyeOff size={48} />
                        </div>
                        <h3>Adversarial Deception</h3>
                        <p>Passive defense is insufficient. CyberFortress actively deceives attackers with adaptive
                            honeypots that waste adversary time and gather intelligence.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
