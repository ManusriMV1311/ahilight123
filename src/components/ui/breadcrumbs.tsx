"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
    className?: string;
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
    const pathname = usePathname();

    // Split pathname into segments, filter out empty strings
    const segments = pathname.split("/").filter((segment) => segment !== "");

    // If we are on the home page, don't render anything (though this component likely won't be used there)
    if (segments.length === 0) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className={cn(
                "flex items-center space-x-2 text-sm text-slate-400 py-4",
                className
            )}
        >
            <ol className="flex items-center space-x-2">
                {/* Home Link */}
                <li className="flex items-center">
                    <Link
                        href="/"
                        className="flex items-center hover:text-white transition-colors"
                        title="Home"
                    >
                        <Home className="h-4 w-4" />
                    </Link>
                </li>

                {/* Dynamic Segments */}
                {segments.map((segment, index) => {
                    // Build the path up to this segment
                    const href = `/${segments.slice(0, index + 1).join("/")}`;

                    // Check if this is the last segment
                    const isLast = index === segments.length - 1;

                    // Format segment title: capitalization and removing hyphens
                    const title = segment
                        .replace(/-/g, " ")
                        .split(" ")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ");

                    return (
                        <li key={href} className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-slate-600 mx-1" />
                            {isLast ? (
                                <span
                                    className="font-medium text-electric-blue pointer-events-none"
                                    aria-current="page"
                                >
                                    {title}
                                </span>
                            ) : (
                                <Link
                                    href={href}
                                    className="hover:text-white transition-colors"
                                >
                                    {title}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
