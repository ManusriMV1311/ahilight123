

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col pt-24">
            {/* Integrated Breadcrumb Navigation */}

            {/* Page Content */}
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}
