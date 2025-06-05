'use client'
import {createContext, useContext, useState} from "react";
import {PathContext} from "@/components/Path";
import {Input, Modal} from "antd";

export const ModalContext = createContext<ModalData>({
    newFolder: () => ({}),
    newFile: () => ({}),
    deleteFolder: () => ({}),
    deleteFile: () => ({}),
});

export function ModalProvider({children}: any) {
    const [modalNewFolderOpen, setModalNewFolderOpen] = useState(false);
    const [modalNewFileOpen, setModalNewFileOpen] = useState(false);
    const { down } = useContext(PathContext);
    const [title, setTitle] = useState<string>('');
    function okNewFolder() {
        down({ title })
    }
    function okNewFile() {
        down({ title })
    }

    function handleCancel() {
        setModalNewFolderOpen(false);
        setModalNewFileOpen(false);
    }

    function newFolder() {
        setModalNewFolderOpen(true);
    }

    function newFile() {
        setModalNewFolderOpen(true);
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
                <Input />
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
