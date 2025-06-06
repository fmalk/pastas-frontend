'use client'
import {createContext, useState} from "react";

export const PathContext = createContext<TreeData>({
    path: [],
    up: () => ({}),
    down: () => ({}),
});

export function PathProvider({children}: any) {
    const [path, setPath] = useState<PathData[]>([{ title: 'Raiz', refId: null }]);
    function up() {
        const curLevel = path.length - 1;
        if (curLevel > 0) {
            setPath(prev => {
                return prev.slice(0, -1);
            });
        }
    }
    function down(folder: PathData) {
        setPath(prev => {
            prev.push(folder);
            return prev;
        });
    }

    return (
        <PathContext.Provider value={{ path, up, down}}>
            {children}
        </PathContext.Provider>
    );
}

export type PathData = {
    title: string;
    refId: string | null;
}

export type TreeData = {
    path: PathData[];
    up: () => void;
    down: (folder: PathData) => void;
}
