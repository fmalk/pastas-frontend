import { Card } from 'antd';

export function GenericCard({ title, meta }: { title: string, meta: string }) {
    return <Card title={title} variant='borderless' style={{ width: '250px' }}>
        <p>{meta}</p>
    </Card>
}

export type CardData = {
    id: string;
    title: string;
    meta: string;
    position: number;
}
