'use client'
import {createContext, useContext, useState} from "react";
import {CardData, CardType} from "@/components/GenericCard";
import {nanoid} from 'nanoid';
import {PathContext} from "@/components/Path";

export const MetaContext = createContext<MetaData>({
    items: [],
    parent: null,
    viewItems: () => [],
    addItem: () => ({id: '', parentId: null, title: '', position: 0, type: CardType.SYSTEM}),
    removeItem: () => ({id: '', parentId: null, title: '', position: 0, type: CardType.SYSTEM}),
    changeFolder: () => ({id: '', parentId: null, title: '', position: 0, type: CardType.FOLDER}),
    changeOrder: () => ({}),
    search: () => ({}),
});

const upCard: CardData = {
    id: 'up', parentId: null, title: 'Acima', position: Number.NEGATIVE_INFINITY, type: CardType.SYSTEM
}

export function MetaProvider({children}: any) {
    const {up, down} = useContext(PathContext)
    const [items, setItems] = useState<CardData[]>([]);
    const [parent, setParent] = useState<string | null>(null);

    function viewItems() {
        let filtered: CardData[];
        if (parent === null) {
            filtered = items.filter(i => i.parentId === null);
        } else {
            filtered = items.filter(i => i.parentId === parent);
            filtered.unshift(upCard);
        }
        return filtered.sort((a, b) => {
            if (a.type === CardType.SYSTEM) return -1;
            if (b.type === CardType.SYSTEM) return 1;
            if (a.type === CardType.FOLDER && b.type === CardType.FILE) return -1;
            if (b.type === CardType.FOLDER && a.type === CardType.FILE) return 1;
            if (a.type === CardType.FOLDER && b.type === CardType.FOLDER) return a.title.localeCompare(b.title);
            return a.position - b.position;
        });
    }

    function recalculateFolderSizes(currFolderId: string | null, incSize: number) {
        if (incSize === 0 || !currFolderId || currFolderId === '') return;
        const currFolder = items.find(i => i.id === currFolderId);
        if (!currFolder) return;
        currFolder.size = (currFolder.size || 0) + incSize;
        recalculateFolderSizes(currFolder.parentId, incSize);
    }

    function addItem(item: CardData) {
        const curItems = viewItems();
        // apenas nome único
        const sameName = items.find(i => i.title === item.title);
        if (sameName) return null;

        const nextPosition = curItems.reduce((p, c) => Math.max(p, c.position), 0) + 1;
        item.parentId = parent;
        item.id = nanoid(10);
        item.position = nextPosition;

        // novo tamanho de pasta
        if (item.type === CardType.FILE) {
            recalculateFolderSizes(item.parentId, item.size || 0);
        }

        // atualiza metadados
        setItems(prev => [...prev, item]);

        return item;
    }

    function changeFolder(selected: CardData) {
        if (selected.type === CardType.SYSTEM) {
            up();
            const target = items.find(i => i.id === parent)!;
            setParent(target.parentId);
        } else if (selected.type === CardType.FOLDER) {
            down({
                refId: selected.id, title: selected.title
            });
            setParent(selected.id);
        }
    }

    function search(input: string) {
        const obj = items.find(i => i.title.toLowerCase().includes(input.toLowerCase()) && i.type !== CardType.SYSTEM);
        if (!obj) return;
        if (obj.type === CardType.FOLDER) {
            changeFolder(obj);
        } else {
            // nesse caso, abrimos a pasta-mãe
            const folder = items.find(i => i.id === obj.parentId);
            if (folder) changeFolder(folder);
        }
    }

    function changeOrder(newPosition: number, selected: CardData | null) {
        if (!selected) return;
        const curItems = viewItems();
        curItems.forEach((item) => {
            if (item.position >= newPosition && item.id !== selected.id) {
                item.position++;
            }
        })
        selected.position = newPosition;
        setItems(prev => [...prev]); // necessário update
    }

    function removeItem(item: CardData) {
        const after = items.filter(i => i.id !== item.id);
        setItems(after);
    }

    return (
        <MetaContext.Provider value={{items, parent, viewItems, changeFolder, addItem, changeOrder, removeItem, search}}>
            {children}
        </MetaContext.Provider>
    );
}

export type MetaData = {
    items: CardData[];
    parent: string | null;
    viewItems: () => CardData[];
    addItem: (item: CardData) => CardData | null;
    changeFolder: (selected: CardData) => void;
    removeItem: (selected: CardData) => void;
    changeOrder: (newPosition: number, selected: CardData | null) => void;
    search: (input: string) => void;
}
