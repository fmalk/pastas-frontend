'use client'
import {createContext, useContext, useState} from "react";
import {PathContext} from "@/components/Path";
import {Input, Modal} from "antd";
import {MetaContext} from "@/components/Metadata";
import {CardType} from "@/components/GenericCard";

export const ModalContext = createContext<ModalData>({
    newFolder: () => ({}),
    newFile: () => ({}),
    deleteFolder: () => ({}),
    deleteFile: () => ({}),
});

export function ModalProvider({children}: any) {
    const [modalNewFolderOpen, setModalNewFolderOpen] = useState(false);
    const [modalNewFileOpen, setModalNewFileOpen] = useState(false);
    const { addItem } = useContext(MetaContext);
    const [title, setTitle] = useState<string>('');
    function okNewFolder() {
        addItem({
            id: '',
            parentId: null,
            title,
            size: 0,
            position: 0,
            type: CardType.FOLDER
        });
        handleCancel();
    }
    function okNewFile() {
        const response = addItem({
            id: '',
            parentId: null,
            title,
            size: Math.round(1024*8*Math.random()),
            position: 0,
            type: CardType.FILE
        });
        if (!response) {
            setTitle('nome já existente na pasta');
        } else {
            handleCancel();
        }
    }

    function handleCancel() {
        setTitle('');
        setModalNewFolderOpen(false);
        setModalNewFileOpen(false);
    }

    function newFolder() {
        setModalNewFolderOpen(true);
    }

    function newFile() {
        setModalNewFileOpen(true);
    }

    function deleteFolder() {
        setModalNewFolderOpen(true);
    }

    function deleteFile() {
        setModalNewFolderOpen(true);
    }

    return (
        <ModalContext.Provider value={{ newFolder, newFile, deleteFolder, deleteFile }}>
            {children}
            <Modal
                centered
                title="Criar Nova Pasta"
                open={modalNewFolderOpen}
                onOk={okNewFolder}
                onCancel={handleCancel}
            >
                <p>Nome da pasta:</p>
                <Input onChange={e => setTitle(e.target.value)} value={title} />
            </Modal>
            <Modal
                centered
                title="Criar Novo Arquivo"
                open={modalNewFileOpen}
                onOk={okNewFile}
                onCancel={handleCancel}
            >
                <p>Nome do arquivo:</p>
                <Input onChange={e => setTitle(e.target.value)} value={title} />
            </Modal>
        </ModalContext.Provider>
    );
}

export type ModalData = {
    newFolder: () => void;
    newFile: () => void;
    deleteFolder: () => void;
    deleteFile: () => void;
}
