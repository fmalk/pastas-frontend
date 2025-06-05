'use client'
import {createContext, useContext} from "react";

export const PathContext = createContext<TreeData>({
    path: [],
    up: () => ({}),
    down: () => ({}),
});

export function PathProvider({children}: any) {
    const { path } = useContext(PathContext);
    function up() {
        const curLevel = path[path.length - 1].level;
        if (curLevel && curLevel > 0) {
            path.pop();
        }
    }
    function down(folder: PathData) {
        const level = path[path.length - 1].level || 0;
        path.push({ ...folder, level: level + 1 });
    }

    return (
        <PathContext.Provider value={{ path: [{ title: 'Raiz', level: 0, refId: null }], up, down}}>
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
