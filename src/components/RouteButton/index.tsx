import { useState, useCallback, useEffect } from 'react';

import { useRouter } from '@/libs/i18nNavigation';

interface RouteButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    preloadImmediately?: boolean;
}

const RouteButton = ({
    href,
    children,
    className = '',
    preloadImmediately = false,
}: RouteButtonProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isPreloaded, setIsPreloaded] = useState(false);

    const preloadRoute = useCallback(async () => {
        if (!isPreloaded) {
            await router.prefetch(href);
            setIsPreloaded(true);
        }
    }, [router, href, isPreloaded]);

    useEffect(() => {
        if (preloadImmediately) {
            preloadRoute();
        }
    }, [preloadImmediately, preloadRoute]);

    const handleClick = useCallback(async () => {
        if (!isLoading) {
            setIsLoading(true);
            try {

                if (!isPreloaded) {
                    await preloadRoute();
                }
                await router.push(href);
            } finally {
                setIsLoading(false);
            }
        }
    }, [router, href, isLoading, isPreloaded, preloadRoute]);

    const handleTouchStart = useCallback(() => {
        if (!isPreloaded) {
            preloadRoute();
        }
    }, [isPreloaded, preloadRoute]);

    return (
        <button
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            disabled={isLoading}
            className={`relative ${className}`}
        >
            {isLoading ? (
                <>
                    <span className="opacity-0">{children}</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    </div>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default RouteButton;