import { Href } from "expo-router";

export interface Props {
    children?: React.ReactNode,
    href: Href,
    bgColor?: "bg-transparent" | 'bg-white',
    arrowColor?: 'white' | 'black'
}