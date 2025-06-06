'use client'
import {createContext, useContext, useState} from "react";
import {Input, Modal, Upload, UploadProps} from "antd";
import {MetaContext} from "@/components/Metadata";
import {CardData, CardType} from "@/components/GenericCard";
import {InboxOutlined} from "@ant-design/icons";
import {RcFile} from "antd/lib/upload";
const { Dragger } = Upload;

export const ModalContext = createContext<ModalData>({
    newFolder: () => ({}),
    newFile: () => ({}),
    deleteFolder: () => ({}),
    deleteFile: () => ({}),
    showFile: (card: CardData) => ({}),
});

const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
};

export function ModalProvider({children}: any) {
    const [modalNewFolderOpen, setModalNewFolderOpen] = useState(false);
    const [modalNewFileOpen, setModalNewFileOpen] = useState(false);
    const [modalFileOpen, setModalFileOpen] = useState(false);
    const { addItem } = useContext(MetaContext);
    const [ error, setError ] = useState('');
    const [title, setTitle] = useState<string>('');
    const [fileCard, setFileCard] = useState<CardData | null>(null);
    function okNewFolder() {
        const response = addItem({
            id: '',
            parentId: null,
            title,
            size: 0,
            position: 0,
            type: CardType.FOLDER
        });
        if (!response) {
            setError('nome já existente na pasta');
        } else {
            handleCancel();
        }
    }
    function okNewFile(info: any) {

        if (info.file.status !== 'uploading') {
            console.log(info.file);
        }
        if (info.file.status === 'done' || info.file.status === 'error') {
           const response = addItem({
                id: '',
                parentId: null,
                title: info ? info.file.name : '',
                size: info ? info.file.size : 1024,
                position: 0,
                type: CardType.FILE
            });
            if (!response) {
                setError('nome já existente na pasta');
            } else {
                handleCancel();
            }
        }
    }

    function beforeUpload(file: RcFile) {
        const accepted = ['image/png', 'image/jpeg', 'image/jpeg', 'image/gif', 'image/svg', 'image/webp']
        const isPNG = accepted.includes(file.type);
        if (!isPNG) {
            setError(`${file.name} não é um arquivo de imagem`);
        }
        return isPNG || Upload.LIST_IGNORE;
    }

    function handleCancel() {
        setTitle('');
        setModalNewFolderOpen(false);
        setModalNewFileOpen(false);
        setModalFileOpen(false);
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

    function showFile(card: CardData) {
        setFileCard(card);
        setModalFileOpen(true)
    }

    return (
        <ModalContext.Provider value={{ newFolder, newFile, deleteFolder, deleteFile, showFile }}>
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
                title="Arquivo"
                open={modalFileOpen}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                <p>Nome: <strong>{fileCard?.title}</strong></p>
                <p>Tamanho: {fileCard?.size}</p>
                <p>Ordem: {fileCard?.position}</p>
            </Modal>
            <Modal
                centered
                title="Novo Arquivo"
                open={modalNewFileOpen}
                onOk={okNewFile}
                onCancel={handleCancel}
            >
                <Dragger {...props} onChange={okNewFile} beforeUpload={beforeUpload}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Clique ou arraste para fazer upload</p>
                    <p className="ant-upload-hint">
                        Para evitar erros e abusos, apenas imagens são aceitas.
                    </p>
                </Dragger>
                <span>{error}</span>
            </Modal>
        </ModalContext.Provider>
    );
}

export type ModalData = {
    newFolder: () => void;
    newFile: () => void;
    deleteFolder: () => void;
    deleteFile: () => void;
    showFile: (card: CardData) => void;
}
