import {Card} from 'antd';
import {FolderOutlined, ArrowUpOutlined, FileOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";

export function GenericCard({card, handleClick}: { card: CardData, handleClick: any }) {
    const [icon, setIcon] = useState(<FolderOutlined />)
    function color(cardType: CardType) {
        switch (cardType) {
            case CardType.FILE:
                return 'lightgrey';
            case CardType.SYSTEM:
                return 'lightblue';
            case CardType.FOLDER:
                return 'lightyellow';
        }
    }

    useEffect(() => {
        switch (card.type) {
            case CardType.SYSTEM:
                setIcon(<ArrowUpOutlined />);
                break;
            case CardType.FOLDER:
                setIcon(<FolderOutlined />);
                break;
            case CardType.FILE:
                setIcon(<FileOutlined />);
                break;
        }
    }, [card]);
    return <Card variant='borderless' style={{width: '250px', margin: '0.5em', backgroundColor: color(card.type)}} onClick={() => handleClick(card)}>
        <>
            {icon}&nbsp;<span>{ card.title }</span>
        </>
    </Card>
}

export type CardData = {
    id: string;
    parentId: string | null;
    title: string;
    position: number;
    type: CardType;
    size?: number; // em bytes
}

export enum CardType {
    SYSTEM = 0,
    FOLDER = 1,
    FILE = 2,
}
