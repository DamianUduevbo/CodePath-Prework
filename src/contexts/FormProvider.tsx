import { createContext, useContext } from "react";
import { CreatorProps } from "../components/ContentCreatorCard";

const creatorData: CreatorProps = {
    id: 0,
    name: '',
    url: '',
    imageURL: '',
    description: '',
}

export const FormContext = createContext<CreatorProps>(creatorData);

export default function useFormData() {
    const context = useContext(FormContext);
    return context;
}