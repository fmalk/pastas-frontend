'use client'
import {createContext, useState} from "react";
import {CardData, CardType} from "@/components/GenericCard";

export const MetaContext = createContext<MetaData>({
    items: [],
    viewLevel: () => 0,
    viewItems: () => [],
    addItem: () => ({id:'', parentId: null, title: '', position: 0, type: CardType.SYSTEM }),
});

const seedCards: CardData[] = [
    //{id: 'asdfas', parentId: null, title: 'Primeiro', size: 1024, position: 0, type: CardType.FILE}
]
const up: CardData = {
    id: 'up', parentId: null, title: 'Acima', position: Number.NEGATIVE_INFINITY, type: CardType.SYSTEM
}

export function MetaProvider({children}: any) {
    const [items, setItems] = useState<CardData[]>(seedCards);
    const [level, setLevel] = useState<number>(0);
    const [parent, setParent] = useState<string | null>(null);

    function viewLevel() {
        return level >= 0 ? level : 0;
    }

    function viewItems() {
        let filtered: CardData[] = [];
        if (level === 0) {
            filtered = items.filter(i => i.parentId === null);
        } else {
            filtered = items.filter(i => i.parentId === parent);
            filtered.unshift(up);
        }
        return filtered.sort((a, b) => {
            if (a.type === CardType.SYSTEM) return -1;
            if (b.type === CardType.SYSTEM) return 1;
            if (a.type === CardType.FOLDER && b.type === CardType.FILE) return -1;
            if (b.type === CardType.FOLDER && a.type === CardType.FILE) return 1;
            if (a.type === CardType.FOLDER && b.type === CardType.FOLDER) return a.title.localeCompare(b.title);
            return a.position-b.position;
        });
    }

    function addItem(item: CardData) {
        const curItems = viewItems();
        const nextPosition = curItems.reduce((p,c) => Math.max(p, c.position), 0) + 1;
        item.parentId = parent;
        item.id = Math.random().toString();
        item.position = nextPosition;
        setItems(prev => [...prev, item]);
        return item;
    }

    return (
        <MetaContext.Provider value={{ items, viewLevel, viewItems, addItem }}>
            {children}
        </MetaContext.Provider>
    );
}

export type MetaData = {
    items: CardData[];
    viewLevel: () => number;
    viewItems: () => CardData[];
    addItem: (item: CardData) => CardData;
}
