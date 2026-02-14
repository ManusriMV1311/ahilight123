import { CyberHero } from "@/components/cyberfortress/new/CyberHero";
import { NewsTicker } from "@/components/cyberfortress/new/NewsTicker";
import { ProblemStatement } from "@/components/cyberfortress/new/ProblemStatement";
import { ProductHighlight } from "@/components/cyberfortress/new/ProductHighlight";
import { TrustSection } from "@/components/cyberfortress/new/TrustSection";
import styles from "@/components/cyberfortress/CyberFortress.module.css";

export default function CyberFortressPage() {
    return (
        <div className={styles.pageContainer}>
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <CyberHero />
                <NewsTicker />
                <ProblemStatement />
                <ProductHighlight />
                <TrustSection />
            </div>
        </div>
    );
}

