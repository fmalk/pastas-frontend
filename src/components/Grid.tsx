'use client'
import React, {useContext, useEffect, useState} from "react";
import {Breadcrumb, Button, Divider, Flex} from 'antd';
import {CardData, GenericCard} from "@/components/GenericCard";
import {PathContext} from "@/components/Path";
import {ModalContext} from "@/components/Modal";

const boxStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: '1em',
    minHeight: '500px'
};

const seedCards: CardData[] = [
    {id: 'asdfas', title: 'Primeiro', meta: 'Arquivo 3kb', position: 0}
]

export default function Grid() {
    const {path} = useContext(PathContext)
    const { newFolder } = useContext(ModalContext);
    const [cards] = useState<CardData[]>(seedCards);

    return <>
        <Breadcrumb items={path}/>
        <Divider/>
        <Flex gap="middle" align="start" vertical style={boxStyle} >
            <Flex>
                <Button onClick={newFolder}>Nova Pasta</Button>&nbsp;
                <Button>Novo Arquivo</Button>
            </Flex>
            <Flex justify={'flex-start'} align={'flex-start'}>
                {cards.map(c => <GenericCard key={c.id} title={c.title} meta={c.meta}/>)}
            </Flex>
        </Flex>
    </>
}
