'use client'
import React, {useContext, useEffect, useState} from "react";
import {Breadcrumb, Button, Divider, Flex} from 'antd';
import {CardData, CardType, GenericCard} from "@/components/GenericCard";
import {PathContext} from "@/components/Path";
import {ModalContext} from "@/components/Modal";
import {MetaContext} from "@/components/Metadata";
import {FileAddOutlined, FolderAddOutlined} from "@ant-design/icons";

const boxStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: '1em',
    minHeight: '500px'
};

export default function Grid() {
    const {path} = useContext(PathContext)
    const {newFolder, newFile} = useContext(ModalContext);
    const {items, parent, viewItems} = useContext(MetaContext);
    const [show, setShow] = useState<CardData[]>([]);

    function handleClick(card: CardData) {
        console.log(card);
    }

    useEffect(() => {
        setShow(viewItems());
    }, [items, parent]);

    return <>
        <Breadcrumb items={path}/>
        <Divider/>
        <Flex gap="middle" align="start" vertical style={boxStyle}>
            <Flex>
                <Button onClick={newFolder}><FolderAddOutlined/>Nova Pasta</Button>&nbsp;
                <Button onClick={newFile}><FileAddOutlined/>Novo Arquivo</Button>
            </Flex>
            <Flex justify={'flex-start'} align={'flex-start'}>
                {
                    show.length > 1 ? show.map(c => <GenericCard key={c.id} card={c} handleClick={handleClick} />)
                        : show.length === 1 && show[0].type === CardType.SYSTEM ? <>
                                <GenericCard key={show[0].id} card={show[0]} handleClick={handleClick} />
                                <span>Pasta vazia</span>
                            </>
                            : show.length === 1 ? <GenericCard key={show[0].id} card={show[0]} handleClick={handleClick} />
                                : <span>Pasta vazia</span>
                }
            </Flex>
        </Flex>
    </>
}
