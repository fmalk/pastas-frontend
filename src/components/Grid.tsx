'use client'
import React, {useContext, useEffect, useState} from "react";
import {Breadcrumb, Button, Divider, Flex, Input} from 'antd';
import {CardData, CardType, GenericCard} from "@/components/GenericCard";
import {PathContext} from "@/components/Path";
import {ModalContext} from "@/components/Modal";
import {MetaContext} from "@/components/Metadata";
import {FileAddOutlined, FolderAddOutlined} from "@ant-design/icons";
const { Search } = Input;

const boxStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: '1em',
    minHeight: '500px'
};

export default function Grid() {
    const {path} = useContext(PathContext)
    const {newFolder, newFile, showFile } = useContext(ModalContext);
    const {items, parent, viewItems, changeFolder, search} = useContext(MetaContext);
    const [show, setShow] = useState<CardData[]>([]);

    function handleClick(card: CardData) {
        if (card.type === CardType.FILE) {
            showFile(card);
        } else {
            changeFolder(card);
        }
    }

    useEffect(() => {
        setShow(viewItems());
    }, [items, parent, path]);

    return <>
        <Breadcrumb items={path}/>
        <Divider/>
        <Flex gap="middle" align="start" vertical style={boxStyle}>
            <Flex>
                <Button onClick={newFolder}><FolderAddOutlined/>Nova Pasta</Button>&nbsp;
                <Button onClick={newFile}><FileAddOutlined/>Novo Arquivo</Button>&nbsp;
                <Search placeholder="Busque por nome" onSearch={search} enterButton />
            </Flex>
            <Flex justify={'flex-start'} align={'flex-start'}>
                {show.map(c => <GenericCard key={c.id} card={c} handleClick={handleClick}/>)}
            </Flex>
        </Flex>
    </>
}
