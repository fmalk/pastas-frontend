'use client'
import React, {useState} from "react";
import {Flex} from 'antd';
import {CardData, GenericCard} from "@/components/GenericCard";

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
    const [cards] = useState<CardData[]>(seedCards);
    return <Flex gap="middle" align="start" vertical>
        <Flex style={boxStyle} justify={'flex-start'} align={'flex-start'}>
            {cards.map(c => <GenericCard key={c.id} title={c.title} meta={c.meta}/>)}
        </Flex>
    </Flex>
}
