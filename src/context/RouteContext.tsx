import { createContext, useContext, useState, useCallback } from 'react';

import { useRouter } from '@/libs/i18nNavigation';

interface RouteContextType {
    preloadedRoutes: Set<string>;
    markRoutePreloaded: (route: string) => void;
    preloadRoute: (route: string) => Promise<void>;
    preloadRoutes: (routes: string[]) => Promise<void>;
    isRoutePreloaded: (route: string) => boolean;
}

const RouteContext = createContext<RouteContextType>({
    preloadedRoutes: new Set(),
    markRoutePreloaded: () => { },
    preloadRoute: async () => { },
    preloadRoutes: async () => { },
    isRoutePreloaded: () => false,
});

export const RouteProvider = ({ children }: { children: React.ReactNode }) => {
    const [preloadedRoutes, setPreloadedRoutes] = useState<Set<string>>(new Set());
    const router = useRouter();

    const markRoutePreloaded = useCallback((route: string) => {
        setPreloadedRoutes(prev => new Set(prev).add(route));
    }, []);

    const preloadRoute = useCallback(async (route: string) => {
        if (!preloadedRoutes.has(route)) {
            await router.prefetch(route);
            markRoutePreloaded(route);
        }
    }, [router, preloadedRoutes, markRoutePreloaded]);

    const preloadRoutes = useCallback(async (routes: string[]) => {
        routes.forEach(async route => {
            if (!preloadedRoutes.has(route)) {
                await router.prefetch(route);
                markRoutePreloaded(route);
            }
        })

    }, [router, preloadedRoutes, markRoutePreloaded]);

    const isRoutePreloaded = useCallback((route: string) => {
        return preloadedRoutes.has(route);
    }, [preloadedRoutes]);

    return (
        <RouteContext.Provider
            value={{
                preloadedRoutes,
                markRoutePreloaded,
                preloadRoute,
                preloadRoutes,
                isRoutePreloaded
            }}
        >
            {children}
        </RouteContext.Provider>
    );
};

export const useRoutePreloader = () => {
    const context = useContext(RouteContext);
    if (!context) {
        throw new Error('useRoutePreloader must be used within a RouteProvider');
    }
    return context;
};
