'use client'
import {createContext, useContext, useState} from "react";
import {Input, InputNumber, Modal, Upload, UploadProps, Image} from "antd";
import {MetaContext} from "@/components/Metadata";
import {CardData, CardType} from "@/components/GenericCard";
import {InboxOutlined} from "@ant-design/icons";
import {RcFile} from "antd/lib/upload";
import {upload} from "@vercel/blob/client";
import {formatFileSize, formatTimestamp} from "@/components/Utils";

const {Dragger} = Upload;

export const ModalContext = createContext<ModalData>({
    newFolder: () => ({}),
    newFile: () => ({}),
    showFile: (card: CardData) => ({}),
});

const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
};

export function ModalProvider({children}: any) {
    const [modalNewFolderOpen, setModalNewFolderOpen] = useState(false);
    const [modalNewFileOpen, setModalNewFileOpen] = useState(false);
    const [modalFileOpen, setModalFileOpen] = useState(false);
    const {addItem, changeOrder, removeItem} = useContext(MetaContext);
    const [error, setError] = useState('');
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
            //console.log(info);
        }
        if (info.file.status === 'done') {

        } else if (info.file.status === 'error') {
            setError('erro no upload');
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
        setError('');
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

    function deleteFile(card: CardData | null) {
        if (card) removeItem(card);
        handleCancel();
    }

    function showFile(card: CardData) {
        setFileCard(card);
        setModalFileOpen(true)
    }

    // deve ser customizado para uso com Vercel Blob
    async function handleUpload(options: any) {
        try {
            const newBlob = await upload(options.file?.name || 'teste', options.file, {
                access: 'public',
                handleUploadUrl: '/api/upload',
            });
            const response = addItem({
                id: options.file.uid,
                parentId: null,
                title: options.file.name,
                size: options.file.size || 1024,
                position: 0,
                type: CardType.FILE,
                timestamp: options.file.lastModified,
                url: newBlob.url,
                downloadUrl: newBlob.downloadUrl,
            });
            if (!response) {
                setError('nome já existente na pasta');
            } else {
                handleCancel();
            }
            return true;
        } catch (err) {
            console.error(err);
            setError('erro no upload do arquivo');
            return false;
        }
    }

    return (
        <ModalContext.Provider value={{newFolder, newFile, showFile}}>
            {children}
            <Modal
                centered
                title="Criar Nova Pasta"
                open={modalNewFolderOpen}
                onOk={okNewFolder}
                onCancel={handleCancel}
            >
                <p>Nome da pasta:</p>
                <Input onChange={e => setTitle(e.target.value)} value={title}/>
                <span>{error}</span>
            </Modal>
            <Modal
                centered
                title="Arquivo"
                open={modalFileOpen}
                onOk={handleCancel}
                onCancel={() => deleteFile(fileCard)}
                cancelText={'Apagar'}
            >
                <Image width={200} src={fileCard?.url} />
                <p>
                    <span>Nome: <strong>{fileCard?.title}</strong></span>&nbsp;
                    <span>{fileCard?.downloadUrl ? (<a href={fileCard?.downloadUrl} target='_blank'><u>Download</u></a>) : ''}</span>
                </p>
                <p>Tamanho: {formatFileSize(fileCard?.size)}</p>
                <p>Data/Hora: {formatTimestamp(fileCard?.timestamp || 0)}</p>
                <div>Ordem: <InputNumber min={0} defaultValue={fileCard?.position}
                                         onChange={(value) => value || value === 0 ? changeOrder(value, fileCard) : false} changeOnWheel/></div>
            </Modal>
            <Modal
                centered
                title="Novo Arquivo"
                open={modalNewFileOpen}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                <Dragger {...props} onChange={okNewFile} beforeUpload={beforeUpload} customRequest={handleUpload}>
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
    showFile: (card: CardData) => void;
}
