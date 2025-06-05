'use client'
import {createContext, useState} from "react";

export const PathContext = createContext<TreeData>({
    path: [],
    up: () => ({}),
    down: () => ({}),
});

export function PathProvider({children}: any) {
    const [path, setPath] = useState<PathData[]>([{ title: 'Raiz', level: 0, refId: null }]);
    function up() {
        const curLevel = path[path.length - 1].level;
        if (curLevel && curLevel > 0) {
            setPath(prev => {
                prev.pop();
                return prev;
            });
        }
    }
    function down(folder: PathData) {
        const level = path[path.length - 1].level || 0;
        setPath(prev => {
            prev.push({ ...folder, level: level + 1 });
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
    level?: number;
}

export type TreeData = {
    path: PathData[];
    up: () => void;
    down: (folder: PathData) => void;
}
